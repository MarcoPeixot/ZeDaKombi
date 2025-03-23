import { Controller, Get, Post, Body, Param, Delete, Put, ParseIntPipe } from '@nestjs/common';
import { AlunoService } from './aluno.service';
import { CreateAlunoDto } from './dto/create-aluno.dto';
import { UpdateAlunoDto } from './dto/update-aluno.dto';
import { Aluno } from './interfaces/aluno.interface';
import { ApiTags, ApiOperation, ApiResponse } from '@nestjs/swagger';
import { NotFoundException, BadRequestException } from 'src/utils/custom-exceptions';

@ApiTags('Alunos') // Agrupa os endpoints no Swagger
@Controller('alunos')
export class AlunoController {
  constructor(private readonly alunoService: AlunoService) {}

  @Get('externos')
  async getAllAlunosExternos() {
    return await this.alunoService.getAllAlunosExternos();
  }

  @Get('externos/:id')
  async getAlunoByIdExterno(@Param('id') id: number) {
    return await this.alunoService.getAlunoByIdExterno(id);
  }

  // Criar um aluno
  @Post()
  @ApiOperation({ summary: 'Cria um novo aluno' })
  @ApiResponse({ status: 201, description: 'Aluno criado com sucesso' })
  @ApiResponse({ status: 400, description: 'Erro de validação' })
  async create(@Body() createAlunoDto: CreateAlunoDto): Promise<void> {
    if (!createAlunoDto.nome || !createAlunoDto.escola_id) {
      throw new BadRequestException('Nome e escola_id são obrigatórios');
    }
    await this.alunoService.createAluno(createAlunoDto);
  }

  @Get()
  @ApiOperation({ summary: 'Lista todos os alunos' })
  @ApiResponse({ status: 200, description: 'Lista de alunos retornada com sucesso' })
  async findAll(): Promise<Aluno[]> {
    return this.alunoService.getAllAlunos();
  }

  @Get(':id')
  @ApiOperation({ summary: 'Busca um aluno por ID' })
  @ApiResponse({ status: 200, description: 'Aluno encontrado' })
  @ApiResponse({ status: 404, description: 'Aluno não encontrado' })
  async findOne(@Param('id', ParseIntPipe) id: number): Promise<Aluno> {
    const aluno = await this.alunoService.getAlunoById(id);
    if (!aluno) {
      throw new NotFoundException(`Aluno com ID ${id} não encontrado`);
    }
    return aluno;
  }

  @Put(':id')
  @ApiOperation({ summary: 'Atualiza um aluno por ID' })
  @ApiResponse({ status: 200, description: 'Aluno atualizado' })
  @ApiResponse({ status: 404, description: 'Aluno não encontrado' })
  async update(@Param('id', ParseIntPipe) id: number, @Body() updateAlunoDto: UpdateAlunoDto): Promise<void> {
    const aluno = await this.alunoService.getAlunoById(id);
    if (!aluno) {
      throw new NotFoundException(`Aluno com ID ${id} não encontrado`);
    }
    await this.alunoService.updateAluno(id, updateAlunoDto);
  }

  @Delete(':id')
  @ApiOperation({ summary: 'Deleta um aluno por ID' })
  @ApiResponse({ status: 200, description: 'Aluno deletado' })
  @ApiResponse({ status: 404, description: 'Aluno não encontrado' })
  async remove(@Param('id', ParseIntPipe) id: number): Promise<void> {
    const aluno = await this.alunoService.getAlunoById(id);
    if (!aluno) {
      throw new NotFoundException(`Aluno com ID ${id} não encontrado`);
    }
    await this.alunoService.deleteAluno(id);
  }
}
