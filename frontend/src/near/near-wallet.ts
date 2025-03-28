import { connect, keyStores, WalletConnection } from "near-api-js";
import { nearConfig } from "./near-config";

export const initNear = async () => {
  const near = await connect({
    deps: {
      keyStore: new keyStores.BrowserLocalStorageKeyStore(),
    },
    ...nearConfig,
  });

  return new WalletConnection(near, "nexusr");
};
