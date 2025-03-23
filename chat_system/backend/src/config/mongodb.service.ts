import { Injectable, OnModuleInit, OnModuleDestroy } from '@nestjs/common';
import { MongoClient, Db } from 'mongodb';
import * as dotenv from 'dotenv';

dotenv.config();

@Injectable()
export class MongoDBService implements OnModuleInit, OnModuleDestroy {
  private client: MongoClient;
  private db: Db;

  constructor() {
    this.client = new MongoClient(process.env.MONGO_URI);
  }

  async onModuleInit() {
    try {
      await this.client.connect();
      this.db = this.client.db(process.env.MONGO_DB);
      console.log('✅ Conectado ao MongoDB com sucesso!');
    } catch (error) {
      console.error('❌ Erro ao conectar no MongoDB:', error);
    }
  }

  getDatabase(): Db {
    return this.db;
  }

  async onModuleDestroy() {
    await this.client.close();
    console.log('🔌 Conexão com MongoDB fechada.');
  }

  async logToMongo(log: any): Promise<void> {
    try {
      const logCollection = this.db.collection('logs');
      const logEntry = {
        ...log,
        timestamp: new Date(),
      };
      await logCollection.insertOne(logEntry);
      console.log('✅ Log registrado no MongoDB!');
    } catch (error) {
      console.error('❌ Erro ao registrar log no MongoDB:', error);
    }
  }
}
