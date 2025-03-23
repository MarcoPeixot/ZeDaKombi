export function getConfig(env = "testnet") {
    return {
      networkId: "testnet",
      nodeUrl: "https://rpc.testnet.near.org",
      walletUrl: "https://testnet.mynearwallet.com",
      helperUrl: "https://helper.testnet.near.org",
      explorerUrl: "https://explorer.testnet.near.org",
      contractName: "contrato.giovanna-britto.testnet", // ou o nome do seu contrato
    };
  }
  