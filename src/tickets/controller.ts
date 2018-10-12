import { JsonController, Post, Get, Param, CurrentUser, HttpCode, Body, NotFoundError, Put, Delete, Authorized} from 'routing-controllers'
import {User, Profile} from '../users/entity'
import Event from '../events/entity'
import {Ticket, TicketInfo} from './entity'
import { IsString, Length, IsNumber, IsUrl, IsOptional } from 'class-validator'
// import { io } from '../index';

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
        const profile = await Profile.query(`SELECT * FROM profiles`);

        const ticketsInfo = await TicketInfo.query('SELECT * FROM ticket_infos');

        const tickets =  await Ticket.query(`SELECT * FROM tickets WHERE event_id=${eventId}`);

        return {tickets, profile, ticketsInfo};
    }

    // @Get('/tickets')
    // async allTickets() {
       
    // }

    @Get('/tickets/:id([0-9]+)')
   async getTicket(
      @Param('id') id: number
    ) {
      return await Ticket.query(`SELECT * FROM tickets where id=${id}`)
    }


    @Authorized()
    @HttpCode(201)
    @Post('/events/:id([0-9]+)/tickets')
    async createTicket(
        @Param('id') eventId: number,
        @Body() ticket : validTicket,
        @CurrentUser() user: User
    ) {
        const event = await Event.findOne(eventId);
        if(!event) throw new NotFoundError('Event not Found!');
      
        const entity = await Ticket.create(ticket);
        entity.user = user;
        entity.event = event;
        const newTicket = await entity.save();

        await TicketInfo.create({ticket: newTicket}).save();
        
        const profile = await Profile.findOne({user: user});
        if(!profile) throw new NotFoundError('Not a user');
        profile.ticketsOffered = profile.ticketsOffered + 1;
        await profile.save();

        const ticketsInfo = await TicketInfo.query('SELECT * FROM ticket_infos');
        
        const [ticketPayload] = await Ticket.query(`SELECT * FROM tickets WHERE id=${newTicket.id}`);

        const profilePayload = await Profile.query(`SELECT * FROM profiles`);

        return {ticketPayload, profilePayload, ticketsInfo}
    }

    @Authorized()
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

    @Authorized()
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