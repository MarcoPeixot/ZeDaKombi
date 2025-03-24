// src/pages/messages.tsx
import { useState, useEffect, useRef } from "react";
import { Navbar } from "../components/ui/navbar";
import { Button } from "../components/ui/button";
import { Send, LogOut, Circle } from "lucide-react";
import { useAuth } from "../context/auth-context";
import { useUser } from "../context/user-context";
import { useNavigate } from "react-router-dom";
import io, { Socket } from "socket.io-client";

interface Message {
  id: number;
  sender: "me" | "them";
  text: string;
  time: string;
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

let socket: Socket | null = null;

export default function MessagesPage() {
  const { token } = useAuth();
  const { userType } = useUser();
  const navigate = useNavigate();
  const [messages, setMessages] = useState<Message[]>([]);
  const [inputMessage, setInputMessage] = useState("");
  const [isConnected, setIsConnected] = useState(false);
  const [chatId, setChatId] = useState<number | null>(null);
  const [targetUserName, setTargetUserName] = useState<string>("Usuário");
  const [isTargetOnline, setIsTargetOnline] = useState<boolean>(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const [userId, setUserId] = useState<number | null>(null);
  const [toUserId, setToUserId] = useState<number | null>(null);

  useEffect(() => {
    const storedUserId = parseInt(localStorage.getItem("userId") || "0");
    const storedToUserId = parseInt(localStorage.getItem("targetUserId") || "0");
    if (storedUserId && storedToUserId) {
      setUserId(storedUserId);
      setToUserId(storedToUserId);
    }
  }, []);

  useEffect(() => {
    if (!userId || !toUserId) return;

    const connect = async () => {
      const chatKey = `chat_${userId}_${toUserId}`;
      let id = localStorage.getItem(chatKey);

      if (!id) {
        const res = await fetch("http://localhost:3001/chats/create", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ user1: userId, user2: toUserId }),
        });
        const data = await res.json();
        id = data.chatId.toString();
        localStorage.setItem(chatKey, id);
      }

      const chatNum = parseInt(id);
      setChatId(chatNum);
      await fetchMessages(chatNum);
      await fetchTargetUserName();

      if (!socket) {
        socket = io("http://localhost:3001", {
          withCredentials: true,
          transports: ["websocket"],
        });

        socket.on("connect", () => {
          setIsConnected(true);
          socket?.emit("registerUser", userId);
        });

        socket.on("message", (data) => {
          const newMsg: Message = {
            id: Date.now(),
            sender: data.fromUserId === userId ? "me" : "them",
            text: data.message,
            time: new Date().toLocaleTimeString(),
          };

          setMessages((prev) => {
            const isDuplicate = prev.some(
              (m) =>
                m.text === newMsg.text &&
                m.sender === newMsg.sender &&
                m.time === newMsg.time
            );
            return isDuplicate ? prev : [...prev, newMsg];
          });
        });

        socket.on("connect_error", () => setIsConnected(false));
        socket.on("disconnect", () => setIsConnected(false));
      } else {
        socket.emit("registerUser", userId);
      }
    };

    connect();

    return () => {
      socket?.off("connect");
      socket?.off("message");
    };
  }, [userId, toUserId]);

  const fetchMessages = async (chatId: number) => {
    const res = await fetch(`http://localhost:3001/chats/${chatId}/messages`);
    const data: BackendMessage[] = await res.json();

    const formatted = data.map((msg) => ({
      id: msg.id,
      sender: msg.user_id === userId ? "me" : "them",
      text: msg.message,
      time: new Date(msg.created_at).toLocaleTimeString(),
    }));

    setMessages(formatted);
  };

  const fetchTargetUserName = async () => {
    const res = await fetch("http://localhost:8000/usuarios", {
      headers: { Authorization: `Bearer ${token}` },
    });
    const data: UserInfo[] = await res.json();
    const target = data.find((u) => u.id === toUserId);
    if (target) setTargetUserName(target.name);
  };

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  useEffect(() => {
    const onlineInterval = setInterval(() => {
      if (socket && socket.connected) {
        setIsTargetOnline(true);
      } else {
        setIsTargetOnline(false);
      }
    }, 3000);
    return () => clearInterval(onlineInterval);
  }, [toUserId]);

  const sendMessage = () => {
    if (!inputMessage.trim() || !chatId || !toUserId || !userId) return;

    const messageData = {
      chatId,
      fromUserId: userId,
      toUserId,
      message: inputMessage,
    };

    socket?.emit("sendMessage", messageData);

    const newMessage: Message = {
      id: Date.now(),
      sender: "me",
      text: inputMessage,
      time: new Date().toLocaleTimeString(),
    };

    setMessages((prev) => [...prev, newMessage]);
    setInputMessage("");
  };

  const handleLeaveChat = () => {
    localStorage.removeItem("targetUserId");
    setMessages([]);
    socket?.disconnect();
    socket = null;
    setIsConnected(false);
    navigate("/lista");
  };

  return (
    <>
      <Navbar />
      <main className="max-w-4xl mx-auto px-4 py-6">
        <div className="flex justify-between items-center mb-4">
          <div className="flex items-center gap-2">
            <h2 className="text-xl font-bold">{targetUserName}</h2>
            <Circle
              className={`h-3 w-3 ${
                isTargetOnline ? "text-green-500" : "text-gray-400"
              }`}
              fill={isTargetOnline ? "#22c55e" : "#9ca3af"}
            />
          </div>
          <Button variant="outline" onClick={handleLeaveChat}>
            <LogOut className="w-4 h-4 mr-2" /> Sair
          </Button>
        </div>

        {!isConnected && (
          <p className="text-sm text-red-500">Conectando ao servidor...</p>
        )}

        <div className="bg-white border rounded-xl shadow h-[70vh] flex flex-col">
          <div className="flex-1 overflow-y-auto p-4 space-y-4">
            {messages.map((m) => (
              <div
                key={m.id}
                className={`max-w-[70%] p-3 rounded-xl text-sm ${
                  m.sender === "me"
                    ? "bg-blue-600 text-white self-end"
                    : "bg-gray-100 text-gray-900 self-start"
                }`}
              >
                <p>{m.text}</p>
                <div className="text-xs text-right mt-1">{m.time}</div>
              </div>
            ))}
            <div ref={messagesEndRef} />
          </div>

          <div className="p-3 border-t flex gap-2">
            <input
              value={inputMessage}
              onChange={(e) => setInputMessage(e.target.value)}
              placeholder="Digite sua mensagem..."
              className="flex-1 px-4 py-2 border rounded-full"
              onKeyDown={(e) => {
                if (e.key === "Enter") sendMessage();
              }}
            />
            <Button
              className="bg-blue-600 hover:bg-blue-700 text-white"
              onClick={sendMessage}
              disabled={!inputMessage.trim()}
            >
              <Send className="h-5 w-5" />
            </Button>
          </div>
        </div>
      </main>
    </>
  );
}
a