import { connect, keyStores, WalletConnection } from "near-api-js";
import { getConfig } from "./near-config";

const nearConfig = getConfig();

export async function initNearWallet() {
  const near = await connect({
    deps: { keyStore: new keyStores.BrowserLocalStorageKeyStore() },
    ...nearConfig,
  });

  const wallet = new WalletConnection(near, "nexusr-app"); // <- segundo argumento obrigatório
  return { wallet };
}
