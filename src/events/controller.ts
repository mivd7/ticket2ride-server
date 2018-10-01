import { JsonController, Get, Param, Post, Put, HttpCode, BodyParam, CurrentUser, Body, NotFoundError } from 'routing-controllers'
import Event from './entity'
import {Ticket} from '../tickets/entity'
import {User} from '../users/entity';

@JsonController()
export default class EventController {

    @Get('/events')
    async allEvents() {
        const events = await Event.find()
        return events
    }

    @Get('/events/:id')
    getEvent(
    @Param('id') id: number
        ) {
          return Event.findOne(id)
    }

    @Post('/events')
    @HttpCode(201)
    async createEvent(
    @BodyParam('name') name : string,
    @BodyParam('description') description: string,
    @BodyParam('image') image: string,
    @BodyParam('startdate') startdate: Date,
    @BodyParam('enddate') enddate: Date

) { const newEvent = new Event()
    newEvent.name = name
    newEvent.description = description
    newEvent.image = image
    newEvent.startdate = startdate
    newEvent.enddate = enddate

    return newEvent.save()
    }

    @Put('/events/:id([0-9]+)')
    async updateEvent(
        @Param('id') id: number,
        @Body() update : Partial<Event>
    ) {
        const event = await Event.findOne(id);
        if(!event) throw new NotFoundError('Event not found!');
        
        const updatedEvent = Event.merge(event,update).save();
        return updatedEvent;
    }

    @Post(`/events/:eventId/tickets`)
    @HttpCode(201)
    addTicket(
    @Param('eventId') event: Event,
    @CurrentUser() user: User,
    @BodyParam('price') price: number,
    @BodyParam('description') description: string
    ) {
        const newTicket = new Ticket
        newTicket.price = price
        newTicket.description = description
        newTicket.event = event
        newTicket.user = user
        
    return newTicket.save()
    }
}