import React, { useEffect } from "react";
import { Navbar } from "../../../components/ui/navbar";
import { Button } from "../../../components/ui/button";
import { ArrowLeft, Plus, Trash2 } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { useUser } from "../../../context/user-context";


export default function EditResearcherProfilePage() {
  const navigate = useNavigate();
  const { userType } = useUser();

  // Redirecionar se não for pesquisador
  useEffect(() => {
    if (userType === "entrepreneur") {
      navigate("/profile/edit/entrepreneur");
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
          <h1 className="text-2xl font-medium">Editar Perfil de Pesquisador</h1>
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
                  JD
                </div>
                <Button variant="outline" type="button">
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
                      defaultValue="João Dias"
                      className="w-full p-3 border border-input rounded-lg focus:outline-none focus:ring-2 focus:ring-primary"
                    />
                  </div>

                  <div className="mb-4">
                    <label htmlFor="title" className="block mb-2 font-medium">
                      Título Acadêmico
                    </label>
                    <input
                      type="text"
                      id="title"
                      defaultValue="PhD"
                      className="w-full p-3 border border-input rounded-lg focus:outline-none focus:ring-2 focus:ring-primary"
                    />
                  </div>

                  <div className="mb-4">
                    <label htmlFor="institution" className="block mb-2 font-medium">
                      Instituição
                    </label>
                    <input
                      type="text"
                      id="institution"
                      defaultValue="Universidade Federal"
                      className="w-full p-3 border border-input rounded-lg focus:outline-none focus:ring-2 focus:ring-primary"
                    />
                  </div>

                  <div className="mb-4">
                    <label htmlFor="field" className="block mb-2 font-medium">
                      Área de Pesquisa
                    </label>
                    <input
                      type="text"
                      id="field"
                      defaultValue="Inteligência Artificial e Blockchain"
                      className="w-full p-3 border border-input rounded-lg focus:outline-none focus:ring-2 focus:ring-primary"
                    />
                  </div>
                </div>
              </div>
            </div>

            <div className="mb-6">
              <label htmlFor="bio" className="block mb-2 font-medium">
                Biografia
              </label>
              <textarea
                id="bio"
                rows={4}
                defaultValue="Especialista em aplicações de blockchain para pesquisa científica e transferência de conhecimento. Trabalho na interseção entre IA, criptografia e sistemas descentralizados."
                className="w-full p-3 border border-input rounded-lg focus:outline-none focus:ring-2 focus:ring-primary"
              ></textarea>
            </div>

            <div className="mb-6">
              <label className="block mb-2 font-medium">Especialidades</label>
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
                  Criptografia
                  <button type="button" className="ml-1 text-secondary hover:text-danger">
                    ×
                  </button>
                </span>
              </div>
              <div className="flex">
                <input
                  type="text"
                  className="flex-1 p-3 border border-input rounded-l-lg focus:outline-none focus:ring-2 focus:ring-primary"
                  placeholder="Adicionar nova especialidade"
                />
                <Button type="button" className="rounded-l-none">
                  <Plus className="h-4 w-4" />
                </Button>
              </div>
            </div>

            <div className="mb-6">
              <label className="block mb-2 font-medium">Formação Acadêmica</label>

              <div className="border rounded-lg p-4 mb-4">
                <div className="flex justify-between items-start mb-2">
                  <div>
                    <h3 className="font-medium">Doutorado em Ciência da Computação</h3>
                    <p className="text-sm text-secondary">Universidade Federal • 2015-2019</p>
                  </div>
                  <Button variant="outline" type="button" className="text-danger">
                    <Trash2 className="h-4 w-4" />
                  </Button>
                </div>
                <p className="text-sm">
                  Tese: "Aplicações de Blockchain em Sistemas de Verificação de Dados Científicos"
                </p>
              </div>

              <div className="border rounded-lg p-4 mb-4">
                <div className="flex justify-between items-start mb-2">
                  <div>
                    <h3 className="font-medium">Mestrado em Ciência da Computação</h3>
                    <p className="text-sm text-secondary">Universidade Estadual • 2013-2015</p>
                  </div>
                  <Button variant="outline" type="button" className="text-danger">
                    <Trash2 className="h-4 w-4" />
                  </Button>
                </div>
                <p className="text-sm">Dissertação: "Algoritmos de Aprendizado de Máquina para Análise de Dados"</p>
              </div>

              <Button variant="outline" type="button" className="gap-2">
                <Plus className="h-4 w-4" />
                Adicionar Formação
              </Button>
            </div>

            <div className="mb-6">
              <label className="block mb-2 font-medium">Publicações Destacadas</label>

              <div className="border rounded-lg p-4 mb-4">
                <div className="flex justify-between items-start mb-2">
                  <div>
                    <h3 className="font-medium">Aplicações de Blockchain na Validação de Pesquisas Científicas</h3>
                    <p className="text-sm text-secondary">Journal of Blockchain Research • 2022</p>
                  </div>
                  <Button variant="outline" type="button" className="text-danger">
                    <Trash2 className="h-4 w-4" />
                  </Button>
                </div>
              </div>

              <Button variant="outline" type="button" className="gap-2">
                <Plus className="h-4 w-4" />
                Adicionar Publicação
              </Button>
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
                    defaultValue="joao.dias@universidade.edu"
                    className="w-full p-3 border border-input rounded-lg focus:outline-none focus:ring-2 focus:ring-primary"
                  />
                </div>

                <div className="mb-4">
                  <label htmlFor="website" className="block mb-2 text-sm">
                    Website
                  </label>
                  <input
                    type="url"
                    id="website"
                    defaultValue="https://joaodias.academia.edu"
                    className="w-full p-3 border border-input rounded-lg focus:outline-none focus:ring-2 focus:ring-primary"
                  />
                </div>
              </div>
            </div>

            <div className="mb-6">
              <label className="block mb-2 font-medium">Endereço da Carteira NEAR</label>
              <input
                type="text"
                defaultValue="joaodias.near"
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