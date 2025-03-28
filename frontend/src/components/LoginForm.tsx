// components/LoginForm.tsx
import { useState } from "react";
import { Button } from "../components/ui/button";
import { Lock, Mail, LogIn, ArrowRight } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../context/auth-context";
import { useUser } from "../context/user-context";
import { Link } from "react-router-dom";

export function LoginForm() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const navigate = useNavigate();
  const { login } = useAuth();
  const { setUserType } = useUser();

  const handleLogin = async () => {
    if (!email || !password) {
      setError("Please fill in all fields.");
      return;
    }

    try {
      setLoading(true);
      setError("");
      
      const response = await fetch('https://zedakombi-1.onrender.com/token', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/x-www-form-urlencoded',
        },
        body: new URLSearchParams({
          username: email,
          password: password,
        }),
      });
  
      if (!response.ok) {
        const errorData = await response.json();
        setError(errorData?.detail || "Incorrect email or password. Please try again.");
        throw new Error('Login failed');
      }
  
      const data = await response.json();
      
      // Fetch complete user information
      const userResponse = await fetch(`https://zedakombi-1.onrender.com/usuarios/${data.user_id}`);
      if (!userResponse.ok) {
        throw new Error('Failed to fetch user details');
      }
      const userData = await userResponse.json();
  
      // Store all information
      login(
        data.access_token, 
        data.role,
        {
          id: data.user_id.toString(),
          name: userData.name,
          email: email
        }
      );
  
      // Redirect based on role
      if (data.role === "pesquisador") {
        navigate("/researcher-feed");
      } else if (data.role === "empresario") {
        navigate("/entrepreneur-feed");
      }
    } catch (error) {
      console.error('Login error:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter') {
      handleLogin();
    }
  };

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
            <Link to="/signup">
              <Button className="bg-blue-600 hover:bg-blue-700 text-white">
                Sign Up
              </Button>
            </Link>
          </div>
        </div>
      </header>
      
      {/* Main Content */}
      <main className="flex-grow flex items-center justify-center px-4 py-12">
        <div className="bg-gray-900/60 p-8 sm:p-10 rounded-2xl border border-gray-800 shadow-xl max-w-md w-full">
          <div className="text-center mb-8">
            <div className="h-16 w-16 bg-blue-500/20 rounded-full flex items-center justify-center mx-auto mb-6">
              <LogIn className="h-8 w-8 text-blue-500" />
            </div>
            <h1 className="text-2xl font-bold mb-2">Welcome to the platform</h1>
            <p className="text-gray-400">
              The bridge between scientific research and the business world, using blockchain to promote innovation and collaboration.
            </p>
          </div>
          
          {error && (
            <div className="bg-red-500/20 border border-red-600 text-red-200 px-4 py-3 rounded mb-6">
              {error}
            </div>
          )}
          
          <div className="space-y-4">
            <div className="relative">
              <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-500 h-5 w-5" />
              <input
                type="email"
                placeholder="Email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                onKeyPress={handleKeyPress}
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
                onKeyPress={handleKeyPress}
                className="w-full p-3 pl-10 bg-gray-800/80 border border-gray-700 focus:border-blue-500 rounded-lg outline-none text-white"
              />
            </div>
            
            <div className="flex justify-end">
              <Link to="/forgot-password" className="text-sm text-blue-500 hover:underline">
                Forgot your password?
              </Link>
            </div>
          </div>
          
          <Button
            onClick={handleLogin}
            disabled={loading}
            className="w-full py-4 mt-6 text-base font-medium flex items-center justify-center gap-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg"
          >
            {loading ? (
              "Connecting..."
            ) : (
              <>
                Connect
                <ArrowRight className="h-5 w-5" />
              </>
            )}
          </Button>
          
          <div className="mt-8 text-center">
            <p className="text-gray-400">
              Don't have an account?{" "}
              <Link to="/signup" className="text-blue-500 hover:underline font-medium">
                Sign Up
              </Link>
            </p>
          </div>
          
          <p className="text-xs text-gray-500 mt-6 text-center">
            By connecting, you agree to our{" "}
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