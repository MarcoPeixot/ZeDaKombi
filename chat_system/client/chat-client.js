"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const socket_io_client_1 = require("socket.io-client");

// Conectar ao servidor WebSocket
const socket = (0, socket_io_client_1.io)('http://localhost:3001'); // Endereço do servidor WebSocket

const CHAT_ID = 2; // Define o chat_id fixo como 2

// Registrar o usuário com seu ID (usuário autenticado)
function registerUser(userId) {
    socket.emit('registerUser', userId); // Envia o ID do usuário ao servidor
}

// Enviar mensagem para um chat específico
function sendMessage(fromUserId, message) {
    socket.emit('sendMessage', { chatId: CHAT_ID, fromUserId, message });
}

// Ouvir mensagens recebidas
socket.on('message', (data) => {
    console.log('Mensagem recebida:', data);
});

// Exemplo de uso
const userId = 7; // Este seria o ID do usuário autenticado

// Registrar o usuário
registerUser(userId);

// Enviar uma mensagem no chat 2
sendMessage(userId, 'Olá, como vai?');
