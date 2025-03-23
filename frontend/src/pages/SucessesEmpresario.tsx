import { useEffect } from "react";
import { initWalletSelector } from "../wallet-selector";

export function SuccessEmpresario() {
  useEffect(() => {
    const fetchWalletInfo = async () => {
      try {
        const { selector } = await initWalletSelector();
        const wallet = await selector.wallet();
        const accounts = await wallet.getAccounts();

        if (accounts.length > 0) {
          console.log("Conta NEAR conectada:", accounts[0].accountId);
          console.log("Chave pública:", accounts[0].publicKey);
        } else {
          console.log("Nenhuma conta conectada.");
        }
      } catch (err) {
        console.error("Erro ao recuperar dados da carteira:", err);
      }
    };

    fetchWalletInfo();
  }, []);

  return (
    <div className="p-4 text-center">
      <h1 className="text-2xl font-semibold text-green-600">
        Login com carteira concluído com sucesso!
      </h1>
      <p className="text-gray-600 mt-2">
        Você será redirecionado em instantes ou pode navegar pelo menu.
      </p>
    </div>
  );
}
