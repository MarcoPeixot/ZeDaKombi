import React from 'react';
import { Button } from "../components/ui/button";
import { Lock, ArrowRight, Shield, Code, Zap, Database, MessageSquare } from "lucide-react";
import { Link } from "react-router-dom";

export default function LandingPage() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-slate-900 to-black text-white">
      {/* Navbar */}
      <nav className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
        <div className="flex justify-between items-center">
          <div className="flex items-center">
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
          </div>
          
          <div className="hidden md:flex items-center space-x-8">
            <a href="#features" className="text-gray-300 hover:text-white transition">Features</a>
            <a href="#solutions" className="text-gray-300 hover:text-white transition">Solutions</a>
            <a href="#about" className="text-gray-300 hover:text-white transition">About</a>
          </div>
          
          <div className="flex items-center gap-4">
            <Link to="/login">
              <Button variant="outline" className="border-blue-500 text-blue-500 hover:bg-blue-500/10">
                Login
              </Button>
            </Link>
            <Link to="/signup">
              <Button className="bg-blue-600 hover:bg-blue-700 text-white">
                Sign Up
              </Button>
            </Link>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-24 sm:py-32 flex flex-col lg:flex-row items-center">
        <div className="lg:w-1/2 mb-12 lg:mb-0">
          <h1 className="text-4xl sm:text-5xl md:text-6xl font-bold leading-tight mb-6">
            Bridging science and innovation <span className="text-blue-500">via blockchain</span>
          </h1>
          <p className="text-gray-300 text-lg sm:text-xl mb-8 max-w-xl">
            NexusR connects researchers and entrepreneurs using blockchain technology to foster collaboration, transparency, and innovation.
          </p>
          <div className="flex flex-col sm:flex-row gap-4">
            <Link to="/signup">
              <Button className="bg-blue-600 hover:bg-blue-700 text-white font-medium py-3 px-6 rounded-lg w-full sm:w-auto text-lg">
                Get Started
                <ArrowRight className="ml-2 h-5 w-5" />
              </Button>
            </Link>
            <a href="#features">
              <Button variant="outline" className="border-gray-600 text-gray-300 hover:bg-gray-800 font-medium py-3 px-6 rounded-lg w-full sm:w-auto text-lg">
                Learn More
              </Button>
            </a>
          </div>
        </div>
        
        <div className="lg:w-1/2">
          <div className="relative">
            <div className="absolute inset-0 bg-blue-500 rounded-3xl blur-3xl opacity-20 animate-pulse"></div>
            <img 
              src="/api/placeholder/700/500" 
              alt="Blockchain Technology" 
              className="relative rounded-3xl shadow-2xl border border-gray-800"
            />
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section id="features" className="bg-slate-900/50 py-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl sm:text-4xl font-bold mb-4">Key Features</h2>
            <p className="text-gray-300 text-lg max-w-2xl mx-auto">
              Our platform offers powerful tools to connect researchers and entrepreneurs through blockchain technology.
            </p>
          </div>
          
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            <div className="bg-gray-900/60 p-8 rounded-2xl border border-gray-800 hover:border-blue-500/50 transition">
              <Shield className="h-12 w-12 text-blue-500 mb-6" />
              <h3 className="text-xl font-semibold mb-3">Blockchain Security</h3>
              <p className="text-gray-300">
                Protect your data and intellectual property with our cutting-edge blockchain technology.
              </p>
            </div>
            
            <div className="bg-gray-900/60 p-8 rounded-2xl border border-gray-800 hover:border-blue-500/50 transition">
              <Zap className="h-12 w-12 text-blue-500 mb-6" />
              <h3 className="text-xl font-semibold mb-3">Fast Collaboration</h3>
              <p className="text-gray-300">
                Instantly connect with research partners and potential investors.
              </p>
            </div>
            
            <div className="bg-gray-900/60 p-8 rounded-2xl border border-gray-800 hover:border-blue-500/50 transition">
              <Database className="h-12 w-12 text-blue-500 mb-6" />
              <h3 className="text-xl font-semibold mb-3">IPFS Storage</h3>
              <p className="text-gray-300">
                Store your articles and research in a decentralized way using IPFS technology.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Solutions Section */}
      <section id="solutions" className="py-24 sm:py-32">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-16 items-center">
            <div>
              <h2 className="text-3xl sm:text-4xl font-bold mb-6">For Researchers</h2>
              <p className="text-gray-300 text-lg mb-8">
                Share your research with the world and connect with companies that can turn your ideas into reality.
              </p>
              
              <div className="space-y-4">
                <div className="flex items-start gap-4">
                  <div className="bg-blue-500/20 p-3 rounded-full">
                    <Code className="h-6 w-6 text-blue-500" />
                  </div>
                  <div>
                    <h3 className="text-xl font-semibold mb-2">Publish Securely</h3>
                    <p className="text-gray-300">
                      Register the authorship of your research on the blockchain and maintain your intellectual rights.
                    </p>
                  </div>
                </div>
                
                <div className="flex items-start gap-4">
                  <div className="bg-blue-500/20 p-3 rounded-full">
                    <Lock className="h-6 w-6 text-blue-500" />
                  </div>
                  <div>
                    <h3 className="text-xl font-semibold mb-2">Get Funding</h3>
                    <p className="text-gray-300">
                      Present your projects to investors and companies interested in innovation.
                    </p>
                  </div>
                </div>
              </div>
              
              <Link to="/signup" className="mt-8 inline-block">
                <Button className="bg-blue-600 hover:bg-blue-700 text-white font-medium py-3 px-6 rounded-lg">
                  Join as Researcher
                </Button>
              </Link>
            </div>
            
            <div>
              <div className="relative">
                <div className="absolute inset-0 bg-blue-500 rounded-3xl blur-3xl opacity-20"></div>
                
              </div>
            </div>
          </div>
          
          <div className="mt-32 grid lg:grid-cols-2 gap-16 items-center">
            <div className="order-2 lg:order-1">
              <div className="relative">
                <div className="absolute inset-0 bg-blue-500 rounded-3xl blur-3xl opacity-20"></div>
                
              </div>
            </div>
            
            <div className="order-1 lg:order-2">
              <h2 className="text-3xl sm:text-4xl font-bold mb-6">For Entrepreneurs</h2>
              <p className="text-gray-300 text-lg mb-8">
                Access the latest research and technologies to drive innovation in your business.
              </p>
              
              <div className="space-y-4">
                <div className="flex items-start gap-4">
                  <div className="bg-blue-500/20 p-3 rounded-full">
                    <Zap className="h-6 w-6 text-blue-500" />
                  </div>
                  <div>
                    <h3 className="text-xl font-semibold mb-2">Discover Innovations</h3>
                    <p className="text-gray-300">
                      Find cutting-edge research that can transform your business and create a competitive advantage.
                    </p>
                  </div>
                </div>
                
                <div className="flex items-start gap-4">
                  <div className="bg-blue-500/20 p-3 rounded-full">
                    <MessageSquare className="h-6 w-6 text-blue-500" />
                  </div>
                  <div>
                    <h3 className="text-xl font-semibold mb-2">Collaborate Directly</h3>
                    <p className="text-gray-300">
                      Connect with researchers and form partnerships without intermediaries.
                    </p>
                  </div>
                </div>
              </div>
              
              <Link to="/signup" className="mt-8 inline-block">
                <Button className="bg-blue-600 hover:bg-blue-700 text-white font-medium py-3 px-6 rounded-lg">
                  Join as Entrepreneur
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-24 sm:py-32 bg-gradient-to-r from-blue-900/20 to-slate-900/20 border-t border-b border-gray-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl sm:text-4xl font-bold mb-6">Ready to transform innovation?</h2>
          <p className="text-gray-300 text-lg mb-8 max-w-2xl mx-auto">
            Join researchers and entrepreneurs from around the world and participate in the future of scientific collaboration with blockchain.
          </p>
          <Link to="/signup">
            <Button className="bg-blue-600 hover:bg-blue-700 text-white font-medium py-3 px-8 rounded-lg text-lg">
              Get Started for Free
            </Button>
          </Link>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-12 sm:py-16 border-t border-gray-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            <div>
              <div className="flex items-center mb-6">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="28"
                  height="28"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                  strokeWidth="2"
                  className="text-blue-500"
                >
                  <rect x="3" y="3" width="18" height="18" rx="2" ry="2" />
                </svg>
                <h1 className="ml-2 text-xl font-bold text-blue-500">NexusR</h1>
              </div>
              <p className="text-gray-400 text-sm">
                Bridging scientific research and the business world.
              </p>
            </div>
            
            <div>
              <h3 className="text-white font-semibold mb-4">Platform</h3>
              <ul className="space-y-3 text-gray-400">
                <li><a href="#" className="hover:text-white transition">Features</a></li>
                <li><a href="#" className="hover:text-white transition">How it works</a></li>
                <li><a href="#" className="hover:text-white transition">Pricing</a></li>
                <li><a href="#" className="hover:text-white transition">FAQ</a></li>
              </ul>
            </div>
            
            <div>
              <h3 className="text-white font-semibold mb-4">Company</h3>
              <ul className="space-y-3 text-gray-400">
                <li><a href="#" className="hover:text-white transition">About us</a></li>
                <li><a href="#" className="hover:text-white transition">Careers</a></li>
                <li><a href="#" className="hover:text-white transition">Blog</a></li>
                <li><a href="#" className="hover:text-white transition">Contact</a></li>
              </ul>
            </div>
            
            <div>
              <h3 className="text-white font-semibold mb-4">Legal</h3>
              <ul className="space-y-3 text-gray-400">
                <li><a href="#" className="hover:text-white transition">Terms of Service</a></li>
                <li><a href="#" className="hover:text-white transition">Privacy</a></li>
                <li><a href="#" className="hover:text-white transition">Cookies</a></li>
              </ul>
            </div>
          </div>
          
          <div className="mt-12 pt-8 border-t border-gray-800 text-center text-gray-400 text-sm">
            <p>© 2025 NexusR. All rights reserved.</p>
          </div>
        </div>
      </footer>
    </div>
  );
}