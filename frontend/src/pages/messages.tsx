// src/pages/messages.tsx
import { useState, useEffect, useRef, useCallback } from "react";
import { Navbar } from "../components/ui/navbar";
import { Button } from "../components/ui/button";
import { Send, LogOut, Circle, Loader2, FileText } from "lucide-react";
import { useAuth } from "../context/auth-context";
//import { useUser } from "../context/user-context";
import { useNavigate } from "react-router-dom";
import io, { Socket } from "socket.io-client";
import { format } from "date-fns";
import { ptBR } from "date-fns/locale";
import { ContractButton } from "../components/contract-button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "../components/ui/dialog";

interface Message {
  id: number;
  sender: "me" | "them";
  text: string;
  time: string;
  timestamp: Date;
}

interface BackendMessage {
  id: number;
  user_id: number;
  message: string;
  created_at: string;
}

interface UserInfo {
  id: number;
  name: string;
}

// Configurações da API
const API_BASE_URL = "http://localhost:3001";
const SOCKET_URL = "http://localhost:3001"; // URL do servidor Socket.IO
const API_AUTH = "https://zedakombi-1.onrender.com";

// Socket instance management
const socketManager = {
  socket: null as Socket | null,
  initialize(userId: number, onMessage: (data: any) => void) {
    if (this.socket) {
      this.socket.disconnect();
    }

    this.socket = io(SOCKET_URL, {
      withCredentials: true,
      transports: ["websocket"],
      reconnectionAttempts: 10,
      reconnectionDelay: 3000,
      autoConnect: true,
    });

    this.socket.on("connect", () => {
      console.log("Socket connected, registering user:", userId);
      this.socket?.emit("registerUser", userId);
    });

    this.socket.on("message", onMessage);

    this.socket.on("disconnect", (reason) => {
      console.log("Disconnected:", reason);
    });

    return this.socket;
  },
  disconnect() {
    if (this.socket) {
      this.socket.disconnect();
      this.socket = null;
    }
  },
  getSocket() {
    return this.socket;
  }
};

