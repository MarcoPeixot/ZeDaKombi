import { useState, useEffect } from "react";
import { Navbar } from "../components/ui/navbar";
import { Button } from "../components/ui/button";
import { Search, Send } from "lucide-react";
import { useUser } from "../context/user-context"; // Importe o contexto
import io from 'socket.io-client';

export default function MessagesPage() {
  const { userType } = useUser(); // Consuma o userType do contexto
  const [activeContact, setActiveContact] = useState(0);
  const [messages, setMessages] = useState({});
  const [inputMessage, setInputMessage] = useState("");

  const socket = io('http://localhost:3001'); // Conecta ao servidor WebSocket

  const contacts = [
    { id: 0, name: "Ricardo Pereira", company: "ABC Inovações", avatar: "RP", unread: 2 },
    { id: 1, name: "Ana Silva", company: "Tech Solutions", avatar: "AS", unread: 0 },
    { id: 2, name: "Carlos Mendes", company: "Invest Capital", avatar: "CM", unread: 1 },
    { id: 3, name: "Mariana Costa", company: "Green Energy", avatar: "MC", unread: 0 },
  ];

  useEffect(() => {
    // Registrar o usuário (exemplo com userId 1)
    socket.emit('registerUser', 1);

    // Ouvir mensagens recebidas
    socket.on('message', (data) => {
      const newMessage = {
        id: Date.now(), // ID único para a mensagem
        sender: data.fromUserId === 1 ? "me" : "them",
        text: data.message,
        time: new Date().toLocaleTimeString(),
      };

      setMessages((prevMessages) => ({
        ...prevMessages,
        [activeContact]: [...(prevMessages[activeContact] || []), newMessage],
      }));
    });

    return () => {
      socket.off('message');
    };
  }, [activeContact]);

  const sendMessage = () => {
    if (inputMessage.trim()) {
      const toUserId = contacts[activeContact].id; // ID do destinatário
      socket.emit('sendMessage', { fromUserId: 1, toUserId, message: inputMessage });

      const newMessage = {
        id: Date.now(),
        sender: "me",
        text: inputMessage,
        time: new Date().toLocaleTimeString(),
      };

      setMessages((prevMessages) => ({
        ...prevMessages,
        [activeContact]: [...(prevMessages[activeContact] || []), newMessage],
      }));

      setInputMessage("");
    }
  };

  return (
    <>
      <Navbar />
      <main className="max-w-6xl mx-auto px-4 py-6">
        <div className="mb-6">
          <h1 className="text-2xl font-semibold mb-2">Mensagens</h1>
          <p className="text-secondary">Converse com empresários e pesquisadores</p>
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

              {contacts.map((contact) => (
                <div
                  key={contact.id}
                  className={`flex items-center gap-3 px-4 py-3 cursor-pointer border-b hover:bg-muted/50 ${
                    activeContact === contact.id ? "bg-muted" : ""
                  }`}
                  onClick={() => setActiveContact(contact.id)}
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
                <div className="avatar-sm">{contacts[activeContact]?.avatar}</div>
                <div>
                  <div className="font-medium">{contacts[activeContact]?.name}</div>
                  <div className="text-sm text-secondary">{contacts[activeContact]?.company}</div>
                </div>
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
              </div>

              {/* Campo de nova mensagem e botão de negociação */}
              <div className="p-4 border-t flex gap-2 bg-muted/10">
                <input
                  type="text"
                  placeholder="Digite sua mensagem..."
                  className="flex-1 px-4 py-3 border border-input rounded-full focus:outline-none focus:ring-2 focus:ring-blue-600"
                  value={inputMessage}
                  onChange={(e) => setInputMessage(e.target.value)}
                />
                {/* Exibe o botão de "Negociação" apenas para empresários */}
                {userType === "entrepreneur" && (
                  <Button variant="outline" className="rounded-full">
                    Negociação
                  </Button>
                )}
                <Button className="rounded-full h-12 w-12 p-0 bg-blue-600 text-white" onClick={sendMessage}>
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