import { WebSocketGateway, WebSocketServer, OnGatewayConnection, OnGatewayDisconnect, SubscribeMessage, MessageBody, ConnectedSocket } from '@nestjs/websockets';
import { Server, Socket } from 'socket.io';
import { ChatService } from './chat.service';

@WebSocketGateway({ cors: { origin: '*' } })
export class ChatGateway implements OnGatewayConnection, OnGatewayDisconnect {
  @WebSocketServer()
  server: Server;

  // Mapeamento de usuário (ID do usuário) para socket (ID do socket)
  private users: Map<string, number> = new Map(); // Chave é string (client.id), valor é number (userId)

  constructor(private readonly chatService: ChatService) {}

  // Método chamado quando um cliente se conecta
  handleConnection(client: Socket) {
    console.log('Cliente conectado: ', client.id);
    // Aqui você pode capturar o ID do usuário (autenticação por token, por exemplo)
    // Em um caso real, você deve autenticar o usuário, por exemplo, usando JWT.
  }

  // Método chamado quando um cliente se desconecta
  handleDisconnect(client: Socket) {
    console.log('Cliente desconectado: ', client.id);
    // Remova a associação quando o usuário se desconectar
    this.users.forEach((userId, socketId) => {
      if (socketId === client.id) {
        this.users.delete(client.id);
        console.log(`Usuário com ID ${userId} removido ao desconectar.`);
      }
    });
  }

  // Associar um usuário ao seu socket
  @SubscribeMessage('registerUser')
  handleRegisterUser(@MessageBody() data: number, @ConnectedSocket() client: Socket): void {
    const userId = data; // Espera-se que o 'data' seja um número representando o ID do usuário
    if (userId) {
      console.log(`Usuário com ID ${userId} registrado.`);
      this.users.set(client.id, userId);  // Armazena a relação entre o socket (client.id) e o userId
      client.emit('message', { message: `Usuário ${userId} registrado com sucesso!` });
    } else {
      console.error('ID do usuário não encontrado ou inválido.');
    }
  }

  // Enviar uma mensagem para um usuário específico
  @SubscribeMessage('sendMessage')
  async handleMessage(@MessageBody() data: { fromUserId: number, toUserId: number, message: string }) {
    // Supondo que o chat_id seja 2, conforme mencionado
    const chatId = 2;
    
    // Chama o serviço para salvar a mensagem no banco de dados associada ao chat_id
    await this.chatService.sendMessage(chatId, data.fromUserId, data.message);

    // Verifica se o destinatário está conectado
    const recipientSocketId = [...this.users.entries()].find(([_, id]) => id === data.toUserId)?.[0];
    if (recipientSocketId) {
      // Envia a mensagem para o destinatário
      this.server.to(recipientSocketId).emit('message', { fromUserId: data.fromUserId, message: data.message });
      console.log(`Mensagem enviada para o usuário ${data.toUserId}`);
    } else {
      console.log(`Usuário ${data.toUserId} não está online.`);
    }
  }
}
