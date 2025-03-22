import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsString } from 'class-validator';

export class CreateChatDto {
  @ApiProperty({
    description: 'ID do usuário que envia a mensagem',
    example: 1,
  })
  @IsNotEmpty()
  senderId: number;

  @ApiProperty({
    description: 'Conteúdo da mensagem',
    example: 'Olá, como você está?',
  })
  @IsNotEmpty()
  @IsString()
  message: string;
}
