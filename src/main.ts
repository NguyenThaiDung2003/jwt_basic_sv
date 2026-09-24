import dotenv from 'dotenv';
dotenv.config();
import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module.js';
import { ValidationPipe } from '@nestjs/common';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger'; // <-- Import Swagger

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  
  app.useGlobalPipes(new ValidationPipe({
    whitelist: true
  }))
const config = new DocumentBuilder()
    .setTitle('API Documentation')
    .setDescription('Tài liệu API bài tập NestJS')
    .setVersion('1.0')
    .addBearerAuth() // Nếu có dùng JWT Authentication
    .build();

  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('api', app, document); // 'api' chính là đường dẫn /api trên trình duyệt
  await app.listen(process.env.PORT ?? 3333);
}
await bootstrap();
