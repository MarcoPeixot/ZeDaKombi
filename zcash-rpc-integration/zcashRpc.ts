// zcashRpc.ts
import axios, { AxiosInstance } from 'axios';
import dotenv from 'dotenv';

dotenv.config();

export class ZcashRPC {
  private axiosInstance: AxiosInstance;
  private idCounter: number;

  constructor(private rpcUrl: string) {
    this.axiosInstance = axios.create({
      baseURL: rpcUrl,
      headers: { 'Content-Type': 'application/json' }
    });
    this.idCounter = 1;
  }

  // Método genérico para chamadas RPC
  async call(method: string, params: any[] = []): Promise<any> {
    const payload = {
      jsonrpc: "2.0",
      id: this.idCounter++,
      method,
      params
    };

    console.log("Chamando método:", method, "com payload:", payload);
    
    try {
      const response = await this.axiosInstance.post('', payload);
      if (response.data.error) {
        throw new Error(JSON.stringify(response.data.error));
      }
      return response.data.result;
    } catch (error: any) {
      throw new Error(`Erro ao chamar o método ${method}: ${error.message}`);
    }
  }

  async getBlockchainInfo(): Promise<any> {
    return this.call("getblockchaininfo");
  }

  async getBlockHash(height: number): Promise<any> {
    return this.call("getblockhash", [height]);
  }

  async getBalance(address: string): Promise<any> {
    return this.call("z_getbalance", [address]);
  }

  async sendToAddress(recipientAddress: string, amount: number): Promise<any> {
    return this.call("sendtoaddress", [recipientAddress, amount]);
  }

  async getTransaction(txid: string): Promise<any> {
    return this.call("getrawtransaction", [txid, true]);
  }

  // NOVOS MÉTODOS PARA ESCROW

  // Cria uma nova conta unificada (escrow)
  // Função de alto nível para criar um novo escrow
  async createEscrow(): Promise<{ accountId: number; address: string }> {
    const accountId: number = await this.createNewAccount();
    console.log(`🆕 Conta criada: ${accountId}`);
  
    // Retry automático com até 5 tentativas
    for (let attempt = 1; attempt <= 5; attempt++) {
      try {
        console.log(`🔁 Tentando obter endereço (tentativa ${attempt})`);
        const result = await this.getAddressForAccount(accountId);
        const address: string = result.address;
        console.log(`✅ Escrow criado! Account ID: ${accountId}, Endereço: ${address}`);
        return { accountId, address };
      } catch (error: any) {
        console.warn(`⚠️ Falha ao obter endereço (tentativa ${attempt}): ${error.message}`);
        await new Promise(resolve => setTimeout(resolve, 1000)); // espera 1s
      }
    }
  
    throw new Error(`❌ Falha ao obter endereço após várias tentativas para a conta ${accountId}`);
  }
  

  // Gera endereço unificado para a conta
  async getAddressForAccount(accountId: number): Promise<any> {
    return this.call("z_getaddressforaccount", [accountId]);
  }

  // Cria uma nova conta unificada
  async createNewAccount(): Promise<number> {
    const result = await this.call("z_getnewaccount");
    if (typeof result === 'object' && result.account !== undefined) {
      return result.account;
    }
    throw new Error("❌ Resposta inesperada ao criar nova conta: " + JSON.stringify(result));
  }

    // Envia fundos da conta principal (0) para um endereço de escrow
    async fundEscrow(escrowAddress: string, amount: number): Promise<string> {
      return this.call("z_sendmany", [
        "0",  // conta principal
        [{ address: escrowAddress, amount }]
      ]);
    }
  
    // Libera fundos do escrow para o endereço do pesquisador
    async releaseEscrow(accountId: number, researcherAddress: string, amount: number): Promise<string> {
      return this.call("z_sendmany", [
        accountId,  // origem: conta do escrow
        [{ address: researcherAddress, amount }]
      ]);
    }
}