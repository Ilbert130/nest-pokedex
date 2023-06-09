import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  //rutas /api/v2/controller
  app.setGlobalPrefix('api/v2');

  //Configurando los dtos a nivel global 
  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true,
      forbidNonWhitelisted: true,
      transform: true,              //Para convertir los parametro a numero si deberian ser numeros
      transformOptions: {
        enableImplicitConversion: true
      }
    })
   );

  await app.listen(process.env.PORT);
  console.log(`App running at port ${process.env.PORT} `);
}
bootstrap();
