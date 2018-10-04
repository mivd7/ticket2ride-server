import { JsonController, Body, Post, Get, Param } from 'routing-controllers';
import {User} from './entity';

@JsonController()
export default class UserController {
  
  @Post('/users')
  async createUser(
    @Body() user: User
  ) {
    const {password, ...rest} = user
    const entity = User.create(rest)
    await entity.setPassword(password)
    return entity.save()
  }

  @Get('/users/:id([0-9]+)')
  getUser(
    @Param('id') id: number
  ) {
    return User.findOne(id);
  }

  @Get('/users')
  allUsers() {
    return User.find();
  }
}