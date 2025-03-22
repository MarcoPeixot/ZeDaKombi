import { Controller, Get } from '@nestjs/common';
import { HelloService } from '../../modules/hello/hello.service';
import { MongoDBService } from '../../config/mongodb.service';
@Controller()
export class HelloController {
  constructor(private readonly helloService: HelloService, private readonly mongoDBService: MongoDBService) {}

  @Get()
  async getHello(): Promise<string> {
    await this.mongoDBService.logToMongo({
      message: "Exemplo de log de acesso a rota hello world",
      level: "info",
      route: "GET /"
    })
    return this.helloService.getHello();
  }
}
