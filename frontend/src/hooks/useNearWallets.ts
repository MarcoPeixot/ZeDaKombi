// src/hooks/useNearWallet.ts
import { useEffect, useState } from "react";
import { setupWalletSelector } from "@near-wallet-selector/core";
import { setupModal } from "@near-wallet-selector/modal-ui";
import { setupMyNearWallet } from "@near-wallet-selector/my-near-wallet";
import "@near-wallet-selector/modal-ui/styles.css";

export function useNearWallet() {
  const [selector, setSelector] = useState<any>(null);
  const [accountId, setAccountId] = useState<string | null>(null);

  useEffect(() => {
    (async () => {
      const selector = await setupWalletSelector({
        network: "testnet",
        modules: [setupMyNearWallet()],
      });

      // const modal = setupModal(selector, {
      //   contractId: "contrato_near.giovanna-britto.testnet",
      // });

      setSelector(selector);

      // Verifica se já existe uma conta conectada inicialmente
      const initialState = selector.store.getState();
      if (initialState.accounts && initialState.accounts.length > 0) {
        setAccountId(initialState.accounts[0].accountId);
      }

      // Se o método "on" estiver disponível, use-o para ouvir mudanças nas contas
      if (typeof selector.on === "function") {
        selector.on("accountsChanged", (accounts: any) => {
          if (accounts && accounts.length > 0) {
            setAccountId(accounts[0].accountId);
          }
        });
      }
    })();
  }, []);

  const connect = async () => {
    if (selector) {
      const modal = setupModal(selector, {
        contractId: "contrato_near.giovanna-britto.testnet",
      });
      modal.show();
    }
  };

  return { connect, accountId };
}