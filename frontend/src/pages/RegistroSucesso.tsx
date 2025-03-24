// src/pages/registro-sucesso.tsx
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

export default function RegistroSucesso() {
  const navigate = useNavigate();
  const [zecWallet, setZecWallet] = useState("");
  const [isSaving, setIsSaving] = useState(false);
  const [saved, setSaved] = useState(false);

  useEffect(() => {
    const url = new URL(window.location.href);
    const accountId = url.searchParams.get("accountId");
    const userId = localStorage.getItem("user_id");

    if (!accountId || !userId) {
      console.error("Dados ausentes para vincular carteira");
      return;
    }

    const handleSalvarCarteiras = async () => {
      if (!zecWallet) return;
      setIsSaving(true);
      try {
        const response = await fetch("http://localhost:8000/registrar-carteira", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            user_id: Number(userId),
            near_wallet: accountId,
            zec_wallet: zecWallet,
          }),
        });

        if (!response.ok) throw new Error("Falha ao salvar carteiras");

        setSaved(true);
        setTimeout(() => navigate("/profile"), 2000);
      } catch (error) {
        console.error("Erro ao registrar carteiras:", error);
      } finally {
        setIsSaving(false);
      }
    };

    if (zecWallet && !saved) {
      handleSalvarCarteiras();
    }
  }, [zecWallet]);

  return (
    <main className="flex flex-col items-center justify-center h-screen px-4 text-center">
      <h1 className="text-2xl font-semibold mb-4">Carteira NEAR conectada com sucesso!</h1>
      <p className="text-gray-600 mb-6">Agora informe seu endereço da carteira ZCash:</p>
      <input
        type="text"
        placeholder="Endereço ZEC"
        value={zecWallet}
        onChange={(e) => setZecWallet(e.target.value)}
        className="border p-2 rounded w-full max-w-sm"
      />
      <button
        onClick={() => {}}
        disabled={isSaving || !zecWallet}
        className="mt-4 px-6 py-2 rounded bg-blue-600 text-white hover:bg-blue-700 disabled:bg-gray-400"
      >
        {isSaving ? "Salvando..." : "Salvar e continuar"}
      </button>
    </main>
  );
}
