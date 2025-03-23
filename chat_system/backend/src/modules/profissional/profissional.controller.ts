import { Controller, Get, Post, Put, Delete, Param, Body } from '@nestjs/common';
import { ProfissionalService } from './profissional.service';

@Controller('profissionais')
export class ProfissionalController {
  constructor(private readonly profissionalService: ProfissionalService) {}

  // Criar um profissional
  @Post()
  async createProfissional(@Body() data: any): Promise<void> {
    await this.profissionalService.createProfissional(data);
  }

  // Buscar todos os profissionais
  @Get()
  async getAllProfissionais(): Promise<any[]> {
    return await this.profissionalService.getAllProfissionais();
  }

  // Buscar profissional por ID
  @Get(':id')
  async getProfissionalById(@Param('id') id: number): Promise<any> {
    return await this.profissionalService.getProfissionalById(id);
  }

  // Atualizar profissional
  @Put(':id')
  async updateProfissional(@Param('id') id: number, @Body() data: any): Promise<void> {
    await this.profissionalService.updateProfissional(id, data);
  }

  // Deletar profissional
  @Delete(':id')
  async deleteProfissional(@Param('id') id: number): Promise<void> {
    await this.profissionalService.deleteProfissional(id);
  }
}