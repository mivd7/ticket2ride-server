import { JsonController, Post, Get, Param, CurrentUser, Authorized, HttpCode, Body, NotFoundError, Put, Delete} from 'routing-controllers'
import {User, Customer} from '../users/entity'
import Event from '../events/entity'
import {Ticket, TicketInfo} from './entity'
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
       
        const customers = await Customer.query(`SELECT * FROM customers`)

        const ticketsInfo = await TicketInfo.query('SELECT * FROM ticket_infos')

        const tickets =  await Ticket.query(`SELECT * FROM tickets WHERE event_id=${eventId}`)

        return {tickets, customers, ticketsInfo}
    }

    @Get('/tickets/:id([0-9]+)')
    async getTicket(
      @Param('id') id: number
    ) {

        return await Ticket.query(`SELECT * FROM tickets WHERE id=${id}`)
    }
   
    @Authorized()
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


        await TicketInfo.create({ticket: newTicket}).save()
        
        const customer = await Customer.findOne({user: user})
        if(!customer) throw new NotFoundError('Not a user')
        customer.ticketsOffered = customer.ticketsOffered + 1
        await customer.save()

        const ticketsInfo = await TicketInfo.query('SELECT * FROM ticket_infos')
        
        const [ticketPayload] = await Ticket.query(`SELECT * FROM tickets WHERE id=${newTicket.id}`)

        const custommerPayload = await Customer.query(`SELECT * FROM customers`)

        return {ticketPayload, custommerPayload, ticketsInfo}
    }

    @Authorized(['Author'])
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

    @Authorized(['Author'])
    @HttpCode(200)
    @Delete('/tickets/:id([0-9]+)')
    async deleteTicket(
        @Param('id') id: number,
        @CurrentUser() user: User
    ) {

        const ticket = await Ticket.findOne(id)
        if(!ticket) throw new NotFoundError('Ticket not found!')

        const customer = await Customer.findOne({user: user})
        if(!customer) throw new NotFoundError('Not a user')
        customer.ticketsOffered = customer.ticketsOffered - 1
        await customer.save()

        const custommerPayload = await Customer.query(`SELECT * FROM customers`)
        
        await Ticket.remove(ticket)

        return custommerPayload

    }

    
}