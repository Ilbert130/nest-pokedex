import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  //rutas /api/v2/controller
  app.setGlobalPrefix('api/v2');

  await app.listen(3000);
}
bootstrap();
