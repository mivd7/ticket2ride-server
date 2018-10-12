import { JsonController, Post, Get, Param, CurrentUser, HttpCode, Body, Put, NotFoundError, Delete, Authorized} from 'routing-controllers';
import { IsString, Length, IsOptional, IsUrl, IsDateString } from 'class-validator';
import {User} from '../users/entity';
import Event from './entity';

class validEvent {

    @IsString()
    @Length(2,15)
    name: string;

    @IsOptional()
    @IsString()
    @Length(10,100)
    description: string;
  
    @IsOptional()
    @IsDateString()
    startingTime: Date;

    @IsOptional()
    @IsDateString()
    endTime: Date;

    @IsOptional()
    @IsUrl()
    thumbnail: string;
    
}

@JsonController()
export default class EventsController {

    @Get('/events')
    async allEvents() {
        const events = await Event.find()
        return events
    }

    @Get('/events/:id([0-9]+)')
    getEvent(
      @Param('id') id: number
    ) {
      return Event.findOne(id);
    }

    @Authorized()
    @HttpCode(201)
    @Post('/events')
    async createEvent(
        @Body() event : validEvent,
        @CurrentUser() user: User
    ) {
        const entity = await Event.create(event);
        entity.user = user;

        const newEvent = await entity.save();
        return newEvent;
    }

    @Authorized()
    @HttpCode(200)
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

    @Authorized()
    @HttpCode(200)
    @Delete('/events/:id([0-9]+)')
    async deleteEvent(
        @Param('id') id: number
    ) {
        const event = await Event.findOne(id);
        if(!event) throw new NotFoundError('Event not found!');
        
        return Event.remove(event);
    }
}