import { useState, useEffect, useRef } from "react";
import { Navbar } from "../components/ui/navbar";
import { Button } from "../components/ui/button";
import { Search, Send } from "lucide-react";
import { useAuth } from "../context/auth-context";
import { useUser } from "../context/user-context";
import io, { Socket } from 'socket.io-client'; // Importe o tipo Socket

// Criando instância de Socket.IO fora do componente para evitar múltiplas conexões
let socket: Socket; // Defina o tipo da variável socket

export default function MessagesPage() {
  const { token } = useAuth();
  const { userType } = useUser();
  const [activeContact, setActiveContact] = useState(0);
  const [messages, setMessages] = useState<{ [key: number]: any[] }>({});
  const [inputMessage, setInputMessage] = useState("");
  const [isConnected, setIsConnected] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  
  // Obtém o ID do usuário do localStorage 
  const getUserId = () => {
    return parseInt(localStorage.getItem('userId') || '1');
  };

  const userId = getUserId();

  const contacts = [
    { id: 2, name: "Ricardo Pereira", company: "ABC Inovações", avatar: "RP", unread: 2 },
    { id: 3, name: "Ana Silva", company: "Tech Solutions", avatar: "AS", unread: 0 },
    { id: 4, name: "Carlos Mendes", company: "Invest Capital", avatar: "CM", unread: 1 },
    { id: 5, name: "Mariana Costa", company: "Green Energy", avatar: "MC", unread: 0 },
  ];

  // Inicializar a conexão socket quando o componente montar
  useEffect(() => {
    // Inicializar socket (apenas uma vez)
    if (!socket) {
      socket = io('http://localhost:3001', {
        withCredentials: true,
        transports: ['websocket'],
        upgrade: false
      });
    }

    // Verificação de autenticação
    if (!token) {
      console.error("Usuário não autenticado.");
      return;
    }

    // Conectar socket
    socket.on('connect', () => {
      console.log('Socket conectado!');
      setIsConnected(true);
      
      // Registrar usuário no socket
      socket.emit('registerUser', userId);
      console.log(`Registrando usuário: ${userId}`);
    });

    socket.on('connect_error', (error) => {
      console.error('Erro de conexão socket:', error);
      setIsConnected(false);
    });

    // Cleanup na desmontagem do componente
    return () => {
      // Apenas remover os listeners, não desconectar o socket
      socket.off('connect');
      socket.off('connect_error');
      socket.off('message');
    };
  }, [token, userId]);

  // Configurar listener de mensagens
  useEffect(() => {
    if (!socket) return;

    // Remover listener existente para evitar duplicação
    socket.off('message');
    
    // Ouvir mensagens recebidas
    socket.on('message', (data) => {
      console.log("Mensagem recebida:", data);
      
      if (data.message) {
        // Se for mensagem de sucesso do registro do usuário, ignore
        if (data.message.includes('registrado com sucesso')) {
          return;
        }
        
        // Determinar o ID do contato baseado em quem enviou a mensagem
        const contactId = data.fromUserId === userId ? 
          data.toUserId : // Se eu enviei, associe ao destinatário
          data.fromUserId; // Se recebi, associe ao remetente
        
        // Encontrar o índice do contato na lista
        const contactIndex = contacts.findIndex(c => c.id === contactId);
        if (contactIndex === -1) return; // Contato não encontrado
        
        const newMessage = {
          id: Date.now(),
          sender: data.fromUserId === userId ? "me" : "them",
          text: data.message,
          time: new Date().toLocaleTimeString(),
        };

        setMessages(prevMessages => {
          // Clonar o objeto de mensagens para não modificar o estado diretamente
          const updatedMessages = {...prevMessages};
          
          // Inicializar o array para este contato se não existir
          if (!updatedMessages[contactIndex]) {
            updatedMessages[contactIndex] = [];
          }
          
          // Adicionar a nova mensagem
          updatedMessages[contactIndex] = [
            ...(updatedMessages[contactIndex] || []),
            newMessage
          ];
          
          return updatedMessages;
        });
      }
    });
  }, [userId, contacts]);

  // Carregar mensagens anteriores
  useEffect(() => {
    // Simulação de carregar mensagens anteriores
    // Em uma implementação real, você faria uma requisição ao backend
    const mockMessages = {
      0: [
        {
          id: 1,
          sender: "them",
          text: "Olá! Estou interessado no seu projeto.",
          time: "10:30"
        },
        {
          id: 2,
          sender: "me",
          text: "Ótimo! Podemos marcar uma reunião para discutir os detalhes.",
          time: "10:32"
        }
      ],
      1: [
        {
          id: 3,
          sender: "them",
          text: "Bom dia! Vi seu artigo sobre energias renováveis.",
          time: "09:15"
        }
      ]
    };
    
    // Definir as mensagens mock apenas se não houver mensagens
    setMessages(prevMessages => {
      if (Object.keys(prevMessages).length === 0) {
        return mockMessages;
      }
      return prevMessages;
    });
  }, []);

  // Scrollar para a última mensagem quando novas mensagens chegarem
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages, activeContact]);

  const sendMessage = () => {
    if (inputMessage.trim() && isConnected) {
      const targetUserId = contacts[activeContact].id;
      
      console.log(`Enviando mensagem para usuário ${targetUserId}`);
      
      // Formato correto para enviar mensagem via socket
      socket.emit('sendMessage', {
        chatId: 2, // Chat ID fixo
        fromUserId: userId,
        toUserId: targetUserId,
        message: inputMessage
      });

      // Não precisamos adicionar manualmente ao estado, pois o evento 'message' será disparado

      setInputMessage("");
    }
  };

  // Handler para envio com Enter
  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      sendMessage();
    }
  };

  return (
    <>
      <Navbar />
      <main className="max-w-6xl mx-auto px-4 py-6">
        <div className="mb-6">
          <h1 className="text-2xl font-semibold mb-2">Mensagens</h1>
          <p className="text-secondary">Converse com empresários e pesquisadores</p>
          {!isConnected && (
            <p className="text-red-500 text-sm mt-1">
              Não conectado ao servidor de chat. Tentando reconectar...
            </p>
          )}
        </div>

        <div className="bg-white rounded-2xl shadow-md overflow-hidden">
          <div className="flex h-[80vh]">
            {/* Sidebar de contatos */}
            <div className="w-80 border-r bg-muted/30 overflow-y-auto">
              <div className="p-4 border-b">
                <div className="relative">
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-secondary" />
                  <input
                    type="text"
                    placeholder="Buscar contatos..."
                    className="w-full pl-9 pr-4 py-2 border border-input rounded-lg bg-white"
                  />
                </div>
              </div>

              {contacts.map((contact, index) => (
                <div
                  key={contact.id}
                  className={`flex items-center gap-3 px-4 py-3 cursor-pointer border-b hover:bg-muted/50 ${
                    activeContact === index ? "bg-muted" : ""
                  }`}
                  onClick={() => setActiveContact(index)}
                >
                  <div className="avatar-sm">{contact.avatar}</div>
                  <div className="flex-1 min-w-0">
                    <div className="font-medium truncate">{contact.name}</div>
                    <div className="text-sm text-secondary truncate">{contact.company}</div>
                  </div>
                  {contact.unread > 0 && (
                    <div className="h-5 w-5 rounded-full bg-blue-600 text-white text-xs flex items-center justify-center">
                      {contact.unread}
                    </div>
                  )}
                </div>
              ))}
            </div>

            {/* Área do chat */}
            <div className="flex-1 flex flex-col bg-white">
              {/* Header do chat */}
              <div className="p-4 border-b flex items-center gap-3 bg-muted/10">
                {activeContact >= 0 && contacts[activeContact] && (
                  <>
                    <div className="avatar-sm">{contacts[activeContact]?.avatar}</div>
                    <div>
                      <div className="font-medium">{contacts[activeContact]?.name}</div>
                      <div className="text-sm text-secondary">{contacts[activeContact]?.company}</div>
                    </div>
                  </>
                )}
              </div>

              {/* Mensagens */}
              <div className="flex-1 p-4 overflow-y-auto flex flex-col gap-4">
                {messages[activeContact]?.map((message) => (
                  <div
                    key={message.id}
                    className={`max-w-[70%] p-3 rounded-2xl text-sm ${
                      message.sender === "me"
                        ? "bg-blue-600 text-white self-end"
                        : "bg-gray-100 text-gray-900 self-start"
                    }`}
                  >
                    <p>{message.text}</p>
                    <div
                      className={`text-xs mt-1 text-right ${
                        message.sender === "me" ? "text-white/70" : "text-gray-500"
                      }`}
                    >
                      {message.time}
                    </div>
                  </div>
                ))}
                <div ref={messagesEndRef} />
              </div>

              {/* Campo de nova mensagem e botão de negociação */}
              <div className="p-4 border-t flex gap-2 bg-muted/10">
                <input
                  type="text"
                  placeholder="Digite sua mensagem..."
                  className="flex-1 px-4 py-3 border border-input rounded-full focus:outline-none focus:ring-2 focus:ring-blue-600"
                  value={inputMessage}
                  onChange={(e) => setInputMessage(e.target.value)}
                  onKeyDown={handleKeyDown}
                />
                {/* Exibe o botão de "Negociação" apenas para empresários */}
                {userType === "empresario" && (
                  <Button variant="outline" className="rounded-full">
                    Negociação
                  </Button>
                )}
                <Button 
                  className="rounded-full h-12 w-12 p-0 bg-blue-600 text-white" 
                  onClick={sendMessage}
                  disabled={!inputMessage.trim() || !isConnected}
                >
                  <Send className="h-5 w-5" />
                </Button>
              </div>
            </div>
          </div>
        </div>
      </main>
    </>
  );
}