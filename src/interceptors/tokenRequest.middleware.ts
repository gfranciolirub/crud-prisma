import {
  Injectable,
  NestInterceptor,
  ExecutionContext,
  CallHandler,
  HttpException,
  HttpStatus,
} from '@nestjs/common';
import { decode } from 'jsonwebtoken';

@Injectable()
export class AddTokenRequestInterceptor implements NestInterceptor {
  async intercept(context: ExecutionContext, next: CallHandler): Promise<any> {
    const req = context.switchToHttp().getRequest();

    const name = req.headers.username;

    req.body = { ...req.body, username: name };

    return next.handle();
  }
}
