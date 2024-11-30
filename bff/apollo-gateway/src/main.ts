import { NestFactory } from '@nestjs/core';
// import * as dotenv from 'dotenv';

import { AppModule } from './app/app.module';

// if (
//   process.env.NODE_ENV !== 'production' &&
//   process.env.NODE_ENV !== 'staging'
// ) {
//   dotenv.config();
// }

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.enableCors({
    allowedHeaders: ['Content-Type', 'Authorization'],
    credentials: true,
    maxAge: 3600,
    methods: 'POST',
    origin: process.env.BFF_CORS_ORIGIN,
  });
  const port = Number(process.env.PORT) || 8080;
  await app.listen(port);
}
bootstrap();
