import { Injectable } from '@nestjs/common';
import { DatabaseService } from 'src/config/database.service';

@Injectable()
export class ChatService {
  constructor(private readonly databaseService: DatabaseService) {}

  // Criar um novo chat e retornar o ID gerado
  async createChat(): Promise<number> {
    const query = `INSERT INTO chats (created_at) VALUES (NOW()) RETURNING id`;
    const result = await this.databaseService.query(query);
    return result.rows[0].id; // Retorna o ID do chat criado
  }

  // Enviar mensagem associada a um chat
  async sendMessage(chatId: number, userId: number, message: string): Promise<void> {
    const query = `
      INSERT INTO messages (chat_id, user_id, message, created_at) 
      VALUES ($1, $2, $3, NOW())
    `;
    await this.databaseService.query(query, [chatId, userId, message]);
  }

  // Buscar todas as mensagens agrupadas por chat
  async getMessages(): Promise<any[]> {
    const query = `
      SELECT m.id, m.chat_id, m.user_id, m.message, m.created_at 
      FROM messages m 
      ORDER BY m.created_at ASC
    `;
    const result = await this.databaseService.query(query);
    return result.rows;
  }

  // Buscar mensagens de um chat específico
  async getMessagesByChatId(chatId: number): Promise<any[]> {
    const query = `
      SELECT m.id, m.user_id, m.message, m.created_at 
      FROM messages m 
      WHERE m.chat_id = $1 
      ORDER BY m.created_at ASC
    `;
    const result = await this.databaseService.query(query, [chatId]);
    return result.rows;
  }

  // Buscar mensagens de um usuário específico dentro de um chat
  async getMessagesByUser(chatId: number, userId: number): Promise<any[]> {
    const query = `
      SELECT m.id, m.message, m.created_at 
      FROM messages m 
      WHERE m.chat_id = $1 AND m.user_id = $2 
      ORDER BY m.created_at ASC
    `;
    const result = await this.databaseService.query(query, [chatId, userId]);
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
    return result.rows[0]; // Retorna apenas a mensagem encontrada
  }
}
