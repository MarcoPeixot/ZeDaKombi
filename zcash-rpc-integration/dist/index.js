import dotenv from 'dotenv';
import { ZcashRPC } from './zcashRpc.js';
dotenv.config();
const RPC_URL = process.env.RPC_URL || '';
async function main() {
    try {
        const zcash = new ZcashRPC(RPC_URL);
        // 1. Verifica se o nó está funcionando
        const blockchainInfo = await zcash.getBlockchainInfo();
        console.log("✅ Blockchain Info:", blockchainInfo);
        // 2. Cria um escrow (nova conta + endereço)
        const escrow = await zcash.createEscrow();
        console.log("✅ Escrow criado:", escrow);
        // 3. Envia ZEC da conta 0 (empresário) para o endereço do escrow
        const txFund = await zcash.fundEscrow(escrow.address, 0.1); // valor em ZEC
        console.log(`✅ Enviado 0.1 ZEC para o escrow. TXID: ${txFund}`);
        // ❗ IMPORTANTE: Ideal aguardar a confirmação da transação no mundo real
        // 4. Define endereço do pesquisador
        const researcherAddress = "INSIRA_O_ENDERECO_DO_PESQUISADOR_AQUI"; // exemplo: "tmNM7DT3k2F1K...."
        // 5. Libera os fundos do escrow para o pesquisador
        const txRelease = await zcash.releaseEscrow(escrow.accountId, researcherAddress, 0.1);
        console.log(`✅ Liberado do escrow para o pesquisador. TXID: ${txRelease}`);
    }
    catch (error) {
        console.error("❌ Erro geral:", error.message);
    }
}
main();
