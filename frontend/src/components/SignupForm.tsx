// src/components/SignupForm.tsx
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "./ui/button";
import { User, Briefcase } from "lucide-react";
import { useNearWallet } from "../hooks/useNearWallets"; 


export function SignupForm() {
  const { connect, getAccountId } = useNearWallet();
  const [step, setStep] = useState<"select-type" | "register">("select-type");
  const [selectedType, setSelectedType] = useState<"researcher" | "entrepreneur" | null>(null);
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const handleSelectType = (type: "researcher" | "entrepreneur") => {
    setSelectedType(type);
    setStep("register");
  };

  const handleRegister = async () => {
    try {
      const response = await fetch("http://localhost:8000/registrar", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name,
          email,
          senha: password,
          role: selectedType === "researcher" ? "pesquisador" : "empresario",
        }),
      });
  
      if (!response.ok) {
        const errorData = await response.json();
        console.error("Erro da API:", errorData);
        throw new Error("Erro ao cadastrar usuário");
      }
  
      const data = await response.json();
      const userId = data.user_id;
      localStorage.setItem("user_id", userId.toString());
      localStorage.setItem("selectedType", selectedType || "");
  
      // 👉 conecta carteira NEAR
      await connect();
  
      // Após conexão manual do usuário
      const interval = setInterval(async () => {
        const nearAccountId = getAccountId();
        if (nearAccountId) {
          clearInterval(interval);
  
          // 🔁 Registra a carteira no backend
          await fetch("http://localhost:8000/registrar-carteira", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({
              user_id: userId,
              near_wallet: nearAccountId,
              zec_wallet: "", // Aqui pode vir um campo opcional depois
            }),
          });
  
          navigate("/registro-sucesso");
        }
      }, 1000);
    } catch (error) {
      console.error("Erro no cadastro:", error);
    }
  };
  
  const typeLabel = selectedType === "researcher" ? "Pesquisador" : "Empresário";

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

      {step === "select-type" ? (
        <>
          <h1 className="text-2xl font-semibold mb-4">Crie sua conta</h1>
          <p className="text-gray-600 mb-8">
            Escolha o tipo de perfil que melhor descreve você.
          </p>

          <div className="space-y-4 text-left">
            <h2 className="text-md font-medium">Selecione seu perfil:</h2>

            <button
              onClick={() => handleSelectType("researcher")}
              className="w-full p-4 border rounded-lg flex items-center gap-3 hover:bg-gray-100 transition"
            >
              <div className="h-10 w-10 rounded-full bg-blue-100 text-blue-600 flex items-center justify-center">
                <User className="h-5 w-5" />
              </div>
              <div>
                <div className="font-medium">Pesquisador</div>
                <div className="text-sm text-gray-500">Compartilhe suas pesquisas e receba financiamento</div>
              </div>
            </button>

            <button
              onClick={() => handleSelectType("entrepreneur")}
              className="w-full p-4 border rounded-lg flex items-center gap-3 hover:bg-gray-100 transition"
            >
              <div className="h-10 w-10 rounded-full bg-blue-100 text-blue-600 flex items-center justify-center">
                <Briefcase className="h-5 w-5" />
              </div>
              <div>
                <div className="font-medium">Empresário</div>
                <div className="text-sm text-gray-500">Encontre pesquisas e invista em inovação</div>
              </div>
            </button>
          </div>
        </>
      ) : (
        <>
          <h1 className="text-2xl font-semibold mb-4">Cadastro de {typeLabel}</h1>
          <p className="text-gray-600 mb-6">Preencha os campos abaixo para criar sua conta.</p>

          <div className="space-y-4">
            <input
              type="text"
              placeholder="Nome"
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="w-full p-2 border rounded-lg"
            />
            <input
              type="email"
              placeholder="Email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full p-2 border rounded-lg"
            />
            <input
              type="password"
              placeholder="Senha"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full p-2 border rounded-lg"
            />
          </div>

          <Button
            onClick={handleRegister}
            className="w-full py-4 text-md font-medium flex items-center justify-center gap-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg mt-6"
          >
            Cadastrar
          </Button>

          <button
            onClick={() => setStep("select-type")}
            className="mt-4 text-sm text-blue-600 hover:underline"
          >
            Voltar para seleção de perfil
          </button>
        </>
      )}

      <p className="text-xs text-gray-500 mt-6">
        Ao cadastrar, você concorda com nossos{" "}
        <a href="#" className="text-blue-600 hover:underline">
          Termos de Serviço
        </a>
      </p>
    </div>
  );
}