import { BaseExceptionFilter } from '@nestjs/core';
import { Response } from 'express';
import {
  Catch,
  ArgumentsHost,
  HttpException,
  HttpStatus,
} from '@nestjs/common';

import { ApplicationError } from '@core/domain/errors/ApplicationError';

@Catch()
export class CustomExceptionsFilter extends BaseExceptionFilter {
  catch(
    exception: HttpException | Error | ApplicationError,
    host: ArgumentsHost,
  ) {
    const ctx = host.switchToHttp();
    const response = ctx.getResponse<Response>();

    let status: HttpStatus;
    let errorMessage: any;

    if (exception instanceof HttpException) {
      status = exception.getStatus();
      errorMessage = exception.getResponse();
    } else if (exception instanceof ApplicationError) {
      status = HttpStatus.UNPROCESSABLE_ENTITY;
      errorMessage = {
        statusCode: HttpStatus.BAD_REQUEST,
        message: exception.message,
        error: 'Application Error',
      };
    } else {
      status = HttpStatus.INTERNAL_SERVER_ERROR;
      errorMessage = {
        statusCode: HttpStatus.INTERNAL_SERVER_ERROR,
        message: exception.message,
        error: 'Internal Server Error',
      };
    }

    return response.status(status).json({
      error: errorMessage,
    });
  }
}
