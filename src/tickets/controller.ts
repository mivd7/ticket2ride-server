import { JsonController, Post, Get, Param, CurrentUser, HttpCode, Body, NotFoundError, Put, Delete} from 'routing-controllers'
import {User} from '../users/entity'
import Event from '../events/entity'
import {Ticket} from './entity'
import { IsString, Length, IsNumber, IsUrl, IsOptional } from 'class-validator'

class validTicket {

    @IsString()
    @Length(10,100)
    description: string
    
    @IsOptional()
    @IsNumber()
    price: number

    @IsOptional()
    @IsUrl()
    thumbnail: string
    
}

@JsonController()
export default class TicketsController {

    @Get('/events/:id([0-9]+)/tickets')
    async getTickets(
        @Param('id') eventId: number
    ) {

        const tickets =  await Ticket.query(`SELECT * FROM tickets WHERE event_id=${eventId}`)
        return tickets
    }

    @Get('/tickets')
    async allEvents() {
        const tickets = await Ticket.find()
        return tickets
    }

    @Get('/tickets/:id([0-9]+)')
    getEvent(
      @Param('id') id: number
    ) {
      return Ticket.findOne(id);
    }


    @HttpCode(201)
    @Post('/events/:id([0-9]+)/tickets')
    async createTicket(
        @Param('id') eventId: number,
        @Body() ticket : validTicket,
        @CurrentUser() user: User
    ) {
        const event = await Event.findOne(eventId)
        if(!event) throw new NotFoundError('Event not Found!')
      
        const entity = await Ticket.create(ticket)
        entity.user = user
        entity.event = event
        const newTicket = await entity.save()

        const [ticketPayload] = await Ticket.query(`SELECT * FROM tickets WHERE id=${newTicket.id}`)


        return ticketPayload
    }

    @HttpCode(200)
    @Put('/tickets/:id([0-9]+)')
    async updateTicket(
        @Param('id') id: number,
        @Body() update : Partial<Ticket>
    ) {

        const ticket = await Ticket.findOne(id)
        if(!ticket) throw new NotFoundError('Ticket not found!')
        
        const updatedTicket = await Ticket.merge(ticket,update).save()

        const [payload] = await Ticket.query(`SELECT * FROM tickets WHERE id=${updatedTicket.id}`)

        return payload
    }

    @HttpCode(200)
    @Delete('/tickets/:id([0-9]+)')
    async deleteTicket(
        @Param('id') id: number,
    ) {

        const ticket = await Ticket.findOne(id)
        if(!ticket) throw new NotFoundError('Ticket not found!')
        
        const removeTicket = await Ticket.remove(ticket)

        return removeTicket

    }

    
}