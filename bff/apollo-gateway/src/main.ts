import { NestFactory } from '@nestjs/core';
import * as dotenv from 'dotenv';

import { AppModule } from './app/app.module';

if (
  process.env.NODE_ENV !== 'production' &&
  process.env.NODE_ENV !== 'staging'
) {
  dotenv.config();
}

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  const port = Number(process.env.BFF_CONTAINER_PORT) || 8080;
  await app.listen(port);
}
bootstrap();
