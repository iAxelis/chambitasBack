import { ValidationPipe } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';

import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);// Creación de la aplicación NestJS a partir del módulo principal
  app.setGlobalPrefix('api'); // prefijo global para todas las rutas de la API

  app.enableCors({
    origin: 'http://localhost:4200',// url por defecto de angular
    methods: ['GET', 'POST', 'PATCH', 'PUT', 'DELETE'],// métodos HTTP permitidos
    allowedHeaders: ['Content-Type', 'Authorization'],// encabezados permitidos
  });
// Configuración de validación global para las solicitudes entrantes
  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true,
      forbidNonWhitelisted: true,
      transform: true,
    }),
  );

  const port = process.env.PORT ?? 3000;// puerto en el que se ejecutará la aplicación, por defecto 3000

  await app.listen(port);
}

bootstrap();