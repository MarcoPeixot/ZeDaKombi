import { Navbar } from "../../../components/ui/navbar";
import { Button } from "../../../components/ui/button";
import { ArrowLeft, Plus } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { useUser } from "../../../context/user-context";
import { useEffect } from "react";

export default function EditEntrepreneurProfilePage() {
  const navigate = useNavigate();
  const { userType } = useUser();

  // Redirecionar se não for empresário
  useEffect(() => {
    if (userType === "researcher") {
      navigate("/profile/edit/researcher");
    }
  }, [userType, navigate]);

  const handleSave = () => {
    // Aqui você implementaria a lógica para salvar os dados do perfil
    navigate("/profile");
  };

  return (
    <>
      <Navbar />
      <main className="container mx-auto px-4 py-8">
        <div className="mb-8 flex items-center gap-2">
          <button onClick={() => navigate("/profile")} className="text-secondary hover:text-primary">
            <ArrowLeft className="h-5 w-5" />
          </button>
          <h1 className="text-2xl font-medium">Editar Perfil de Empresário</h1>
        </div>

        <div className="bg-white rounded-2xl shadow-md p-6">
          <form
            onSubmit={(e) => {
              e.preventDefault();
              handleSave();
            }}
          >
            <div className="flex flex-col md:flex-row gap-8 mb-8">
              <div className="flex flex-col items-center">
                <div className="h-20 w-20 rounded-full bg-blue-100 text-blue-600 flex items-center justify-center text-2xl font-semibold mb-4">
                  RP
                </div>
                <Button variant="outline"  type="button">
                  Alterar Foto
                </Button>
              </div>

              <div className="flex-1">
                <div className="grid md:grid-cols-2 gap-6">
                  <div className="mb-4">
                    <label htmlFor="name" className="block mb-2 font-medium">
                      Nome Completo
                    </label>
                    <input
                      type="text"
                      id="name"
                      defaultValue="Ricardo Pereira"
                      className="w-full p-3 border border-input rounded-lg focus:outline-none focus:ring-2 focus:ring-primary"
                    />
                  </div>

                  <div className="mb-4">
                    <label htmlFor="title" className="block mb-2 font-medium">
                      Cargo
                    </label>
                    <input
                      type="text"
                      id="title"
                      defaultValue="CEO"
                      className="w-full p-3 border border-input rounded-lg focus:outline-none focus:ring-2 focus:ring-primary"
                    />
                  </div>

                  <div className="mb-4">
                    <label htmlFor="company" className="block mb-2 font-medium">
                      Empresa
                    </label>
                    <input
                      type="text"
                      id="company"
                      defaultValue="ABC Inovações"
                      className="w-full p-3 border border-input rounded-lg focus:outline-none focus:ring-2 focus:ring-primary"
                    />
                  </div>

                  <div className="mb-4">
                    <label htmlFor="industry" className="block mb-2 font-medium">
                      Setor
                    </label>
                    <input
                      type="text"
                      id="industry"
                      defaultValue="Tecnologia e Inovação"
                      className="w-full p-3 border border-input rounded-lg focus:outline-none focus:ring-2 focus:ring-primary"
                    />
                  </div>
                </div>
              </div>
            </div>

            <div className="mb-6">
              <label htmlFor="bio" className="block mb-2 font-medium">
                Sobre a Empresa
              </label>
              <textarea
                id="bio"
                rows={4}
                defaultValue="Investidor em tecnologias emergentes com foco em soluções baseadas em blockchain e inteligência artificial. Buscando parcerias com pesquisadores para desenvolver produtos inovadores e sustentáveis."
                className="w-full p-3 border border-input rounded-lg focus:outline-none focus:ring-2 focus:ring-primary"
              ></textarea>
            </div>

            <div className="mb-6">
              <label className="block mb-2 font-medium">Localização</label>
              <input
                type="text"
                defaultValue="São Paulo, Brasil"
                className="w-full p-3 border border-input rounded-lg focus:outline-none focus:ring-2 focus:ring-primary"
              />
            </div>

            <div className="mb-6">
              <label className="block mb-2 font-medium">Áreas de Interesse</label>
              <div className="flex flex-wrap gap-2 mb-2">
                <span className="tag flex items-center">
                  Blockchain
                  <button type="button" className="ml-1 text-secondary hover:text-danger">
                    ×
                  </button>
                </span>
                <span className="tag flex items-center">
                  Inteligência Artificial
                  <button type="button" className="ml-1 text-secondary hover:text-danger">
                    ×
                  </button>
                </span>
                <span className="tag flex items-center">
                  Energia Renovável
                  <button type="button" className="ml-1 text-secondary hover:text-danger">
                    ×
                  </button>
                </span>
              </div>
              <div className="flex">
                <input
                  type="text"
                  className="flex-1 p-3 border border-input rounded-l-lg focus:outline-none focus:ring-2 focus:ring-primary"
                  placeholder="Adicionar nova área de interesse"
                />
                <Button type="button" className="rounded-l-none">
                  <Plus className="h-4 w-4" />
                </Button>
              </div>
            </div>

            <div className="mb-6">
              <label className="block mb-2 font-medium">Orçamento de Investimento</label>
              <select
                className="w-full p-3 border border-input rounded-lg focus:outline-none focus:ring-2 focus:ring-primary"
                defaultValue="50000-100000"
              >
                <option value="<10000">Menos de R$ 10.000</option>
                <option value="10000-50000">R$ 10.000 - R$ 50.000</option>
                <option value="50000-100000">R$ 50.000 - R$ 100.000</option>
                <option value="100000-500000">R$ 100.000 - R$ 500.000</option>
                <option value=">500000">Mais de R$ 500.000</option>
              </select>
            </div>

            <div className="mb-6">
              <label className="block mb-2 font-medium">Informações da Empresa</label>

              <div className="mb-4">
                <label htmlFor="website" className="block mb-2 text-sm">
                  Website da Empresa
                </label>
                <input
                  type="url"
                  id="website"
                  defaultValue="https://abcinovacoes.com.br"
                  className="w-full p-3 border border-input rounded-lg focus:outline-none focus:ring-2 focus:ring-primary"
                />
              </div>

              <div className="mb-4">
                <label htmlFor="founded" className="block mb-2 text-sm">
                  Ano de Fundação
                </label>
                <input
                  type="number"
                  id="founded"
                  defaultValue="2015"
                  className="w-full p-3 border border-input rounded-lg focus:outline-none focus:ring-2 focus:ring-primary"
                />
              </div>

              <div className="mb-4">
                <label htmlFor="size" className="block mb-2 text-sm">
                  Tamanho da Empresa
                </label>
                <select
                  id="size"
                  className="w-full p-3 border border-input rounded-lg focus:outline-none focus:ring-2 focus:ring-primary"
                  defaultValue="11-50"
                >
                  <option value="1-10">1-10 funcionários</option>
                  <option value="11-50">11-50 funcionários</option>
                  <option value="51-200">51-200 funcionários</option>
                  <option value="201-500">201-500 funcionários</option>
                  <option value="501+">Mais de 500 funcionários</option>
                </select>
              </div>
            </div>

            <div className="mb-6">
              <label className="block mb-2 font-medium">Informações de Contato</label>

              <div className="grid md:grid-cols-2 gap-6">
                <div className="mb-4">
                  <label htmlFor="email" className="block mb-2 text-sm">
                    Email
                  </label>
                  <input
                    type="email"
                    id="email"
                    defaultValue="ricardo@abcinovacoes.com.br"
                    className="w-full p-3 border border-input rounded-lg focus:outline-none focus:ring-2 focus:ring-primary"
                  />
                </div>

                <div className="mb-4">
                  <label htmlFor="phone" className="block mb-2 text-sm">
                    Telefone
                  </label>
                  <input
                    type="tel"
                    id="phone"
                    defaultValue="+55 11 98765-4321"
                    className="w-full p-3 border border-input rounded-lg focus:outline-none focus:ring-2 focus:ring-primary"
                  />
                </div>
              </div>
            </div>

            <div className="mb-6">
              <label className="block mb-2 font-medium">Endereço da Carteira NEAR</label>
              <input
                type="text"
                defaultValue="abcinovacoes.near"
                className="w-full p-3 border border-input rounded-lg focus:outline-none focus:ring-2 focus:ring-primary"
                disabled
              />
              <p className="text-xs text-secondary mt-1">
                Este é o endereço da sua carteira conectada. Para alterar, você precisa reconectar com outra carteira.
              </p>
            </div>

            <div className="flex justify-end gap-4">
              <Button variant="outline" type="button" onClick={() => navigate("/profile")}>
                Cancelar
              </Button>
              <Button type="submit">Salvar Alterações</Button>
            </div>
          </form>
        </div>
      </main>
    </>
  );
}