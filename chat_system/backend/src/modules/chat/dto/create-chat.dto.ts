import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsString } from 'class-validator';

export class CreateChatDto {
  @ApiProperty({
    description: 'ID do chat',
    example: 1,
  })
  @IsNotEmpty()
  chatId: number;

  @ApiProperty({
    description: 'ID do usuário que esta enviando mensagem',
    example: 1,
  })
  @IsNotEmpty()
  userId: number;

  @ApiProperty({
    description: 'Conteúdo da mensagem',
    example: 'Olá, como você está?',
  })
  @IsNotEmpty()
  @IsString()
  message: string;
}
