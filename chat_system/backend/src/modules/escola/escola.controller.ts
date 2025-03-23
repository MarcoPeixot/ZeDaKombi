import { Controller, Get, Post, Put, Delete, Param, Body } from '@nestjs/common';
import { EscolaService } from './escola.service';

@Controller('escolas')
export class EscolaController {
  constructor(private readonly escolaService: EscolaService) {}


  // Buscar todos as escolas
  @Get()
  async getAllEscolas(): Promise<any[]> {
    return await this.escolaService.getAllEscolas();
  }

  // Buscar escola por ID
  @Get(':id')
  async getEscolaById(@Param('id') id: number): Promise<any> {
    return await this.escolaService.getEscolaById(id);
  }

  // Buscar todos os profissionais da escola
  @Get(':id/profissionais')
  async getProfissionaisByEscola(@Param('id') id: number): Promise<any[]> {
    return await this.escolaService.getProfissionaisByEscola(id);
  }

  // Buscar todos os equipamentos de uma escola
  @Get(':id/equipamentos')
  async getEquipamentosByEscola(@Param('id') id: number): Promise<any[]> {
    return await this.escolaService.getEquipamentosByEscola(id);
  }
}