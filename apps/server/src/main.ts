import { UnauthorizedException, ValidationPipe } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { HttpAdapterHost, NestFactory } from '@nestjs/core';

import { AppModule } from './app.module';
import { CustomExceptionsFilter } from '@common/filters/http-exception.filter';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  const config = app.get(ConfigService);
  const port = config.get<number>('api.port');
  const corsWhitelist = config.get<string>('cors.whitelist').split(',');

  // Setting Custom Global Exception Filter
  const { httpAdapter } = app.get(HttpAdapterHost);
  app.useGlobalFilters(new CustomExceptionsFilter(httpAdapter));

  app.useGlobalPipes(new ValidationPipe());

  app.enableCors({
    origin: (origin, callback) => {
      const isUserUnderAnAllowedOrigin =
        !origin ||
        corsWhitelist.includes('*') ||
        corsWhitelist.indexOf(origin) !== -1;

      if (isUserUnderAnAllowedOrigin) {
        callback(null, true);
      } else {
        callback(new UnauthorizedException(`ORIGIN ${origin} blocked by CORS`));
      }
    },
  });

  await app.listen(port);
}
bootstrap();
