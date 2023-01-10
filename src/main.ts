import { ValidationPipe } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { DocumentBuilder } from '@nestjs/swagger';
import { SwaggerModule } from '@nestjs/swagger/dist';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.useGlobalPipes(new ValidationPipe({transform:true}));

  const config = new DocumentBuilder()
    .setTitle('Authentication')
    .setDescription('Authentication sample')
    .setVersion('1.0')
    .addBearerAuth({
      bearerFormat:'JWT',
      type:'http'      
    }, 'jwt')
    .build();
  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('documentation', app, document);


  await app.listen(3000);
}
bootstrap();
