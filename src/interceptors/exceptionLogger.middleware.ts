import {
  ExceptionFilter,
  Catch,
  ArgumentsHost,
  HttpException,
} from '@nestjs/common';
import { FastifyRequest, FastifyReply } from 'fastify';

@Catch(HttpException)
export class HttpExceptionFilter implements ExceptionFilter {
  catch(exception: HttpException, host: ArgumentsHost) {
    const ctx = host.switchToHttp();
    const response = ctx.getResponse<FastifyReply>();
    const request = ctx.getRequest<FastifyRequest>();
    const status = exception.getStatus();

    // Configure this exception logger as needed
    console.error({
      exception: exception,
      timestamp: new Date().toISOString(),
      path: request.url,
      requestBody: {
        body: request.body,
        params: request.params,
        query: request.query,
      },
      response: exception.getResponse(),
    });
    response
      .status(status)
      .send({ statusCode: status, message: exception.getResponse() });
  }
}
