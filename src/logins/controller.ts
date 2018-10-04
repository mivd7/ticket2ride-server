import { JsonController, Post, Body, BadRequestError } from 'routing-controllers';
import { sign } from '../jwt';
import {User} from '../users/entity';
import {IsString, IsEmail, MinLength} from 'class-validator'

class AuthenticatePayload {
  @IsString()
  @IsEmail()
  email: string;

  @IsString()
  @MinLength(8)
  password: string;
}

@JsonController()
export default class LoginController {

  @Post('/logins')
  async authenticate(
    @Body() { email, password }: AuthenticatePayload
  ) {
    const user = await User.findOne({ where: { email } });
    if (!user || !user.id) throw new BadRequestError('A user with this email does not exist');

    if (!await user.checkPassword(password)) throw new BadRequestError('The password is not correct');

    const jwt = sign({ id: user.id });
    return { jwt };
  }
}