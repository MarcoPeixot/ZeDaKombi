import { Controller, Get, Post, Body, Param, Put, Delete, ParseIntPipe } from '@nestjs/common';
import { ChatService } from './chat.service';
import { CreateChatDto } from './dto/create-chat.dto';
import { ApiTags, ApiOperation, ApiResponse } from '@nestjs/swagger';
import { NotFoundException, BadRequestException } from 'src/utils/custom-exceptions';

@ApiTags('Chats')
@Controller('chats')
export class ChatController {
  constructor(private readonly chatService: ChatService) {}

  // Criar um novo chat e retornar o ID
  @Post('create')
  @ApiOperation({ summary: 'Cria um novo chat' })
  @ApiResponse({ status: 201, description: 'Chat criado com sucesso' })
  async createChat(): Promise<{ chatId: number }> {
    const chatId = await this.chatService.createChat();
    return { chatId };
  }

  // Enviar mensagem associada a um chat
  @Post('message')
  @ApiOperation({ summary: 'Envia uma mensagem para um chat' })
  @ApiResponse({ status: 201, description: 'Mensagem enviada com sucesso' })
  @ApiResponse({ status: 400, description: 'Erro de validação' })
  async sendMessage(@Body() createChatDto: CreateChatDto): Promise<void> {
    if (!createChatDto.chatId || !createChatDto.userId || !createChatDto.message) {
      throw new BadRequestException('chatId, userId e message são obrigatórios');
    }
    await this.chatService.sendMessage(createChatDto.chatId, createChatDto.userId, createChatDto.message);
  }

  // Listar todas as mensagens de chat
  @Get('messages')
  @ApiOperation({ summary: 'Lista todas as mensagens de chat' })
  @ApiResponse({ status: 200, description: 'Lista de mensagens retornada com sucesso' })
  async findAll(): Promise<any[]> {
    return this.chatService.getMessages();
  }

  // Buscar mensagens por chatId
  @Get(':chatId/messages')
  @ApiOperation({ summary: 'Lista todas as mensagens de um chat específico' })
  @ApiResponse({ status: 200, description: 'Mensagens do chat retornadas com sucesso' })
  async getMessagesByChatId(@Param('chatId', ParseIntPipe) chatId: number): Promise<any[]> {
    return this.chatService.getMessagesByChatId(chatId);
  }

  // Buscar mensagens de um usuário específico dentro de um chat
  @Get(':chatId/user/:userId')
  @ApiOperation({ summary: 'Lista todas as mensagens de um usuário dentro de um chat' })
  @ApiResponse({ status: 200, description: 'Mensagens do usuário retornadas com sucesso' })
  async getMessagesByUser(
    @Param('chatId', ParseIntPipe) chatId: number,
    @Param('userId', ParseIntPipe) userId: number,
  ): Promise<any[]> {
    return this.chatService.getMessagesByUser(chatId, userId);
  }

  // Buscar uma mensagem específica por ID
  @Get('message/:id')
  @ApiOperation({ summary: 'Busca uma mensagem por ID' })
  @ApiResponse({ status: 200, description: 'Mensagem encontrada' })
  async getMessageById(@Param('id', ParseIntPipe) id: number): Promise<any> {
    const message = await this.chatService.getMessageById(id);
    if (!message) {
      throw new NotFoundException(`Mensagem com ID ${id} não encontrada`);
    }
    return message;
  }

  // Atualizar uma mensagem por ID
  @Put('message/:id')
  @ApiOperation({ summary: 'Atualiza uma mensagem de chat por ID' })
  @ApiResponse({ status: 200, description: 'Mensagem atualizada com sucesso' })
  async updateMessage(@Param('id', ParseIntPipe) id: number, @Body() body: { message: string }): Promise<void> {
    if (!body.message) {
      throw new BadRequestException('A mensagem não pode ser vazia');
    }
    const message = await this.chatService.getMessageById(id);
    if (!message) {
      throw new NotFoundException(`Mensagem com ID ${id} não encontrada`);
    }
    await this.chatService.updateMessageById(id, body.message);
  }

  // Deletar uma mensagem por ID
  @Delete('message/:id')
  @ApiOperation({ summary: 'Deleta uma mensagem de chat por ID' })
  @ApiResponse({ status: 200, description: 'Mensagem deletada com sucesso' })
  async deleteMessage(@Param('id', ParseIntPipe) id: number): Promise<void> {
    const message = await this.chatService.getMessageById(id);
    if (!message) {
      throw new NotFoundException(`Mensagem com ID ${id} não encontrada`);
    }
    await this.chatService.deleteMessageById(id);
  }
}
