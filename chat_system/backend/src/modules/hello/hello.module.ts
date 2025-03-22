import { Module } from '@nestjs/common';
import { HelloController } from '../../modules/hello/hello.controller';
import { HelloService } from '../../modules/hello/hello.service';
import { MongoDBModule } from '../../config/mongodb.module';

@Module({
  imports: [MongoDBModule],
  controllers: [HelloController],
  providers: [HelloService],
})
export class HelloModule {}
