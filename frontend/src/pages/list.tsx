import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../context/auth-context";
import { Navbar } from "../components/ui/navbar";
import { Button } from "../components/ui/button";

interface User {
  id: number;
  name: string;
  email: string;
}

export default function UserListPage() {
  const { token } = useAuth();
  const navigate = useNavigate();
  const [users, setUsers] = useState<User[]>([]);
  const userId = parseInt(localStorage.getItem("userId") || "0");

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const res = await fetch("http://localhost:8000/usuarios", {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        const data = await res.json();

        // Remove o próprio usuário da lista
        const filtered = data.filter((user: User) => user.id !== userId);
        setUsers(filtered);
      } catch (error) {
        console.error("Erro ao buscar usuários:", error);
      }
    };

    fetchUsers();
  }, [token, userId]);

  const handleStartChat = (targetId: number) => {
    localStorage.setItem("targetUserId", targetId.toString());
    navigate("/messages");
  };

  return (
    <>
      <Navbar />
      <main className="max-w-4xl mx-auto px-4 py-6">
        <h1 className="text-2xl font-bold mb-6">Usuários Disponíveis</h1>

        {users.length === 0 ? (
          <p className="text-gray-500">Nenhum outro usuário disponível.</p>
        ) : (
          <ul className="space-y-4">
            {users.map((user) => (
              <li
                key={user.id}
                className="border rounded-lg p-4 flex items-center justify-between bg-white shadow"
              >
                <div>
                  <p className="font-medium">{user.name}</p>
                  <p className="text-sm text-gray-500">{user.email}</p>
                </div>
                <Button  className="bg-blue-600 hover:bg-blue-700 text-white" onClick={() => handleStartChat(user.id)}>Conversar</Button>
              </li>
            ))}
          </ul>
        )}
      </main>
    </>
  );
}
