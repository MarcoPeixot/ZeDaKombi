import { Module, Global } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { DatabaseService } from './database.service';
@Global() // Permite ser usado em qualquer parte do projeto sem precisar importar
@Module({
  imports:[ConfigModule.forRoot()],
  providers: [DatabaseService],
  exports: [DatabaseService], // Exporta o serviço para ser usado em outros módulos
})
export class DatabaseModule {}
