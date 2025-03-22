import { ApiProperty } from '@nestjs/swagger';
import { IsDateString, IsNotEmpty, IsNumber, IsOptional, IsString } from 'class-validator';

export class CreateAlunoDto {
  @ApiProperty({ example: 101, description: 'ID da escola do aluno' })
  @IsNumber()
  @IsNotEmpty()
  escola_id: number;

  @ApiProperty({ example: 'João Silva', description: 'Nome do aluno' })
  @IsString()
  @IsNotEmpty()
  nome: string;

  @ApiProperty({ example: 'Auditiva', description: 'Tipo de deficiência do aluno' })
  @IsString()
  tipo_deficiencia: string;

  @ApiProperty({ example: 'Necessita de intérprete de Libras', description: 'Necessidades especiais do aluno' })
  @IsString()
  necessidades: string;

  @ApiProperty({ example: 1, description: 'ID do aluno associado ao caso' })
  @IsNumber()
  @IsNotEmpty()
  aluno_id: number;

  @ApiProperty({ example: '2024-03-17', description: 'Data de abertura do caso', format: 'date' })
  @IsDateString()
  @IsNotEmpty()
  data_abertura: string;

  @ApiProperty({ example: 'Em andamento', description: 'Status do caso', enum: ['Aberto', 'Em andamento', 'Concluído'] })
  @IsString()
  @IsNotEmpty()
  status: string;

  @ApiProperty({ example: 'Aluno apresentou sintomas de gripe.', description: 'Descrição detalhada do caso', required: false })
  @IsString()
  @IsOptional()
  descricao?: string;

  @ApiProperty({ example: 'Caso criado em 17/03/2024.', description: 'Histórico de modificações do caso', required: false })
  @IsString()
  @IsOptional()
  historico_modificacoes?: string;
}
