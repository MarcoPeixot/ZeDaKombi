import { Injectable } from '@nestjs/common';
import { DatabaseService } from '../../config/database.service';

@Injectable()
export class ProfissionalService {
  constructor(private readonly databaseService: DatabaseService) {}

  // Criar um novo profissional
  async createProfissional(data: any): Promise<void> {
    const query = `INSERT INTO profissional (nome, especialidade, contato) VALUES ($1, $2, $3)`;
    const values = [data.nome, data.especialidade, data.contato];
    await this.databaseService.query(query, values);
  }

  // Buscar todos os profissionais
  async getAllProfissionais(): Promise<any[]> {
    const query = `SELECT * FROM profissional`;
    return await this.databaseService.query(query);
  }

  // Buscar um profissional por ID
  async getProfissionalById(id: number): Promise<any> {
    const query = `SELECT * FROM profissional WHERE id = $1`;
    const result = await this.databaseService.query(query, [id]);
    return result.length ? result[0] : null;
  }

  // Atualizar um profissional por ID
  async updateProfissional(id: number, data: any): Promise<void> {
    const query = `UPDATE profissional SET nome = $1, especialidade = $2, contato = $3 WHERE id = $4`;
    const values = [data.nome, data.especialidade, data.contato, id];
    await this.databaseService.query(query, values);
  }

  // Deletar um profissional por ID
  async deleteProfissional(id: number): Promise<void> {
    const query = `DELETE FROM profissional WHERE id = $1`;
    await this.databaseService.query(query, [id]);
  }
}
