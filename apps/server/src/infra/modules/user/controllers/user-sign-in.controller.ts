import { Body, Controller, Post } from '@nestjs/common';

import { UserSignIn } from '@core/application/user/use-cases/user-sign-in/user-sign-in';
import { UserSignInDto } from '../dtos/user-sign-in.dto';

@Controller('users')
export class UserSignInController {
  constructor(private userSignIn: UserSignIn) {}

  @Post('/sign-in')
  async create(@Body() body: UserSignInDto) {
    return this.userSignIn.execute(body);
  }
}
