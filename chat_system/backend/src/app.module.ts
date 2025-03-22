import { Module } from '@nestjs/common';
import { HttpModule } from '@nestjs/axios';
import { ConfigModule } from '@nestjs/config';
import { HelloModule } from './modules/hello/hello.module';
import { DatabaseService } from './config/database.service';
import { MongoDBModule } from './config/mongodb.module';
import { AlunoModule } from './modules/aluno/aluno.module';
import { DatabaseModule } from './config/database.module';
import { ProfissionalModule } from './modules/profissional/profissional.module';
import { EscolaModule } from './modules/escola/escola.module';

@Module({
  imports: [
    ConfigModule.forRoot(), // Carrega variáveis de ambiente
    HelloModule, // Importa os módulos da aplicação
    MongoDBModule,
    AlunoModule,
    DatabaseModule,
    MongoDBModule,
    EscolaModule,
    ProfissionalModule,
    HttpModule,
  ],
})
export class AppModule {}