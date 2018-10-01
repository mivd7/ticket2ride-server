import { JsonController, Post, Get, Param, CurrentUser, Authorized, HttpCode, Body, NotFoundError} from 'routing-controllers'
import {User} from '../users/entity'
import {Ticket, TicketInfo} from '../tickets/entity'
import Comment from './entity'
import { IsString, Length } from 'class-validator';

class validMessage {
  
  @IsString()
  @Length(2,30)
  message: string
  
}

@JsonController()
export default class CommentsController {

    @Get('/tickets/:ticketId([0-9]+)/comments')
    getComments(
      @Param('ticketId') ticketId: number
    ) {
      return Ticket.query(`SELECT * FROM comments WHERE ticket_id=${ticketId}`)
    }

    @Get('/comments/:id([0-9]+)')
    getComment(
      @Param('id') id: number
    ) {
      return Comment.findOne(id)
    }

    @Authorized()
    @HttpCode(201)
    @Post('/tickets/:ticketId([0-9]+)/comments')
    async createComment(
        @Param('ticketId') ticketId: number,
        @Body() comment : validMessage,
        @CurrentUser() user: User
    ) {
        const ticket = await Ticket.findOne(ticketId)
        if(!ticket) throw new NotFoundError('Ticket not Found!')

        const entity = await Comment.create(comment)
        entity.user = user
        entity.ticket = ticket
        const newComment = await entity.save()
               
        
        const ticketInfo = await TicketInfo.findOne({ticket})
        if(!ticketInfo) throw new NotFoundError('Not a ticket')

        ticketInfo.commentsReceived = ticketInfo.commentsReceived + 1
        await ticketInfo.save()
        
        const [commentsPayload] = await Comment.query(`SELECT * FROM comments WHERE id=${newComment.id}`)

        const infoPayload = await TicketInfo.query(`SELECT * FROM ticket_infos;`)

        return {commentsPayload, infoPayload}
    }

    
}