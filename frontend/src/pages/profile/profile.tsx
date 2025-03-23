import { Navbar } from "../../components/ui/navbar";
import { Button } from "../../components/ui/button";
import { FileText, Edit, ExternalLink, Building, Briefcase, Award, TrendingUp } from "lucide-react";
import { useUser } from "../../context/user-context";
import { Link } from "react-router-dom"; // Substitua o next/link pelo react-router-dom

export default function ProfilePage() {
  const { userType } = useUser();

  // Renderiza o perfil apropriado com base no tipo de usuário
  return (
    <>
      <Navbar />
      {userType === "entrepreneur" ? <EntrepreneurProfile /> : <ResearcherProfile />}
    </>
  );
}

function ResearcherProfile() {
  return (
    <main className="container mx-auto px-4 py-8">
      <div className="bg-white rounded-2xl shadow-md p-6">
        <div className="flex flex-col md:flex-row gap-8 mb-8">
          <div className="flex flex-col items-center">
            <div className="h-20 w-20 rounded-full bg-blue-100 text-blue-600 flex items-center justify-center text-2xl font-semibold mb-4">
              JD
            </div>
            <Link to="/profile/edit/researcher">
              <Button variant="outline" className="gap-2">
                <Edit className="h-4 w-4" />
                Editar Perfil
              </Button>
            </Link>
          </div>

          <div className="flex-1">
            <h1 className="text-2xl font-medium mb-2">João Dias, PhD</h1>
            <p className="text-secondary mb-4">
              Pesquisador em Inteligência Artificial e Blockchain • Universidade Federal
            </p>

            <p className="mb-4">
              Especialista em aplicações de blockchain para pesquisa científica e transferência de conhecimento.
              Trabalho na interseção entre IA, criptografia e sistemas descentralizados.
            </p>

            <div className="flex flex-wrap gap-8 mt-6">
              <div className="flex flex-col">
                <span className="text-xl font-semibold">12</span>
                <span className="text-sm text-secondary">Artigos</span>
              </div>
              <div className="flex flex-col">
                <span className="text-xl font-semibold">48</span>
                <span className="text-sm text-secondary">Postagens</span>
              </div>
              <div className="flex flex-col">
                <span className="text-xl font-semibold">156</span>
                <span className="text-sm text-secondary">Conexões</span>
              </div>
            </div>
          </div>
        </div>

        <div className="border-b mb-6">
          <div className="flex">
            <button className="px-6 py-4 font-medium text-primary border-b-2 border-primary">Artigos</button>
            <button className="px-6 py-4 font-medium text-secondary hover:text-primary">Postagens</button>
            <button className="px-6 py-4 font-medium text-secondary hover:text-primary">Sobre</button>
          </div>
        </div>

        <div className="grid md:grid-cols-2 gap-6">
          {[1, 2, 3, 4].map((item) => (
            <div key={item} className="border rounded-lg p-4 hover:shadow-md transition-shadow">
              <div className="flex justify-between items-start mb-3">
                <h3 className="font-medium">Aplicações de Blockchain na Validação de Pesquisas Científicas</h3>
                <FileText className="h-5 w-5 text-secondary flex-shrink-0 ml-2" />
              </div>
              <p className="text-sm text-secondary mb-3 line-clamp-2">
                Este artigo explora como a tecnologia blockchain pode ser utilizada para validar e verificar resultados
                de pesquisas científicas, aumentando a transparência e confiabilidade.
              </p>
              <div className="flex flex-wrap mb-3">
                <span className="tag">Blockchain</span>
                <span className="tag">Ciência</span>
                <span className="tag">Validação</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-xs text-secondary">Publicado em 12/03/2023</span>
                <Link to="/ipfs-viewer"> {/* Adicionado Link para o IPFS Viewer */}
                  <Button variant="outline" className="gap-1">
                    <ExternalLink className="h-4 w-4" />
                    <span className="text-xs">Ver</span>
                  </Button>
                </Link>
              </div>
            </div>
          ))}
        </div>

        <div className="mt-6 text-center">
          <Button variant="outline">Carregar Mais</Button>
        </div>
      </div>
    </main>
  );
}

