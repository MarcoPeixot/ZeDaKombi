import { Module, Global } from '@nestjs/common';
import { MongoDBService } from './mongodb.service';

@Global()
@Module({
  providers: [MongoDBService],
  exports: [MongoDBService],
})
export class MongoDBModule {}