export default function MessagesPage() {
  const { token } = useAuth();
  //const { userType } = useUser();
  const navigate = useNavigate();
  const [messages, setMessages] = useState<Message[]>([]);
  const [inputMessage, setInputMessage] = useState("");
  const [isConnected, setIsConnected] = useState(false);
  const [isConnecting, setIsConnecting] = useState(true);
  const [chatId, setChatId] = useState<number | null>(null);
  const [targetUserName, setTargetUserName] = useState<string>("Usuário");
  const [isTargetOnline, setIsTargetOnline] = useState<boolean>(false);
  const [userId, setUserId] = useState<number | null>(null);
  const [toUserId, setToUserId] = useState<number | null>(null);
  const [isSending, setIsSending] = useState(false);
  const [contractUrl, setContractUrl] = useState<string | null>(null);
  const [showContractModal, setShowContractModal] = useState(false);
  
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  const formatTime = (dateString: string | Date) => {
    const date = typeof dateString === 'string' ? new Date(dateString) : dateString;
    return format(date, 'HH:mm', { locale: ptBR });
  };

  const handleNewMessage = useCallback((data: { fromUserId: number; message: string }) => {
    console.log("New message received:", data);
    
    if (data.fromUserId !== userId) {
      const newMsg: Message = {
        id: Date.now(),
        sender: "them",
        text: data.message,
        time: formatTime(new Date()),
        timestamp: new Date(),
      };

      setMessages((prev) => [...prev, newMsg]);
    }
  }, [userId]);

  const initializeSocket = useCallback(() => {
    if (!userId) return;

    const socket = socketManager.initialize(userId, handleNewMessage);

    const onConnect = () => {
      setIsConnected(true);
      setIsConnecting(false);
      socket?.emit("registerUser", userId);
    };

    const onDisconnect = () => {
      setIsConnected(false);
      setIsConnecting(true);
    };

    socket?.on("connect", onConnect);
    socket?.on("disconnect", onDisconnect);

    return () => {
      socket?.off("connect", onConnect);
      socket?.off("disconnect", onDisconnect);
    };
  }, [userId, handleNewMessage]);

  const fetchTargetUserName = useCallback(async () => {
    try {
      const res = await fetch(`${API_AUTH}/usuarios`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      const data: UserInfo[] = await res.json();
      const target = data.find((u) => u.id === toUserId);
      if (target) setTargetUserName(target.name);
    } catch (error) {
      console.error("Failed to fetch user info:", error);
    }
  }, [token, toUserId]);

  const fetchMessages = useCallback(async (chatId: number) => {
    try {
      const res = await fetch(`${API_BASE_URL}/chats/${chatId}/messages`);
      const data: BackendMessage[] = await res.json();

      const formatted = data.map((msg) => ({
        id: msg.id,
        sender: (msg.user_id === userId ? "me" : "them") as "me" | "them",
        text: msg.message,
        time: formatTime(msg.created_at),
        timestamp: new Date(msg.created_at),
      }));

      setMessages(formatted);
    } catch (error) {
      console.error("Failed to fetch messages:", error);
    }
  }, [userId]);

  const initializeChat = useCallback(async () => {
    if (!userId || !toUserId) return;

    try {
      setIsConnecting(true);
      
      const chatKey = `chat_${userId}_${toUserId}`;
      let id = localStorage.getItem(chatKey);

      if (!id) {
        const res = await fetch(`${API_BASE_URL}/chats/create`, {
          method: "POST",
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}`
          },
          body: JSON.stringify({ userId, toUserId })
        });
        const data = await res.json();
        id = data.chatId.toString();
        if (id !== null) {
          localStorage.setItem(chatKey, id);
        }
      }

      const chatNum = parseInt(id || '0');
      setChatId(chatNum);
      
      await Promise.all([
        fetchMessages(chatNum),
        fetchTargetUserName(),
      ]);

      initializeSocket();
    } catch (error) {
      console.error("Chat initialization error:", error);
      setIsConnecting(false);
    }
  }, [userId, toUserId, fetchMessages, fetchTargetUserName, initializeSocket, token]);

  useEffect(() => {
    const storedUserId = parseInt(localStorage.getItem("userId") || "0");
    const storedToUserId = parseInt(localStorage.getItem("targetUserId") || "0");
    if (storedUserId && storedToUserId) {
      setUserId(storedUserId);
      setToUserId(storedToUserId);
    }
  }, []);

  useEffect(() => {
    if (userId && toUserId) {
      initializeChat();
    }

    return () => {
      const socket = socketManager.getSocket();
      socket?.off("connect");
      socket?.off("disconnect");
      socketManager.disconnect();
    };
  }, [userId, toUserId, initializeChat]);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  useEffect(() => {
    const onlineInterval = setInterval(() => {
      const socket = socketManager.getSocket();
      setIsTargetOnline(!!socket?.connected);
    }, 3000);
    return () => clearInterval(onlineInterval);
  }, []);

  const sendMessage = async () => {
    const socket = socketManager.getSocket();
    if (!inputMessage.trim() || !chatId || !toUserId || !userId || !socket) return;

    try {
      setIsSending(true);
      const messageData = {
        chatId,
        fromUserId: userId,
        toUserId,
        message: inputMessage,
      };

      socket.emit("sendMessage", messageData);

      const newMessage: Message = {
        id: Date.now(),
        sender: "me",
        text: inputMessage,
        time: formatTime(new Date()),
        timestamp: new Date(),
      };

      setMessages((prev) => [...prev, newMessage]);
      setInputMessage("");
      inputRef.current?.focus();
    } catch (error) {
      console.error("Failed to send message:", error);
    } finally {
      setIsSending(false);
    }
  };

  const handleLeaveChat = () => {
    localStorage.removeItem("targetUserId");
    navigate("/list");
  };

  const handleContractGenerated = (url: string) => {
    setContractUrl(url);
    setShowContractModal(true);
  };

  const groupedMessages = messages.reduce((acc, message) => {
    const date = format(message.timestamp, 'PPP', { locale: ptBR });
    if (!acc[date]) {
      acc[date] = [];
    }
    acc[date].push(message);
    return acc;
  }, {} as Record<string, Message[]>);

  return (
    <>
      <Navbar />
      <main className="max-w-4xl mx-auto px-4 py-6 h-[calc(100vh-80px)] flex flex-col">
        <div className="flex justify-between items-center mb-4">
          <div className="flex items-center gap-2">
            <h2 className="text-xl font-bold">{targetUserName}</h2>
            <div className="flex items-center gap-1">
              <Circle
                className={`h-3 w-3 ${
                  isTargetOnline ? "text-green-500" : "text-gray-400"
                }`}
                fill={isTargetOnline ? "#22c55e" : "#9ca3af"}
              />
              <span className="text-sm text-gray-500">
                {isTargetOnline ? "Online" : "Offline"}
              </span>
            </div>
          </div>
          <div className="flex gap-2">
            <ContractButton 
              chatId={chatId || 0} 
              onContractGenerated={handleContractGenerated}
              disabled={!isConnected || isConnecting}
            />
            <Button variant="outline" onClick={handleLeaveChat}>
              <LogOut className="w-4 h-4 mr-2" /> Sair
            </Button>
          </div>
        </div>

        {isConnecting ? (
          <div className="flex-1 flex flex-col items-center justify-center gap-2">
            <Loader2 className="h-8 w-8 animate-spin text-blue-500" />
            <p className="text-gray-500">Conectando ao chat...</p>
          </div>
        ) : (
          <div className="bg-white border rounded-xl shadow flex flex-col flex-1">
            <div className="flex-1 overflow-y-auto p-4 space-y-6">
              {Object.entries(groupedMessages).map(([date, dateMessages]) => (
                <div key={date} className="space-y-4">
                  <div className="text-center">
                    <span className="text-xs bg-gray-100 px-2 py-1 rounded-full text-gray-500">
                      {date}
                    </span>
                  </div>
                  {dateMessages.map((m) => (
                    <div
                      key={m.id}
                      className={`flex ${
                        m.sender === "me" ? "justify-end" : "justify-start"
                      }`}
                    >
                      <div
                        className={`max-w-[80%] p-3 rounded-xl text-sm ${
                          m.sender === "me"
                            ? "bg-blue-600 text-white"
                            : "bg-gray-100 text-gray-900"
                        }`}
                      >
                        <p className="break-words">{m.text}</p>
                        <div
                          className={`text-xs mt-1 ${
                            m.sender === "me"
                              ? "text-blue-100 text-right"
                              : "text-gray-500"
                          }`}
                        >
                          {m.time}
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              ))}
              <div ref={messagesEndRef} />
            </div>

            <div className="p-3 border-t">
              {!isConnected && (
                <div className="text-sm text-red-500 mb-2 flex items-center gap-1">
                  <Circle className="h-3 w-3" fill="#ef4444" />
                  Conexão perdida. Tentando reconectar...
                </div>
              )}
              <div className="flex gap-2">
                <input
                  ref={inputRef}
                  value={inputMessage}
                  onChange={(e) => setInputMessage(e.target.value)}
                  placeholder="Digite sua mensagem..."
                  className="flex-1 px-4 py-2 border rounded-full focus:outline-none focus:ring-2 focus:ring-blue-500"
                  onKeyDown={(e) => {
                    if (e.key === "Enter" && !e.shiftKey) {
                      e.preventDefault();
                      sendMessage();
                    }
                  }}
                  disabled={!isConnected}
                />
                <Button
                  className="bg-blue-600 hover:bg-blue-700 text-white"
                  onClick={sendMessage}
                  disabled={!inputMessage.trim() || !isConnected || isSending}
                >
                  {isSending ? (
                    <Loader2 className="h-5 w-5 animate-spin" />
                  ) : (
                    <Send className="h-5 w-5" />
                  )}
                </Button>
              </div>
            </div>
          </div>
        )}

        {/* Modal para visualização do contrato */}
        <Dialog open={showContractModal} onOpenChange={setShowContractModal}>
          <DialogContent className="fixed left-1/2 top-1/2 z-50 w-full max-w-4xl -translate-x-1/2 -translate-y-1/2 transform rounded-lg bg-white p-6 shadow-lg">
            <DialogHeader>
              <DialogTitle className="text-xl font-bold">Contrato Gerado</DialogTitle>
            </DialogHeader>
            <div className="mt-4 h-[70vh] flex flex-col">
              {contractUrl ? (
                <>
                  <iframe 
                    src={contractUrl} 
                    className="flex-1 w-full border rounded-lg"
                    title="Visualização do Contrato"
                  />
                  <div className="flex justify-end gap-2 mt-4">
                    <Button variant="outline" onClick={() => setShowContractModal(false)}>
                      Fechar
                    </Button>
                    <a href={contractUrl} download>
                      <Button>
                        <FileText className="mr-2 h-4 w-4" />
                        Baixar Contrato
                      </Button>
                    </a>
                  </div>
                </>
              ) : (
                <div className="flex-1 flex items-center justify-center">
                  <Loader2 className="h-8 w-8 animate-spin" />
                </div>
              )}
            </div>
          </DialogContent>
        </Dialog>
      </main>
    </>
  );
}