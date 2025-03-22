import { Injectable } from '@nestjs/common';
import { DatabaseService } from 'src/config/database.service';
import { NotFoundException } from '@nestjs/common';

@Injectable()
export class EscolaService {
  constructor(private readonly databaseService: DatabaseService) {}

  // Buscar todas as escolas
  async getAllEscolas(): Promise<any[]> {
    const query = `SELECT * FROM escola`;
    const result = await this.databaseService.query(query);
    return result.rows;
  }

  // Buscar um escola por ID
  async getEscolaById(id: number): Promise<any> {
    const query = `SELECT * FROM escola WHERE id = $1`;
    console.log('Executando query com ID:', id);
  
    const result = await this.databaseService.query(query, [id]);
  
    console.log('Resultado da query:', result.rows); // Agora pegamos as `rows`
  
    if (!result.rows.length) {
      throw new NotFoundException(`Escola com ID ${id} não encontrada`);
    }
  
    return result.rows[0]; // Retornando corretamente a escola encontrada
  }
  
  // Buscar todos os profissionais da escola
  async getProfissionaisByEscola(id: number): Promise<any[]> {
    const query = `SELECT * FROM profissional WHERE escola_id = $1`;
    const result = await this.databaseService.query(query, [id]);
    return result.rows;
  }

  // Buscar todos os equipamentos de uma escola
  async getEquipamentosByEscola(id: number): Promise<any[]> {
    const query = `SELECT * FROM equipamento WHERE escola_id = $1`;
    const result = await this.databaseService.query(query, [id]);
    return result.rows;
  }
}