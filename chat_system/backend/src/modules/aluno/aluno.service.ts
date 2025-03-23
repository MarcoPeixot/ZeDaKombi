import { Injectable } from '@nestjs/common';
import { DatabaseService } from '../../config/database.service';
import { CreateAlunoDto } from './dto/create-aluno.dto';
import { UpdateAlunoDto } from './dto/update-aluno.dto';
import { Aluno } from './interfaces/aluno.interface';
import { CreateRegisterCaseDto } from './dto/register-case.dto';

// Ternho que modificar o método de criação de aluno, porque ao criar um aluno, necessariamente, é preciso criar um registro na tabela de caso com o caso desse aluno que esta sendo criado.
// Além disso, na criação de aluno, é preciso codificar a forma como o id da escola deve ser passado para a função de criação.
import { HttpService } from '@nestjs/axios';

@Injectable()
export class AlunoService {
  private readonly API_URL =
    'https://two025-1a-t13-es05-api2.onrender.com/api/v1';
  private readonly BEARER_TOKEN = 'g5-d07b7448e0e79b485cef47e88add553218';
  constructor(
    private readonly databaseService: DatabaseService,
    private readonly httpService: HttpService,
  ) {}

  // Buscar todos os alunos da API externa
  async getAllAlunosExternos(): Promise<any[]> {
    const url = `${this.API_URL}/institutions/306/students`;

    try {
      const response = await this.httpService
        .get(url, {
          headers: {
            Authorization: `Bearer ${this.BEARER_TOKEN}`,
          },
        })
        .toPromise();

      return response.data;
    } catch (error) {
      throw new Error(`Erro ao buscar alunos externos: ${error.message}`);
    }
  }

  // Buscar um aluno por ID na API externa
  async getAlunoByIdExterno(id: number): Promise<any> {
    const url = `${this.API_URL}/students/${id}`;

    try {
      const response = await this.httpService
        .get(url, {
          headers: {
            Authorization: `Bearer ${this.BEARER_TOKEN}`,
          },
        })
        .toPromise();

      return response.data;
    } catch (error) {
      throw new Error(
        `Erro ao buscar aluno externo com ID ${id}: ${error.message}`,
      );
    }
  }

  // Criar um novo aluno
  async createAluno(data: CreateAlunoDto): Promise<void> {
    
    const query1 = `
      INSERT INTO aluno (escola_id, nome, tipo_deficiencia, necessidades)
      VALUES ($1, $2, $3, $4) RETURNING id
    `;

    const values1 = [data.escola_id, data.nome, data.tipo_deficiencia, data.necessidades];

    const result = await this.databaseService.query(query1, values1);
    const alunoId = result.rows[0].id;

    const query2 = `
      INSERT INTO caso (aluno_id, data_abertura, status, descricao, historico_modificacoes)
      VALUES ($1, $2, $3, $4, $5)
    `;

    const values2 = [
      alunoId, 
      data.data_abertura,
      data.status,
      data.descricao || null,
      data.historico_modificacoes || null
    ]

    await this.databaseService.query(query2, values2);
  }

  // Buscar todos os alunos
  async getAllAlunos(): Promise<Aluno[]> {
    const query = `SELECT * FROM aluno`;
    const result = await this.databaseService.query(query);
    return result.rows;
  }

  // Buscar um aluno por ID
  async getAlunoById(id: number): Promise<Aluno | null> {
    const query = `SELECT * FROM aluno WHERE id = $1`;
    const result = await this.databaseService.query(query, [id]);
    return result.rows.length ? result.rows[0] : null;
  }

  // Atualizar um aluno por ID
  async updateAluno(id: number, data: UpdateAlunoDto): Promise<void> {
    const query = `UPDATE aluno SET escola_id = $1, nome = $2, tipo_deficiencia = $3, necessidades = $4 WHERE id = $5`;
    const values = [data.escola_id, data.nome, data.tipo_deficiencia, data.necessidades, id];
    await this.databaseService.query(query, values);
  }

  // Deletar um aluno por ID
  async deleteAluno(id: number): Promise<void> {
    const query = `DELETE FROM aluno WHERE id = $1`;
    await this.databaseService.query(query, [id]);
  }

  // Registrar uma alteração no caso de um aluno
  async registerCase(data: CreateRegisterCaseDto): Promise<void> {
    const query = `INSERT INTO caso (aluno_id, data_abertura, status, descricao, historico_modificacoes) VALUES ($1, $2, $3, $4, $5)`;
    const values = [data.aluno_id, data.data_abertura, data.status, data.descricao || null, data.historico_modificacoes || null];
    await this.databaseService.query(query, values);
  }
}
