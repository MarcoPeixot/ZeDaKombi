import { Injectable, OnModuleDestroy, OnModuleInit } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { Pool } from 'pg';

@Injectable()
export class DatabaseService implements OnModuleInit, OnModuleDestroy {
  private pool: Pool;

  constructor(private configService: ConfigService) {
    this.pool = new Pool({
      user: this.configService.get<string>('DB_USER', 'postgres'),
      host: this.configService.get<string>('DB_HOST', 'localhost'),
      database: this.configService.get<string>('DB_NAME', 'meubanco'),
      password: this.configService.get<string>('DB_PASS', 'senha123'),
      port: this.configService.get<number>('DB_PORT', 5432),
    });
  }

  async onModuleInit() {
    console.log('🔌 Conectando ao PostgreSQL...');
    try {
      await this.pool.connect();
      console.log('✅ Conectado ao PostgreSQL!');
    } catch (error) {
      console.error('❌ Erro ao conectar no PostgreSQL:', error);
    }
  }

  async onModuleDestroy() {
    await this.pool.end();
    console.log('🔌 Conexão com PostgreSQL encerrada.');
  }

  async query(query: string, params?: any[]): Promise<any> {
    return this.pool.query(query, params);
  }
}
