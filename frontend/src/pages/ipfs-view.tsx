import { Navbar } from "../components/ui/navbar";
import { Button } from "../components/ui/button";
import { Download, ExternalLink, FileText, Share2 } from "lucide-react";

export default function IPFSViewerPage() {
  return (
    <>
      <Navbar />
      <main className="container mx-auto px-4 py-8">
        <div className="mb-8">
          <h1 className="text-2xl font-medium mb-2">Visualizador IPFS</h1>
          <p className="text-secondary">Acesse e visualize documentos armazenados na rede IPFS</p>
        </div>

        <div className="bg-white rounded-2xl shadow-md p-6">
          <div className="flex justify-between items-center mb-6">
            <div className="flex items-center gap-3">
              <FileText className="h-6 w-6 text-blue-600" /> {/* Ícone da folha em azul */}
              <div>
                <h2 className="font-medium">Aplicações de Blockchain na Validação de Pesquisas Científicas</h2>
                <div className="text-sm text-secondary">CID: QmT5NvUtoM5nWFfrQdVrFtvGfKFmG7AHE8P34isapyhCxX</div>
              </div>
            </div>
            <div className="flex gap-2">
              <Button variant="outline" className="gap-2">
                <Share2 className="h-4 w-4" />
                Compartilhar
              </Button>
              <Button variant="outline" className="gap-2">
                <Download className="h-4 w-4" />
                Download
              </Button>
              <Button className="gap-2 bg-blue-600 hover:bg-blue-700"> {/* Botão "Abrir no IPFS" */}
                <ExternalLink className="h-4 w-4" />
                Abrir no IPFS
              </Button>
            </div>
          </div>

          <div className="border rounded-lg p-6 mb-6 bg-white">
            <div className="flex justify-between items-center mb-4 pb-4 border-b">
              <h3 className="font-medium text-lg">Resumo</h3>
              <div className="text-sm text-secondary">Publicado em 12/03/2023</div>
            </div>

            <p className="mb-4">
              Este artigo explora como a tecnologia blockchain pode ser utilizada para validar e verificar resultados de
              pesquisas científicas, aumentando a transparência e confiabilidade no processo científico. Apresentamos um
              framework para implementação e casos de uso reais.
            </p>

            <div className="flex flex-wrap gap-2 mb-4">
              <span className="bg-blue-100 text-blue-800 text-sm font-medium px-3 py-1 rounded-full">Blockchain</span>
              <span className="bg-green-100 text-green-800 text-sm font-medium px-3 py-1 rounded-full">Ciência</span>
              <span className="bg-yellow-100 text-yellow-800 text-sm font-medium px-3 py-1 rounded-full">Validação</span>
              <span className="bg-purple-100 text-purple-800 text-sm font-medium px-3 py-1 rounded-full">Descentralização</span>
            </div>

            <div className="text-sm text-secondary">
              Autores: João Dias, PhD; Maria Silva, PhD; Carlos Oliveira, MSc
            </div>
          </div>

          <div className="border rounded-lg overflow-hidden">
            <div className="bg-gray-50 p-3 border-b flex justify-between items-center">
              <div className="flex items-center gap-2">
                <FileText className="h-4 w-4 text-blue-600" /> {/* Ícone da folha em azul */}
                <span className="font-medium">blockchain-research-validation.pdf</span>
              </div>
              <div className="text-sm text-gray-500">24 páginas • 2.4MB</div>
            </div>

            <div className="h-[600px] bg-white p-4 flex items-center justify-center">
              <div className="text-center">
                <img
                  src="/placeholder.svg?height=400&width=300"
                  alt="Prévia do documento PDF"
                  className="mx-auto mb-4 border shadow-sm"
                />
                <p className="text-secondary mb-4">Prévia do documento</p>
                <Button>Visualizar Documento Completo</Button>
              </div>
            </div>
          </div>
        </div>
      </main>
    </>
  );
}