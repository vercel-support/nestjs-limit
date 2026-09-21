import { NestFactory } from '@nestjs/core';
import { NestExpressApplication } from '@nestjs/platform-express';
import { AppModule } from './app.module';

async function bootstrap() {
  // Type the app as NestExpressApplication so app.useBodyParser is available.
  const app = await NestFactory.create<NestExpressApplication>(AppModule);

  // Raise the body-parser limit above Express's 100 KB default.
  const limit = process.env.BODY_LIMIT ?? '4mb';
  app.useBodyParser('json', { limit });
  app.useBodyParser('urlencoded', { limit, extended: true });

  await app.listen(process.env.PORT ?? 3000);
}

bootstrap();

