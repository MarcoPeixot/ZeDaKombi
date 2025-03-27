import React, { useEffect } from "react";
import { Navbar } from "../../../components/ui/navbar";
import { Button } from "../../../components/ui/button";
import { ArrowLeft, Plus, Trash2 } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { useUser } from "../../../context/user-context";


export default function EditResearcherProfilePage() {
  const navigate = useNavigate();
  const { userType } = useUser();

  // Redirect if not a researcher
  useEffect(() => {
    if (userType === "entrepreneur") {
      navigate("/profile/edit/entrepreneur");
    }
  }, [userType, navigate]);

  const handleSave = () => {
    // Here you would implement the logic to save the profile data
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
          <h1 className="text-2xl font-medium">Edit Researcher Profile</h1>
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
                  Change Photo
                </Button>
              </div>

              <div className="flex-1">
                <div className="grid md:grid-cols-2 gap-6">
                  <div className="mb-4">
                    <label htmlFor="name" className="block mb-2 font-medium">
                      Full Name
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
                      Academic Title
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
                      Institution
                    </label>
                    <input
                      type="text"
                      id="institution"
                      defaultValue="Federal University"
                      className="w-full p-3 border border-input rounded-lg focus:outline-none focus:ring-2 focus:ring-primary"
                    />
                  </div>

                  <div className="mb-4">
                    <label htmlFor="field" className="block mb-2 font-medium">
                      Research Area
                    </label>
                    <input
                      type="text"
                      id="field"
                      defaultValue="Artificial Intelligence and Blockchain"
                      className="w-full p-3 border border-input rounded-lg focus:outline-none focus:ring-2 focus:ring-primary"
                    />
                  </div>
                </div>
              </div>
            </div>

            <div className="mb-6">
              <label htmlFor="bio" className="block mb-2 font-medium">
                Biography
              </label>
              <textarea
                id="bio"
                rows={4}
                defaultValue="Specialist in blockchain applications for scientific research and knowledge transfer. Working at the intersection of AI, cryptography, and decentralized systems."
                className="w-full p-3 border border-input rounded-lg focus:outline-none focus:ring-2 focus:ring-primary"
              ></textarea>
            </div>

            <div className="mb-6">
              <label className="block mb-2 font-medium">Specialties</label>
              <div className="flex flex-wrap gap-2 mb-2">
                <span className="tag flex items-center">
                  Blockchain
                  <button type="button" className="ml-1 text-secondary hover:text-danger">
                    ×
                  </button>
                </span>
                <span className="tag flex items-center">
                  Artificial Intelligence
                  <button type="button" className="ml-1 text-secondary hover:text-danger">
                    ×
                  </button>
                </span>
                <span className="tag flex items-center">
                  Cryptography
                  <button type="button" className="ml-1 text-secondary hover:text-danger">
                    ×
                  </button>
                </span>
              </div>
              <div className="flex">
                <input
                  type="text"
                  className="flex-1 p-3 border border-input rounded-l-lg focus:outline-none focus:ring-2 focus:ring-primary"
                  placeholder="Add new specialty"
                />
                <Button type="button" className="rounded-l-none">
                  <Plus className="h-4 w-4" />
                </Button>
              </div>
            </div>

            <div className="mb-6">
              <label className="block mb-2 font-medium">Academic Background</label>

              <div className="border rounded-lg p-4 mb-4">
                <div className="flex justify-between items-start mb-2">
                  <div>
                    <h3 className="font-medium">PhD in Computer Science</h3>
                    <p className="text-sm text-secondary">Federal University • 2015-2019</p>
                  </div>
                  <Button variant="outline" type="button" className="text-danger">
                    <Trash2 className="h-4 w-4" />
                  </Button>
                </div>
                <p className="text-sm">
                  Thesis: "Blockchain Applications in Scientific Data Verification Systems"
                </p>
              </div>

              <div className="border rounded-lg p-4 mb-4">
                <div className="flex justify-between items-start mb-2">
                  <div>
                    <h3 className="font-medium">Master's in Computer Science</h3>
                    <p className="text-sm text-secondary">State University • 2013-2015</p>
                  </div>
                  <Button variant="outline" type="button" className="text-danger">
                    <Trash2 className="h-4 w-4" />
                  </Button>
                </div>
                <p className="text-sm">Dissertation: "Machine Learning Algorithms for Data Analysis"</p>
              </div>

              <Button variant="outline" type="button" className="gap-2">
                <Plus className="h-4 w-4" />
                Add Background
              </Button>
            </div>

            <div className="mb-6">
              <label className="block mb-2 font-medium">Highlighted Publications</label>

              <div className="border rounded-lg p-4 mb-4">
                <div className="flex justify-between items-start mb-2">
                  <div>
                    <h3 className="font-medium">Blockchain Applications in Scientific Research Validation</h3>
                    <p className="text-sm text-secondary">Journal of Blockchain Research • 2022</p>
                  </div>
                  <Button variant="outline" type="button" className="text-danger">
                    <Trash2 className="h-4 w-4" />
                  </Button>
                </div>
              </div>

              <Button variant="outline" type="button" className="gap-2">
                <Plus className="h-4 w-4" />
                Add Publication
              </Button>
            </div>

            <div className="mb-6">
              <label className="block mb-2 font-medium">Contact Information</label>

              <div className="grid md:grid-cols-2 gap-6">
                <div className="mb-4">
                  <label htmlFor="email" className="block mb-2 text-sm">
                    Email
                  </label>
                  <input
                    type="email"
                    id="email"
                    defaultValue="joao.dias@university.edu"
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
              <label className="block mb-2 font-medium">NEAR Wallet Address</label>
              <input
                type="text"
                defaultValue="joaodias.near"
                className="w-full p-3 border border-input rounded-lg focus:outline-none focus:ring-2 focus:ring-primary"
                disabled
              />
              <p className="text-xs text-secondary mt-1">
                This is your connected wallet address. To change it, you need to reconnect with another wallet.
              </p>
            </div>

            <div className="flex justify-end gap-4">
              <Button variant="outline" type="button" onClick={() => navigate("/profile")}>
                Cancel
              </Button>
              <Button type="submit">Save Changes</Button>
            </div>
          </form>
        </div>
      </main>
    </>
  );
}