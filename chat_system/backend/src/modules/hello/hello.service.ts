import { Injectable } from '@nestjs/common';
import { MongoDBService } from '../../config/mongodb.service';

@Injectable()
export class HelloService {
  constructor(private readonly mongoDBService: MongoDBService) {}

  async getHello(): Promise<string> {
    await this.mongoDBService.logToMongo({
      message: 'Envio de log no serviço hello world',
      level: 'info',
      details: 'hello.service.ts gerou esse log'
    })
    return 'Hello World!';
  }
}
