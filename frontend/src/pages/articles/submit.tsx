import { Navbar } from "../../components/ui/navbar"
import { Button } from "../../components/ui/button"
import { Upload, FileText, Plus } from "lucide-react"

export default function SubmitArticlePage() {
  return (
    <>
      <Navbar />
      <main className="bg-gray-50 min-h-screen py-10">
        <div className="max-w-7xl mx-auto px-6">
          <div className="mb-8">
            <h1 className="text-2xl font-semibold text-gray-900">Submeter Novo Artigo</h1>
            <p className="text-gray-500">Compartilhe sua pesquisa com a comunidade e empresários interessados</p>
          </div>

          <div className="bg-white rounded-xl shadow-sm p-6">
            <form>
              <div className="mb-6">
                <label htmlFor="title" className="block mb-2 font-medium">Título do Artigo</label>
                <input
                  type="text"
                  id="title"
                  className="w-full p-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-600"
                  placeholder="Digite o título completo do seu artigo"
                />
              </div>

              <div className="mb-6">
                <label htmlFor="abstract" className="block mb-2 font-medium">Resumo</label>
                <textarea
                  id="abstract"
                  rows={5}
                  className="w-full p-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-600"
                  placeholder="Escreva um resumo conciso do seu artigo"
                ></textarea>
              </div>

              <div className="mb-6">
                <label className="block mb-2 font-medium">Tags</label>
                <div className="flex flex-wrap gap-2 mb-2">
                  <span className="bg-blue-100 text-blue-600 text-sm font-medium px-3 py-1 rounded-full flex items-center">
                    Blockchain
                    <button className="ml-2 hover:text-red-500">×</button>
                  </span>
                  <span className="bg-blue-100 text-blue-600 text-sm font-medium px-3 py-1 rounded-full flex items-center">
                    Pesquisa
                    <button className="ml-2 hover:text-red-500">×</button>
                  </span>
                </div>
                <div className="flex">
                  <input
                    type="text"
                    className="flex-1 p-3 border rounded-l-lg focus:outline-none focus:ring-2 focus:ring-blue-600"
                    placeholder="Adicionar nova tag"
                  />
                  <Button className="rounded-l-none">
                    <Plus className="h-4 w-4" />
                  </Button>
                </div>
              </div>

              <div className="mb-6">
                <label className="block mb-2 font-medium">Arquivo do Artigo</label>
                <div className="border-2 border-dashed border-gray-300 rounded-lg p-8 text-center cursor-pointer hover:border-blue-400 transition-colors">
                  <Upload className="h-10 w-10 mx-auto mb-4 text-gray-400" />
                  <p className="mb-2 font-medium">Arraste e solte seu arquivo aqui</p>
                  <p className="text-sm text-gray-500 mb-4">ou</p>
                  <Button>
                    <FileText className="h-4 w-4 mr-2" />
                    Selecionar Arquivo
                  </Button>
                  <p className="mt-4 text-sm text-gray-500">
                    Formatos suportados: PDF, DOCX, LaTeX (.tex) – Máximo 20MB
                  </p>
                </div>
              </div>

              

              <div className="flex justify-end gap-4">
                <Button variant="outline">Salvar Rascunho</Button>
                <Button>Publicar Artigo</Button>
              </div>
            </form>
          </div>
        </div>
      </main>
    </>
  )
}
