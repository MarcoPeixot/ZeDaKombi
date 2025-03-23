import { Navbar } from "../../components/ui/navbar"
import { Button } from "../../components/ui/button"
import { Image, Link, Plus } from "lucide-react"

export default function CreatePostPage() {
  return (
    <>
      <Navbar />
      <main className="container mx-auto px-4 py-8">
        <div className="mb-8">
          <h1 className="text-2xl font-medium mb-2">Criar Nova Postagem</h1>
          <p className="text-secondary">Compartilhe atualizações, descobertas ou anúncios com a comunidade</p>
        </div>

        <div className="card">
          <form>
            <div className="mb-6">
              <textarea
                rows={5}
                className="w-full p-4 border border-input rounded-lg focus:outline-none focus:ring-2 focus:ring-primary"
                placeholder="O que você gostaria de compartilhar hoje?"
              ></textarea>
            </div>

            <div className="mb-6">
              <label className="block mb-2 font-medium">Tags</label>
              <div className="flex flex-wrap gap-2 mb-2">
                <span className="tag flex items-center">
                  IA
                  <button className="ml-1 text-secondary hover:text-danger">×</button>
                </span>
                <span className="tag flex items-center">
                  Pesquisa
                  <button className="ml-1 text-secondary hover:text-danger">×</button>
                </span>
              </div>
              <div className="flex">
                <input
                  type="text"
                  className="flex-1 p-3 border border-input rounded-l-lg focus:outline-none focus:ring-2 focus:ring-primary"
                  placeholder="Adicionar nova tag"
                />
                <Button className="rounded-l-none">
                  <Plus className="h-4 w-4" />
                </Button>
              </div>
            </div>

            <div className="mb-6">
              <div className="flex flex-wrap gap-4">
                <Button variant="outline" className="gap-2">
                  <Image className="h-4 w-4" />
                  Adicionar Imagem
                </Button>
                <Button variant="outline" className="gap-2">
                  <Link className="h-4 w-4" />
                  Adicionar Link
                </Button>
              </div>
            </div>

            <div className="mb-6">
              <label className="flex items-center">
                <input type="checkbox" className="mr-2 h-4 w-4 text-primary" />
                <span className="text-sm">Vincular a um artigo publicado</span>
              </label>
            </div>

            <div className="flex justify-end gap-4">
              <Button variant="outline">Salvar Rascunho</Button>
              <Button>Publicar</Button>
            </div>
          </form>
        </div>
      </main>
    </>
  )
}

