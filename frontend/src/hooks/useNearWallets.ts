// src/hooks/useNearWallet.ts
import { useEffect, useState } from "react";
import { setupWalletSelector } from "@near-wallet-selector/core";
import { setupModal } from "@near-wallet-selector/modal-ui";
import { setupMyNearWallet } from "@near-wallet-selector/my-near-wallet";
import "@near-wallet-selector/modal-ui/styles.css";

export function useNearWallet() {
  const [selector, setSelector] = useState<any>(null);

  useEffect(() => {
    (async () => {
      const selector = await setupWalletSelector({
        network: "testnet",
        modules: [setupMyNearWallet()],
      });

      const modal = setupModal(selector, {
        contractId: "contrato_near.giovanna-britto.testnet",
      });

      setSelector(selector);
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

  const getAccountId = () => {
    const accounts = selector?.store.getState().accounts;
    return accounts?.[0]?.accountId || null;
  };

  return { connect, getAccountId };
}
