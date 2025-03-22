import { Module } from '@nestjs/common';
import { DatabaseModule } from 'src/config/database.module';
import { ChatService } from './chat.service';
import { ChatController } from './chat.controller';

@Module({
    imports: [DatabaseModule],
    controllers: [ChatController],
    providers: [ChatService],
})
export class ChatModule {}