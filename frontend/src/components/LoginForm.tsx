import { useState } from "react"
import { Button } from "../components/ui/button"
import { Briefcase, Lock, User } from "lucide-react"
import { useNavigate } from "react-router-dom"
import { useUser } from "../context/user-context"

export function LoginForm() {
  const [step, setStep] = useState<"select-type" | "connect-wallet">("select-type")
  const [selectedType, setSelectedType] = useState<"researcher" | "entrepreneur" | null>(null)
  const navigate = useNavigate()
  const { setUserType } = useUser()

  const handleSelectType = (type: "researcher" | "entrepreneur") => {
    setSelectedType(type)
    setStep("connect-wallet")
  }

  const handleConnectWallet = () => {
    if (selectedType == "researcher") {
      setUserType(selectedType)
      navigate("/feed-pesquisador")
    }

    if (selectedType == "entrepreneur") {
      setUserType(selectedType)
      navigate("/feed-empresarios")
    }
  }

  const typeLabel = selectedType === "researcher" ? "Pesquisador" : "Empresário"

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
          <h1 className="text-2xl font-semibold mb-4">Bem-vindo à plataforma</h1>
          <p className="text-gray-600 mb-8">
            A ponte entre a pesquisa científica e o mundo empresarial, utilizando blockchain para promover inovação e colaboração.
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
          <h1 className="text-2xl font-semibold mb-4">Conectar como {typeLabel}</h1>
          <p className="text-gray-600 mb-6">Conecte sua carteira NEAR para acessar a plataforma</p>

          <Button
            onClick={handleConnectWallet}
            className="w-full py-4 text-md font-medium flex items-center justify-center gap-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg"
          >
            <Lock className="h-5 w-5" />
            Conectar carteira NEAR
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
        Ao conectar, você concorda com nossos{" "}
        <a href="#" className="text-blue-600 hover:underline">
          Termos de Serviço
        </a>
      </p>
    </div>
  )
}