function EntrepreneurProfile() {
  return (
    <main className="container mx-auto px-4 py-8">
      <div className="bg-white rounded-2xl shadow-md p-6">
        <div className="flex flex-col md:flex-row gap-8 mb-8">
          <div className="flex flex-col items-center">
            <div className="h-20 w-20 rounded-full bg-blue-100 text-blue-600 flex items-center justify-center text-2xl font-semibold mb-4">
              RP
            </div>
            <Link to="/profile/edit/entrepreneur">
              <Button variant="outline" className="gap-2">
                <Edit className="h-4 w-4" />
                Editar Perfil
              </Button>
            </Link>
          </div>

          <div className="flex-1">
            <h1 className="text-2xl font-medium mb-2">Ricardo Pereira</h1>
            <p className="text-secondary mb-4">CEO • ABC Inovações</p>

            <div className="flex items-center gap-2 mb-2">
              <Building className="h-4 w-4 text-secondary" />
              <span>Tecnologia e Inovação</span>
            </div>

            <div className="flex items-center gap-2 mb-4">
              <Briefcase className="h-4 w-4 text-secondary" />
              <span>São Paulo, Brasil</span>
            </div>

            <p className="mb-4">
              Investidor em tecnologias emergentes com foco em soluções baseadas em blockchain e inteligência
              artificial. Buscando parcerias com pesquisadores para desenvolver produtos inovadores e sustentáveis.
            </p>

            <div className="flex flex-wrap gap-8 mt-6">
              <div className="flex flex-col">
                <span className="text-xl font-semibold">8</span>
                <span className="text-sm text-secondary">Pesquisadores Financiados</span>
              </div>
              <div className="flex flex-col">
                <span className="text-xl font-semibold">15</span>
                <span className="text-sm text-secondary">Artigos Acessados</span>
              </div>
              <div className="flex flex-col">
                <span className="text-xl font-semibold">24</span>
                <span className="text-sm text-secondary">Transações</span>
              </div>
            </div>
          </div>
        </div>

        <div className="border-b mb-6">
          <div className="flex">
            <button className="px-6 py-4 font-medium text-primary border-b-2 border-primary">Investimentos</button>
            <button className="px-6 py-4 font-medium text-secondary hover:text-primary">Interesses</button>
            <button className="px-6 py-4 font-medium text-secondary hover:text-primary">Sobre</button>
          </div>
        </div>

        <div className="grid md:grid-cols-2 gap-6">
          {[1, 2, 3, 4].map((item) => (
            <div key={item} className="border rounded-lg p-4 hover:shadow-md transition-shadow">
              <div className="flex justify-between items-start mb-3">
                <div>
                  <h3 className="font-medium">João Dias, PhD</h3>
                  <p className="text-sm text-secondary">Universidade Federal</p>
                </div>
                <div className="h-10 w-10 rounded-full bg-primary/10 flex items-center justify-center text-primary">
                  <Award className="h-5 w-5" />
                </div>
              </div>
              <p className="text-sm mb-3">
                Financiamento para pesquisa em "Aplicações de Blockchain na Validação de Pesquisas Científicas"
              </p>
              <div className="flex flex-wrap mb-3">
                <span className="tag">Blockchain</span>
                <span className="tag">Ciência</span>
                <span className="tag">Validação</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-xs text-secondary">Iniciado em 12/03/2023</span>
                <div className="flex items-center gap-1 text-success text-sm">
                  <TrendingUp className="h-3 w-3" />
                  <span>Em andamento</span>
                </div>
              </div>
            </div>
          ))}
        </div>

        <div className="mt-6 text-center">
          <Button variant="outline">Carregar Mais</Button>
        </div>
      </div>
    </main>
  );
}