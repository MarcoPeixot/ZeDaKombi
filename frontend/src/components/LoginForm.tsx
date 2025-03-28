// components/LoginForm.tsx
import { useState } from "react";
import { Button } from "../components/ui/button";
import { Lock } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../context/auth-context";
import { useUser } from "../context/user-context";
import { Link } from "react-router-dom";

export function LoginForm() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();
  const { login } = useAuth();
  const { setUserType } = useUser();

  const handleLogin = async () => {
    try {
      const response = await fetch('https://zedakombi-1.onrender.com/token', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/x-www-form-urlencoded',
        },
        body: new URLSearchParams({
          username: email,
          password: password,
        }),
      });
  
      if (!response.ok) {
        throw new Error('Login failed');
      }
  
      const data = await response.json();
      
      // Busca informações completas do usuário
      const userResponse = await fetch(`https://zedakombi-1.onrender.com/usuarios/${data.user_id}`);
      if (!userResponse.ok) {
        throw new Error('Failed to fetch user details');
      }
      const userData = await userResponse.json();
  
      // Armazena todas as informações
      login(
        data.access_token, 
        data.role,
        {
          id: data.user_id.toString(),
          name: userData.name,
          email: email
        }
      );
  
      // Redireciona com base na role
      if (data.role === "pesquisador") {
        navigate("/researcher-feed");
      } else if (data.role === "empresario") {
        navigate("/entrepreneur-feed");
      }
    } catch (error) {
      console.error('Login error:', error);
    }
  };

  return (
    <div className="bg-white p-8 sm:p-10 rounded-2xl shadow-xl max-w-md w-full text-center">
      {/* Logo */}
      <div className="flex items-center justify-center mb-6">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="32"
          height="32"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
          strokeWidth="2"
          className="text-blue-600"
        >
          <rect x="3" y="3" width="18" height="18" rx="2" ry="2" />
        </svg>
        <h1 className="ml-2 text-2xl font-bold text-blue-600">NexusR</h1>
      </div>

      <h1 className="text-2xl font-semibold mb-4">Bem-vindo à plataforma</h1>
      <p className="text-gray-600 mb-6">
        A ponte entre a pesquisa científica e o mundo empresarial, utilizando blockchain para promover inovação e colaboração.
      </p>

      <input
        type="email"
        placeholder="Email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        className="w-full p-2 border rounded-lg mb-4"
      />
      <input
        type="password"
        placeholder="Senha"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        className="w-full p-2 border rounded-lg mb-4"
      />

      <Button
        onClick={handleLogin}
        className="w-full py-4 text-md font-medium flex items-center justify-center gap-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg"
      >
        <Lock className="h-5 w-5" />
        Conectar
      </Button>

      <p className="text-xs text-gray-500 mt-6">
        Ao conectar, você concorda com nossos{" "}
        <a href="#" className="text-blue-600 hover:underline">
          Termos de Serviço
        </a>
      </p>

      <p className="text-sm text-gray-600 mt-4">
        Não tem uma conta?{" "}
        <Link to="/signup" className="text-blue-600 hover:underline">
          Cadastre-se
        </Link>
      </p>
    </div>
  );
}