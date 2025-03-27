import React from "react";

const RegisterIntent: React.FC = () => {
  const handleIntent = () => {
    const role = localStorage.getItem("role") || "pesquisador";

    const intentURL = new URL("https://app.near.ai/intent/");
    intentURL.searchParams.set("receiver", "contrato_near.giovanna-britto.testnet");
    intentURL.searchParams.set("method", "register_user");
    intentURL.searchParams.set("args", JSON.stringify({ role }));
    intentURL.searchParams.set("callbackUrl", window.location.origin + "/registro-sucesso");

    window.location.href = intentURL.toString();
  };

  return (
    <div className="flex flex-col items-center justify-center p-4">
      <h2 className="text-xl font-semibold mb-4">Registre sua conta NEAR</h2>
      <button
        className="bg-purple-600 text-white px-6 py-2 rounded hover:bg-purple-700"
        onClick={handleIntent}
      >
        Registrar com NEAR
      </button>
    </div>
  );
};

export default RegisterIntent;