// src/services/contract-service.ts
export interface ContractData {
    contratante: {
      nome_completo: string;
      nacionalidade: string;
      cpf: string;
      endereco: string;
    };
    contratado: {
      nome_completo: string;
      nacionalidade: string;
      cpf: string;
      endereco: string;
    };
    servicos: string;
    prazo: {
      inicio: string;
      termino: string;
    };
    pagamento: {
      valor: string;
      extenso: string;
      metodo: string;
      dados_bancarios: string;
    };
    jurisdicao: string;
  }
  
  export async function generateContract(chatId: number): Promise<{ pdfUrl: string }> {
    // Substitua por uma chamada real à sua API quando estiver pronta
    // Exemplo:
    const response = await fetch(`/api/contracts/generate`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        // 'Authorization': `Bearer ${token}`
      },
      body: JSON.stringify({ chatId })
    });
    return await response.json();
  
    // Simulação enquanto a API não está pronta
    return new Promise((resolve) => {
      setTimeout(() => {
        resolve({
          pdfUrl: `teste.pdf` // Você pode colocar um PDF de exemplo na pasta public
        });
      }, 2000);
    });
  }