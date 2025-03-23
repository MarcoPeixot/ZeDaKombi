import { Injectable } from '@nestjs/common';
import { DatabaseService } from 'src/config/database.service';

@Injectable()
export class ChatService {
  constructor(private readonly databaseService: DatabaseService) {}

  // Enviar mensagem
  async sendMessage(userId: number, message: string): Promise<void> {
    const query = `
      INSERT INTO messages (user_id, message, created_at) 
      VALUES ($1, $2, NOW())
    `;
    await this.databaseService.query(query, [userId, message]);
  }

  // Buscar todas as mensagens
  async getMessages(): Promise<any[]> {
    const query = `
      SELECT m.id, m.message, m.created_at, u.name AS user_name, u.role AS user_role
      FROM messages m
      JOIN users u ON m.user_id = u.id
      ORDER BY m.created_at DESC
    `;
    const result = await this.databaseService.query(query);
    return result.rows;
  }

  // Buscar mensagens de um usuário específico
  async getMessagesByUser(userId: number): Promise<any[]> {
    const query = `
      SELECT m.id, m.message, m.created_at 
      FROM messages m 
      WHERE m.user_id = $1 
      ORDER BY m.created_at DESC
    `;
    const result = await this.databaseService.query(query, [userId]);
    return result.rows;
  }

  // Deletar uma mensagem de chat por ID
  async deleteMessageById(id: number): Promise<void> {
    const query = `DELETE FROM messages WHERE id = $1`;
    await this.databaseService.query(query, [id]);
  }

  // Atualizar uma mensagem de chat por ID
  async updateMessageById(id: number, newMessage: string): Promise<void> {
    const query = `UPDATE messages SET message = $1 WHERE id = $2`;
    await this.databaseService.query(query, [newMessage, id]);
  }

  // Buscar uma mensagem de chat por ID
  async getMessageById(id: number): Promise<any> {
    const query = `
      SELECT * FROM messages WHERE id = $1;
    `;
    const result = await this.databaseService.query(query, [id]);
    return result.rows; // Retorna a primeira mensagem, pois esperamos uma única mensagem
  }
}
