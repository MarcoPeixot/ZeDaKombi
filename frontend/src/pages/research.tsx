import React from "react";
import { Navbar } from "../components/ui/navbar";
import { Filter, Search, MessageSquare, ExternalLink } from "lucide-react";

const researchers = [
  {
    id: 1,
    name: "João Dias, PhD",
    institute: "Universidade Federal",
    avatar: "JD",
    bio: "Especialista em aplicações de blockchain para pesquisa científica e transferência de conhecimento.",
    tags: ["Blockchain", "IA", "Criptografia"],
    articles: 12,
  },
  {
    id: 2,
    name: "Mariana Costa, PhD",
    institute: "Instituto de Pesquisas Avançadas",
    avatar: "MC",
    bio: "Pesquisadora em nanotecnologia e materiais supercondutores com foco em aplicações industriais.",
    tags: ["Nanotecnologia", "Materiais", "Física"],
    articles: 18,
  },
  {
    id: 3,
    name: "Carlos Oliveira, MSc",
    institute: "Universidade Estadual",
    avatar: "CO",
    bio: "Desenvolvedor de soluções em energia renovável e sistemas de armazenamento sustentáveis.",
    tags: ["Energia", "Sustentabilidade", "Baterias"],
    articles: 7,
  },
  {
    id: 4,
    name: "Luisa Mendes, PhD",
    institute: "Universidade Federal",
    avatar: "LM",
    bio: "Especialista em inteligência artificial aplicada à análise de dados de saúde.",
    tags: ["IA", "Saúde", "Análise de Dados"],
    articles: 15,
  },
];

const ResearchersPage: React.FC = () => {
  return (
    <>
      <Navbar />
      <div className="container mx-auto px-4 py-8">
        <div className="mb-8">
          <h1 className="text-2xl font-medium mb-2">Encontrar Pesquisadores</h1>
          <p className="text-gray-500">Descubra pesquisadores e projetos alinhados com seus interesses</p>
        </div>

        <div className="bg-white p-6 rounded-lg shadow">
          <div className="mb-6">
            <div className="relative mb-4">
              <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-500" />
              <input
                type="text"
                placeholder="Buscar por nome, instituição ou área de pesquisa..."
                className="w-full pl-12 pr-4 py-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>

            <div className="flex flex-wrap gap-2 mb-4">
              <span className="px-3 py-1 bg-blue-100 text-blue-600 rounded-full text-sm">Blockchain</span>
              <span className="px-3 py-1 bg-gray-200 rounded-full text-sm">IA</span>
              <span className="px-3 py-1 bg-gray-200 rounded-full text-sm">Energia Renovável</span>
              <span className="px-3 py-1 bg-gray-200 rounded-full text-sm">Saúde</span>
              <span className="px-3 py-1 bg-gray-200 rounded-full text-sm">Nanotecnologia</span>
              <button className="text-blue-600 text-sm">+ Mais Filtros</button>
            </div>

            <div className="flex justify-between items-center">
              <div className="text-sm text-gray-500">Mostrando 4 pesquisadores</div>
              <button className="border px-3 py-1 rounded-lg text-sm flex items-center gap-2">
                <Filter className="h-4 w-4" /> Filtrar
              </button>
            </div>
          </div>

          <div className="grid md:grid-cols-2 gap-6">
            {researchers.map((researcher) => (
              <div key={researcher.id} className="border rounded-lg p-6 hover:shadow-md transition-shadow">
                <div className="flex gap-4 mb-4">
                  <div className="w-12 h-12 flex items-center justify-center bg-gray-300 rounded-full text-lg font-semibold">
                    {researcher.avatar}
                  </div>
                  <div>
                    <h3 className="font-medium">{researcher.name}</h3>
                    <p className="text-sm text-gray-500">{researcher.institute}</p>
                    <div className="mt-1 text-sm text-blue-600">
                      {researcher.articles} artigos publicados
                    </div>
                  </div>
                </div>
                <p className="text-sm mb-4">{researcher.bio}</p>
                <div className="flex flex-wrap mb-4">
                  {researcher.tags.map((tag) => (
                    <span key={tag} className="px-3 py-1 bg-gray-200 rounded-full text-sm mr-2">
                      {tag}
                    </span>
                  ))}
                </div>
                <div className="flex justify-between">
                  <button className="border px-3 py-1 rounded-lg text-sm flex items-center gap-2">
                    <ExternalLink className="h-4 w-4" /> Ver Perfil
                  </button>
                  <button className="bg-blue-600 text-white px-3 py-1 rounded-lg text-sm flex items-center gap-2">
                    <MessageSquare className="h-4 w-4" /> Contatar
                  </button>
                </div>
              </div>
            ))}
          </div>
          <div className="mt-6 text-center">
            <button className="border px-4 py-2 rounded-lg text-sm">Carregar Mais</button>
          </div>
        </div>
      </div>
    </>
  );
};

export default ResearchersPage;