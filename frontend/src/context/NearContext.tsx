import { createContext, useContext, useEffect, useState } from "react";
import {
  setupWalletSelector,
  WalletSelector,
  Wallet,
} from "@near-wallet-selector/core";
//import { setupModal } from "@near-wallet-selector/modal-ui";
import { setupMyNearWallet } from "@near-wallet-selector/my-near-wallet";

interface NearContextType {
  selector: WalletSelector | null;
  wallet: Wallet | null;
}

const NearContext = createContext<NearContextType>({
  selector: null,
  wallet: null,
});

export const NearProvider = ({ children }: { children: React.ReactNode }) => {
  const [selector, setSelector] = useState<WalletSelector | null>(null);
  const [wallet, setWallet] = useState<Wallet | null>(null);

  useEffect(() => {
    const init = async () => {
      const selector = await setupWalletSelector({
        network: "testnet",
        modules: [setupMyNearWallet()],
      });

      // const modal = setupModal(selector, {
      //   contractId: "contrato_near.giovanna-britto.testnet",
      // });

      setSelector(selector);

      const wallet = await selector.wallet();
      setWallet(wallet);
    };

    init();
  }, []);

  return (
    <NearContext.Provider value={{ selector, wallet }}>
      {children}
    </NearContext.Provider>
  );
};

export const useNear = () => useContext(NearContext);
