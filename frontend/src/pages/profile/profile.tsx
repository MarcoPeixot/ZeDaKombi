import { Navbar } from "../../components/ui/navbar";
import { Button } from "../../components/ui/button";
import { FileText, Edit, ExternalLink, Building, Briefcase, Award, TrendingUp } from "lucide-react";
import { useUser } from "../../context/user-context";
import { Link } from "react-router-dom"; // Replace next/link with react-router-dom

export default function ProfilePage() {
  const { userType } = useUser();

  // Render the appropriate profile based on the user type
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
                Edit Profile
              </Button>
            </Link>
          </div>

          <div className="flex-1">
            <h1 className="text-2xl font-medium mb-2">João Dias, PhD</h1>
            <p className="text-secondary mb-4">
              Researcher in Artificial Intelligence and Blockchain • Federal University
            </p>

            <p className="mb-4">
              Specialist in blockchain applications for scientific research and knowledge transfer.
              Works at the intersection of AI, cryptography, and decentralized systems.
            </p>

            <div className="flex flex-wrap gap-8 mt-6">
              <div className="flex flex-col">
                <span className="text-xl font-semibold">12</span>
                <span className="text-sm text-secondary">Articles</span>
              </div>
              <div className="flex flex-col">
                <span className="text-xl font-semibold">48</span>
                <span className="text-sm text-secondary">Posts</span>
              </div>
              <div className="flex flex-col">
                <span className="text-xl font-semibold">156</span>
                <span className="text-sm text-secondary">Connections</span>
              </div>
            </div>
          </div>
        </div>

        <div className="border-b mb-6">
          <div className="flex">
            <button className="px-6 py-4 font-medium text-primary border-b-2 border-primary">Articles</button>
            <button className="px-6 py-4 font-medium text-secondary hover:text-primary">Posts</button>
            <button className="px-6 py-4 font-medium text-secondary hover:text-primary">About</button>
          </div>
        </div>

        <div className="grid md:grid-cols-2 gap-6">
          {[1, 2, 3, 4].map((item) => (
            <div key={item} className="border rounded-lg p-4 hover:shadow-md transition-shadow">
              <div className="flex justify-between items-start mb-3">
                <h3 className="font-medium">Blockchain Applications in Scientific Research Validation</h3>
                <FileText className="h-5 w-5 text-secondary flex-shrink-0 ml-2" />
              </div>
              <p className="text-sm text-secondary mb-3 line-clamp-2">
                This article explores how blockchain technology can be used to validate and verify scientific research results,
                increasing transparency and reliability.
              </p>
              <div className="flex flex-wrap mb-3">
                <span className="tag">Blockchain</span>
                <span className="tag">Science</span>
                <span className="tag">Validation</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-xs text-secondary">Published on 03/12/2023</span>
                <Link to="/ipfs-viewer"> {/* Added Link to IPFS Viewer */}
                  <Button variant="outline" className="gap-1">
                    <ExternalLink className="h-4 w-4" />
                    <span className="text-xs">View</span>
                  </Button>
                </Link>
              </div>
            </div>
          ))}
        </div>

        <div className="mt-6 text-center">
          <Button variant="outline">Load More</Button>
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
                Edit Profile
              </Button>
            </Link>
          </div>

          <div className="flex-1">
            <h1 className="text-2xl font-medium mb-2">Ricardo Pereira</h1>
            <p className="text-secondary mb-4">CEO • ABC Innovations</p>

            <div className="flex items-center gap-2 mb-2">
              <Building className="h-4 w-4 text-secondary" />
              <span>Technology and Innovation</span>
            </div>

            <div className="flex items-center gap-2 mb-4">
              <Briefcase className="h-4 w-4 text-secondary" />
              <span>São Paulo, Brazil</span>
            </div>

            <p className="mb-4">
              Investor in emerging technologies focusing on blockchain and artificial intelligence-based solutions.
              Seeking partnerships with researchers to develop innovative and sustainable products.
            </p>

            <div className="flex flex-wrap gap-8 mt-6">
              <div className="flex flex-col">
                <span className="text-xl font-semibold">8</span>
                <span className="text-sm text-secondary">Funded Researchers</span>
              </div>
              <div className="flex flex-col">
                <span className="text-xl font-semibold">15</span>
                <span className="text-sm text-secondary">Articles Accessed</span>
              </div>
              <div className="flex flex-col">
                <span className="text-xl font-semibold">24</span>
                <span className="text-sm text-secondary">Transactions</span>
              </div>
            </div>
          </div>
        </div>

        <div className="border-b mb-6">
          <div className="flex">
            <button className="px-6 py-4 font-medium text-primary border-b-2 border-primary">Investments</button>
            <button className="px-6 py-4 font-medium text-secondary hover:text-primary">Interests</button>
            <button className="px-6 py-4 font-medium text-secondary hover:text-primary">About</button>
          </div>
        </div>

        <div className="grid md:grid-cols-2 gap-6">
          {[1, 2, 3, 4].map((item) => (
            <div key={item} className="border rounded-lg p-4 hover:shadow-md transition-shadow">
              <div className="flex justify-between items-start mb-3">
                <div>
                  <h3 className="font-medium">João Dias, PhD</h3>
                  <p className="text-sm text-secondary">Federal University</p>
                </div>
                <div className="h-10 w-10 rounded-full bg-primary/10 flex items-center justify-center text-primary">
                  <Award className="h-5 w-5" />
                </div>
              </div>
              <p className="text-sm mb-3">
                Funding for research on "Blockchain Applications in Scientific Research Validation"
              </p>
              <div className="flex flex-wrap mb-3">
                <span className="tag">Blockchain</span>
                <span className="tag">Science</span>
                <span className="tag">Validation</span>
              </div>
            </div>
          ))}
        </div>

        <div className="mt-6 text-center">
          <Button variant="outline">Load More</Button>
        </div>
      </div>
    </main>
  );
}
