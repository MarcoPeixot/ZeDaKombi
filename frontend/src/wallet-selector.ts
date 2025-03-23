import { setupWalletSelector } from "@near-wallet-selector/core";
import { setupMyNearWallet } from "@near-wallet-selector/my-near-wallet";
import { setupModal } from "@near-wallet-selector/modal-ui";
import "@near-wallet-selector/modal-ui/styles.css";

export async function initWalletSelector() {
  const selector = await setupWalletSelector({
    network: "testnet",
    modules: [setupMyNearWallet()],
  });

  const modal = setupModal(selector, {
    contractId: "contrato.giovanna-britto.testnet", // pode vir de config
  });

  return { selector, modal };
}
