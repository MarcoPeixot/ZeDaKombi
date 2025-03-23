import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsString } from 'class-validator';

export class UpdateChatDto {
  @ApiProperty({
    description: 'Conteúdo da mensagem',
    example: 'Mensagem atualizada',
  })
  @IsNotEmpty()
  @IsString()
  message: string;
}
