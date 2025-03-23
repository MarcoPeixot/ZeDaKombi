import { Module } from '@nestjs/common';
import { HttpModule } from '@nestjs/axios';
import { ConfigModule } from '@nestjs/config';
import { MongoDBModule } from './config/mongodb.module';
import { DatabaseModule } from './config/database.module';
import { ChatModule } from './modules/chat/chat.module';

@Module({
  imports: [
    ConfigModule.forRoot(), // Carrega variáveis de ambiente
    MongoDBModule,
    DatabaseModule,
    MongoDBModule,
    HttpModule,
    ChatModule,
  ],
})
export class AppModule {}