import { Controller, Get, Post, Body, Param, Put, Delete, ParseIntPipe } from '@nestjs/common';
import { ChatService } from './chat.service';
import { CreateChatDto } from './dto/create-chat.dto';
import { UpdateChatDto } from './dto/update-chat.dto';
import { Chat } from './interfaces/chat.interface';
import { ApiTags, ApiOperation, ApiResponse } from '@nestjs/swagger';
import { NotFoundException, BadRequestException } from 'src/utils/custom-exceptions';

@ApiTags('Chats') // Agrupa os endpoints no Swagger
@Controller('chats')
export class ChatController {
  constructor(private readonly chatService: ChatService) {}

  // Criar uma nova mensagem de chat
  @Post()
  @ApiOperation({ summary: 'Cria uma nova mensagem de chat' })
  @ApiResponse({ status: 201, description: 'Mensagem criada com sucesso' })
  @ApiResponse({ status: 400, description: 'Erro de validação' })
  async create(@Body() createChatDto: CreateChatDto): Promise<void> {
    if (!createChatDto.senderId || !createChatDto.message) {
      throw new BadRequestException('SenderId e message são obrigatórios');
    }
    await this.chatService.sendMessage(createChatDto.senderId, createChatDto.message);
  }

  // Listar todas as mensagens de chat
  @Get()
  @ApiOperation({ summary: 'Lista todas as mensagens de chat' })
  @ApiResponse({ status: 200, description: 'Lista de mensagens retornada com sucesso' })
  async findAll(): Promise<Chat[]> {
    return this.chatService.getMessages();
  }

  @Get('user/:userId')
  @ApiOperation({ summary: 'Lista todas as mensagens de um usuário específico' })
  @ApiResponse({ status: 200, description: 'Mensagens do usuário retornadas com sucesso' })
  @ApiResponse({ status: 404, description: 'Nenhuma mensagem encontrada' })
  async getMessagesByUser(@Param('userId') userId: number): Promise<any[]> {
    return await this.chatService.getMessagesByUser(userId);
  }

  // Buscar uma mensagem específica por ID
  @Get(':id')
  @ApiOperation({ summary: 'Busca uma mensagem por ID' })
  @ApiResponse({ status: 200, description: 'Mensagem encontrada' })
  @ApiResponse({ status: 404, description: 'Mensagem não encontrada' })
  async getMessageById(@Param('id', ParseIntPipe) id: number): Promise<any> {
    const message = await this.chatService.getMessageById(id);
    if (!message) {
      throw new NotFoundException(`Mensagem com ID ${id} não encontrada`);
    }
    return message;
  }

  // Atualizar uma mensagem por ID
  @Put(':id')
  @ApiOperation({ summary: 'Atualiza uma mensagem de chat por ID' })
  @ApiResponse({ status: 200, description: 'Mensagem atualizada com sucesso' })
  @ApiResponse({ status: 404, description: 'Mensagem não encontrada' })
  async updateMessage(
    @Param('id', ParseIntPipe) id: number,
    @Body() body: { message: string },
  ): Promise<void> {
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
  @Delete(':id')
  @ApiOperation({ summary: 'Deleta uma mensagem de chat por ID' })
  @ApiResponse({ status: 200, description: 'Mensagem deletada com sucesso' })
  @ApiResponse({ status: 404, description: 'Mensagem não encontrada' })
  async deleteMessage(@Param('id', ParseIntPipe) id: number): Promise<void> {
    const message = await this.chatService.getMessageById(id);
    if (!message) {
      throw new NotFoundException(`Mensagem com ID ${id} não encontrada`);
    }
    await this.chatService.deleteMessageById(id);
  }
}
