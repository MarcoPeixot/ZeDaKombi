import { Navbar } from "../components/ui/navbar"
import { Button } from "../components/ui/button"
import { MessageSquare, ThumbsUp, ExternalLink } from "lucide-react"
import { Link } from "react-router-dom"

export default function FeedPage() {
  const posts = [
    {
      id: 1,
      author: {
        name: "Luisa Mendes, PhD",
        avatar: "LM",
        institution: "Universidade Federal",
      },
      timeAgo: "2h atrás",
      content:
        "Acabamos de publicar nossa nova pesquisa sobre inteligência artificial aplicada à análise de dados de saúde. Nossos resultados demonstraram uma taxa de precisão 15% maior que os métodos convencionais.",
      tags: ["IA", "Saúde", "Análise de Dados"],
      likes: 42,
      comments: 8,
      hasArticle: true,
    },
    {
      id: 2,
      author: {
        name: "Ricardo Pereira",
        avatar: "RP",
        institution: "Empresa ABC Inovações",
      },
      timeAgo: "1d atrás",
      content:
        "Estamos buscando pesquisadores na área de energia renovável para colaboração em um novo projeto de baterias sustentáveis. Oferecemos financiamento completo e possibilidade de parceria de longo prazo.",
      tags: ["Energia Renovável", "Sustentabilidade", "Baterias"],
      likes: 29,
      comments: 12,
      hasArticle: false,
    },
  ]

  return (
    <>
      <Navbar />
      <main className="bg-gray-50 min-h-screen py-10 px-4">
        <div className="max-w-6xl mx-auto">

          <div className="mb-8">
            <h1 className="text-2xl font-semibold text-gray-900">Feed de Pesquisas</h1>
            <p className="text-gray-500">Descubra as últimas pesquisas</p>
          </div>

          <div className="bg-white rounded-xl shadow-sm p-6 mb-8">
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-lg font-medium text-gray-900">Postagens Recentes</h2>
              <Link to="/create-post">
                <Button  className="bg-blue-600 hover:bg-blue-700 text-white">
                  Nova Postagem
                </Button>
              </Link>
            </div>

            <div className="space-y-6">
              {posts.map((post) => (
                <div key={post.id} className="border-b pb-6 last:border-b-0 last:pb-0">
                  <div className="flex items-center gap-3 mb-2">
                    <div className="h-10 w-10 rounded-full bg-blue-100 text-blue-600 font-semibold flex items-center justify-center">
                      {post.author.avatar}
                    </div>
                    <div>
                      <div className="font-medium text-gray-900">{post.author.name}</div>
                      <div className="text-sm text-gray-500">
                        {post.author.institution} • {post.timeAgo}
                      </div>
                    </div>
                  </div>

                  <p className="text-gray-800 mb-3">{post.content}</p>

                  <div className="flex flex-wrap gap-2 mb-3">
                    {post.tags.map((tag) => (
                      <span
                        key={tag}
                        className="bg-blue-100 text-blue-600 text-xs font-medium px-2 py-1 rounded-full"
                      >
                        {tag}
                      </span>
                    ))}
                  </div>

                  <div className="flex gap-4 text-sm text-gray-500">
                    <button className="flex items-center gap-1 hover:text-blue-600 transition">
                      <ThumbsUp className="h-4 w-4" />
                      <span>{post.likes}</span>
                    </button>

                    <button className="flex items-center gap-1 hover:text-blue-600 transition">
                      <MessageSquare className="h-4 w-4" />
                      <span>{post.comments} comentários</span>
                    </button>

                    {post.hasArticle ? (
                      <Link
                        to="/ipfs-viewer"
                        className="flex items-center gap-1 hover:text-blue-600 transition"
                      >
                        <ExternalLink className="h-4 w-4" />
                        <span>Ver Artigo</span>
                      </Link>
                    ) : (
                      <Link
                        to="/messages"
                        className="flex items-center gap-1 hover:text-blue-600 transition"
                      >
                        <MessageSquare className="h-4 w-4" />
                        <span>Entrar em contato</span>
                      </Link>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="text-center">
            <Button variant="outline">Carregar Mais</Button>
          </div>
        </div>
      </main>
    </>
  )
}
