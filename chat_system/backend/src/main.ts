import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';
import { GlobalExceptionFilter } from './utils/http-exception.filter';
import { MongoDBService } from './config/mongodb.service';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  const mongoDBService = app.get(MongoDBService);

  const config = new DocumentBuilder()
    .setTitle('ZeDaZombi')
    .setDescription('Chat.')
    .setVersion('1.0')
    .build();
  const documentFactory = () => SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('docs', app, documentFactory);

  //Ativa o filtro de erro globalmente
  app.useGlobalFilters(new GlobalExceptionFilter(mongoDBService));

  await app.listen(process.env.PORT ?? 3000);

  app.enableCors({
    origin: '*', // Permite apenas essa origem
    methods: 'GET,POST,PUT,DELETE',
    allowedHeaders: 'Content-Type,Authorization',
  });
}
bootstrap();
