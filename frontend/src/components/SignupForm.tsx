// components/SignupForm.tsx
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "./ui/button";
import { User, Briefcase, ArrowLeft, CheckCircle, Mail, Lock, UserCircle } from "lucide-react";
import { useNearWallet } from "../hooks/useNearWallets";
import { Link } from "react-router-dom";

export function SignupForm() {
  const { connect, accountId } = useNearWallet();
  const [step, setStep] = useState<"select-type" | "register">("select-type");
  const [selectedType, setSelectedType] = useState<"researcher" | "entrepreneur" | null>(null);
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleSelectType = (type: "researcher" | "entrepreneur") => {
    setSelectedType(type);
    setStep("register");
  };

  const handleRegister = async () => {
    if (!name || !email || !password) {
      setError("Please fill in all fields.");
      return;
    }
    
    try {
      setLoading(true);
      setError("");
      console.log("▶️ Starting registration...");
  
      const response = await fetch("https://zedakombi-1.onrender.com/registrar", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name,
          email,
          senha: password,
          role: selectedType === "researcher" ? "pesquisador" : "empresario",
        }),
      });
  
      if (!response.ok) {
        const errorData = await response.json();
        console.error("❌ API Error:", errorData);
        setError(errorData.message || "Error registering user. Please try again.");
        throw new Error("Error registering user");
      }
  
      const data = await response.json();
      const userId = data.user_id;
      localStorage.setItem("user_id", userId.toString());
      localStorage.setItem("selectedType", selectedType || "");
      console.log("✅ User registered with ID:", userId);
  
      // Initiates NEAR wallet connection (opens modal)
      await connect();
  
    } catch (error) {
      console.error("Registration error:", error);
    } finally {
      setLoading(false);
    }
  };

  // When accountId is detected (wallet connected), redirects to SuccessRegistration screen
  useEffect(() => {
    if (accountId) {
      console.log("✅ NEAR wallet connected:", accountId);
      localStorage.setItem("near_wallet", accountId);
      navigate("/registro-sucesso");
    }
  }, [accountId, navigate]);

  const typeLabel = selectedType === "researcher" ? "Researcher" : "Entrepreneur";
  const typeIcon = selectedType === "researcher" ? <User className="h-5 w-5" /> : <Briefcase className="h-5 w-5" />;

  return (
    <div className="bg-gradient-to-b from-slate-900 to-black text-white min-h-screen flex flex-col">
      {/* Header */}
      <header className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6 w-full">
        <div className="flex justify-between items-center">
          <Link to="/" className="flex items-center">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="32"
              height="32"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              strokeWidth="2"
              className="text-blue-500"
            >
              <rect x="3" y="3" width="18" height="18" rx="2" ry="2" />
            </svg>
            <h1 className="ml-2 text-2xl font-bold text-blue-500">NexusR</h1>
          </Link>
          
          <div>
            <Link to="/login">
              <Button variant="outline" className="border-blue-500 text-blue-500 hover:bg-blue-500/10">
                Login
              </Button>
            </Link>
          </div>
        </div>
      </header>
      
      {/* Main Content */}
      <main className="flex-grow flex items-center justify-center px-4 py-12">
        <div className="bg-gray-900/60 p-8 sm:p-10 rounded-2xl border border-gray-800 shadow-xl max-w-md w-full">
          {step === "select-type" ? (
            <>
              <div className="text-center mb-8">
                <div className="h-16 w-16 bg-blue-500/20 rounded-full flex items-center justify-center mx-auto mb-6">
                  <CheckCircle className="h-8 w-8 text-blue-500" />
                </div>
                <h1 className="text-2xl font-bold mb-2">Create your account</h1>
                <p className="text-gray-400">
                  Choose the profile type that best describes you.
                </p>
              </div>
              
              <div className="space-y-4">
                <h2 className="text-lg font-medium text-white">Select your profile:</h2>
                
                <button
                  onClick={() => handleSelectType("researcher")}
                  className="w-full p-4 bg-gray-800/80 border border-gray-700 hover:border-blue-500 rounded-lg flex items-center gap-4 hover:bg-gray-800 transition group"
                >
                  <div className="h-12 w-12 rounded-full bg-blue-500/20 text-blue-500 flex items-center justify-center">
                    <User className="h-6 w-6" />
                  </div>
                  <div className="text-left">
                    <div className="font-medium text-lg group-hover:text-blue-500 transition">Researcher</div>
                    <div className="text-sm text-gray-400">Share your research and receive funding</div>
                  </div>
                </button>
                
                <button
                  onClick={() => handleSelectType("entrepreneur")}
                  className="w-full p-4 bg-gray-800/80 border border-gray-700 hover:border-blue-500 rounded-lg flex items-center gap-4 hover:bg-gray-800 transition group"
                >
                  <div className="h-12 w-12 rounded-full bg-blue-500/20 text-blue-500 flex items-center justify-center">
                    <Briefcase className="h-6 w-6" />
                  </div>
                  <div className="text-left">
                    <div className="font-medium text-lg group-hover:text-blue-500 transition">Entrepreneur</div>
                    <div className="text-sm text-gray-400">Find research and invest in innovation</div>
                  </div>
                </button>
              </div>
              
              <div className="mt-8 text-center">
                <p className="text-sm text-gray-400">
                  Already have an account?{" "}
                  <Link to="/login" className="text-blue-500 hover:underline">
                    Sign in
                  </Link>
                </p>
              </div>
            </>
          ) : (
            <>
              <div className="mb-6">
                <button
                  onClick={() => setStep("select-type")}
                  className="flex items-center text-gray-400 hover:text-blue-500"
                >
                  <ArrowLeft className="h-4 w-4 mr-1" />
                  <span>Back</span>
                </button>
              </div>
              
              <div className="text-center mb-8">
                <div className="h-16 w-16 bg-blue-500/20 rounded-full flex items-center justify-center mx-auto mb-6">
                  {typeIcon}
                </div>
                <h1 className="text-2xl font-bold mb-2">{typeLabel} Registration</h1>
                <p className="text-gray-400">Fill in the fields below to create your account.</p>
              </div>
              
              {error && (
                <div className="bg-red-500/20 border border-red-600 text-red-200 px-4 py-3 rounded mb-6">
                  {error}
                </div>
              )}
              
              <div className="space-y-4">
                <div className="relative">
                  <UserCircle className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-500 h-5 w-5" />
                  <input
                    type="text"
                    placeholder="Full name"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    className="w-full p-3 pl-10 bg-gray-800/80 border border-gray-700 focus:border-blue-500 rounded-lg outline-none text-white"
                  />
                </div>
                
                <div className="relative">
                  <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-500 h-5 w-5" />
                  <input
                    type="email"
                    placeholder="Email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="w-full p-3 pl-10 bg-gray-800/80 border border-gray-700 focus:border-blue-500 rounded-lg outline-none text-white"
                  />
                </div>
                
                <div className="relative">
                  <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-500 h-5 w-5" />
                  <input
                    type="password"
                    placeholder="Password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    className="w-full p-3 pl-10 bg-gray-800/80 border border-gray-700 focus:border-blue-500 rounded-lg outline-none text-white"
                  />
                </div>
              </div>
              
              <Button
                onClick={handleRegister}
                disabled={loading}
                className="w-full py-4 text-base font-medium flex items-center justify-center gap-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg mt-8"
              >
                {loading ? "Processing..." : "Register and connect NEAR wallet"}
              </Button>
            </>
          )}
          
          <p className="text-xs text-gray-500 mt-6 text-center">
            By registering, you agree to our{" "}
            <a href="#" className="text-blue-500 hover:underline">
              Terms of Service
            </a>{" "}
            and{" "}
            <a href="#" className="text-blue-500 hover:underline">
              Privacy Policy
            </a>
          </p>
        </div>
      </main>
      
      {/* Footer */}
      <footer className="py-6 border-t border-gray-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center text-gray-400 text-sm">
          <p>© 2025 NexusR. All rights reserved.</p>
        </div>
      </footer>
    </div>
  );
}