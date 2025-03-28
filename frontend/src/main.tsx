import React from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import "./index.css";
import { UserProvider } from "./context/user-context";
import { AuthProvider } from './context/auth-context';
import LoginPage from "./pages/login";
import { SignupForm } from "./components/SignupForm";
import ResearcherFeed from "./pages/feed_pesquisador";
import EntrepreneurFeed from "./pages/feed_empresarios";
import SubmitArticlePage from "./pages/articles/submit";
import CreatePostPage from "./pages/articles/create-post";
import TransactionsPage from "./pages/transactions";
import MessagesPage from "./pages/messages";
import ResearchersPage from "./pages/research";
import ProfilePage from "./pages/profile/profile";
import EditEntrepreneurProfilePage from "./pages/profile/edit/entrepreneur";
import EditResearcherProfilePage from "./pages/profile/edit/research";
import IPFSViewerPage from "./pages/ipfs-view";
import RegistroSucesso from "../src/pages/RegistroSucesso";
import UserListPage from "./pages/list";
import LadingPage from "./pages/landing_page";

if (typeof global === "undefined") {
  (window as any).global = window;
}

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <AuthProvider>
      <UserProvider>
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<LadingPage />} />
            <Route path="/login" element={<LoginPage />} />
            <Route path="/signup" element={<SignupForm />} />
            <Route path="/registro-sucesso" element={<RegistroSucesso />} />
            
            {/* Rotas sem proteção (temporariamente) */}
            <Route path="/researcher-feed" element={<ResearcherFeed />} />
            <Route path="/submit" element={<SubmitArticlePage />} />
            <Route path="/create-post" element={<CreatePostPage />} />
            <Route path="/transactions" element={<TransactionsPage />} />
            <Route path="/messages" element={<MessagesPage />} />
            <Route path="/list" element={<UserListPage />} />
            <Route path="/entrepreneur-feed" element={<EntrepreneurFeed />} />
            <Route path="/research" element={<ResearchersPage />} />
            <Route path="/profile" element={<ProfilePage />} />
            <Route path="/profile/edit/researcher" element={<EditResearcherProfilePage />} />
            <Route path="/profile/edit/entrepreneur" element={<EditEntrepreneurProfilePage />} />
            <Route path="/ipfs-viewer" element={<IPFSViewerPage />} />
          </Routes>
        </BrowserRouter>
      </UserProvider>
    </AuthProvider>
  </React.StrictMode>
);