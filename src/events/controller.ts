import { JsonController, Get, Param, Post, HttpCode, BodyParam, CurrentUser } from 'routing-controllers'
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