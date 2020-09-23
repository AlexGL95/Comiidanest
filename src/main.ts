import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';

const CORS_OPTIONS = {
  "origin": "http://localhost:4200",
  "methods": "GET,HEAD,PUT,POST,DELETE",
  "allowedHeaders": 'Content-Type',
  "preflightContinue": true,
  "optionsSuccessStatus": 204
}

async function bootstrap() {
  const app = await NestFactory.create(AppModule, { cors: CORS_OPTIONS });
  await app.listen(3000);
}
bootstrap();
