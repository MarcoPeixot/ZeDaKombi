// src/components/contract-button.tsx
import { Button } from "./ui/button";
import { FileText, Loader2 } from "lucide-react";
import { useState } from "react";
import { generateContract } from "../services/contract-service";

interface ContractButtonProps {
  chatId: number;
  onContractGenerated: (contractUrl: string) => void;
  disabled?: boolean;
}

export function ContractButton({ chatId, onContractGenerated, disabled }: ContractButtonProps) {
  const [isLoading, setIsLoading] = useState(false);

  // Atualize o handleGenerateContract no componente ContractButton
const handleGenerateContract = async () => {
    setIsLoading(true);
    try {
      const { pdfUrl } = await generateContract(chatId);
      onContractGenerated(pdfUrl);
    } catch (error) {
      console.error("Failed to generate contract:", error);
      // Você pode adicionar um toast de erro aqui
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Button
      variant="outline"
      onClick={handleGenerateContract}
      disabled={disabled || isLoading}
      className="gap-2"
    >
      {isLoading ? (
        <Loader2 className="h-4 w-4 animate-spin" />
      ) : (
        <FileText className="h-4 w-4" />
      )}
      Gerar Contrato
    </Button>
  );
}