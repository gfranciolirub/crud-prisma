import { Body, Controller, Post, UseInterceptors } from '@nestjs/common';
import { UserService } from '@services/user.service';
import { AddTokenRequestInterceptor } from 'src/interceptors/tokenRequest.middleware';
import { UserRequest } from 'src/models/requests/user.request';
import { GeneralResponse } from 'src/models/responses/general.response';

@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Post('/')
  async entry(@Body() data: UserRequest): Promise<GeneralResponse> {
    return this.userService.create(data);
  }
}
