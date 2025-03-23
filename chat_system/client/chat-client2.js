"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const socket_io_client_1 = require("socket.io-client");
// Conectar ao servidor WebSocket
const socket = (0, socket_io_client_1.io)('http://localhost:3001'); // Endereço do servidor WebSocket
// Registrar o usuário com seu ID (usuário autenticado)
function registerUser(userId) {
    socket.emit('registerUser', userId); // Envia o ID do usuário ao servidor
}
// Enviar mensagem para outro usuário
function sendMessage(fromUserId, toUserId, message) {
    socket.emit('sendMessage', { fromUserId, toUserId, message });
}
// Ouvir mensagens recebidas
socket.on('message', (data) => {
    console.log('Mensagem recebida:', data);
});
// Exemplo de uso
const userId = 2; // Este seria o ID do usuário autenticado
const recipientUserId = 1; // ID do destinatário
// Registrar o usuário
registerUser(userId); // Registrar o usuário
// Enviar uma mensagem para outro usuário
sendMessage(userId, recipientUserId, 'Olá, como vai?');
