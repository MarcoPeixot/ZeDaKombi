const nearAPI = require("near-api-js");
require("dotenv").config();

async function salvarNaBlockchain(titulo, autor, ipfs_url) {
  const { connect, keyStores, KeyPair, utils } = nearAPI;

  const keyStore = new keyStores.InMemoryKeyStore();
  const keyPair = KeyPair.fromString(process.env.NEAR_PRIVATE_KEY);
  await keyStore.setKey(process.env.NEAR_NETWORK, process.env.NEAR_ACCOUNT_ID, keyPair);

  const near = await connect({
    networkId: process.env.NEAR_NETWORK,
    nodeUrl: `https://rpc.${process.env.NEAR_NETWORK}.near.org`,
    deps: { keyStore },
  });

  const account = await near.account(process.env.NEAR_ACCOUNT_ID);

  const result = await account.functionCall({
    contractId: process.env.NEAR_CONTRACT_ID,
    methodName: "adicionar_artigo",
    args: { titulo, autor, ipfs_hash: ipfs_url },
    gas: "30000000000000",
    attachedDeposit: utils.format.parseNearAmount("0"),
  });

  return result.transaction.hash;
}

async function chamarMetodoView(methodName, args) {
  const { connect, keyStores } = nearAPI;
  const keyStore = new keyStores.InMemoryKeyStore();

  const near = await connect({
    networkId: process.env.NEAR_NETWORK,
    nodeUrl: `https://rpc.${process.env.NEAR_NETWORK}.near.org`,
    deps: { keyStore },
  });

  const provider = near.connection.provider;

  const result = await provider.query({
    request_type: "call_function",
    account_id: process.env.NEAR_CONTRACT_ID,
    method_name: methodName,
    args_base64: Buffer.from(JSON.stringify(args)).toString("base64"),
    finality: "optimistic",
  });

  return JSON.parse(Buffer.from(result.result).toString());
}


module.exports = { salvarNaBlockchain, chamarMetodoView };
