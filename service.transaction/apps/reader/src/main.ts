import { NestFactory } from '@nestjs/core';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { ReaderModule } from './reader.module';

async function bootstrap() {
  const app = await NestFactory.create(ReaderModule);
  const config = new DocumentBuilder()
    .setTitle('Transaction Reader')
    .setDescription('Read Transactions from the DB')
    .setVersion('1.0')
    .build();
  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('api', app, document);
  await app.listen(3000);
}

bootstrap();
