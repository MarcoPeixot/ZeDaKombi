import React from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import "./index.css";
import { UserProvider } from "./context/user-context";
import { AuthProvider } from './context/auth-context';
import LoginPage from "./pages/login";
import { SignupForm } from "./components/SignupForm";
import FeedPesquisador from "./pages/feed_pesquisador";
import FeedEmpresarios from "./pages/feed_empresarios";
import SubmitArticlePage from "./pages/articles/submit";
import CreatePostPage from "./pages/articles/create-post";
import TransactionsPage from "./pages/transactions";
import MessagesPage from "./pages/messages";
import ResearchersPage from "./pages/research";
import ProfilePage from "./pages/profile/profile";
import EditEntrepreneurProfilePage from "./pages/profile/edit/entrepreneur";
import EditResearcherProfilePage from "./pages/profile/edit/research";
import IPFSViewerPage from "./pages/ipfs-view";
import { ProtectedRoute } from "./components/ProtectRoutes";
import { SuccessPesquisador } from "./pages/SuccessPesquisador";
import { SuccessEmpresario } from "./pages/SucessesEmpresario";
import { RedirectOnRole } from "../src/RedirectOneRole";

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <AuthProvider>
      <UserProvider>
        <BrowserRouter>
        <RedirectOnRole />
          <Routes>
            <Route path="/" element={<LoginPage />} />
            <Route path="/login" element={<LoginPage />} />
            <Route path="/signup" element={<SignupForm />} />
            <Route path="/success-pesquisador" element={<SuccessPesquisador />} />
            <Route path="/success-empresario" element={<SuccessEmpresario />} />
            {/* Rotas protegidas */}
            <Route
              path="/feed-pesquisador"
              element={
                <ProtectedRoute requiredRole="pesquisador">
                  <FeedPesquisador />
                </ProtectedRoute>
              }
            />
            <Route
              path="/submit"
              element={
                <ProtectedRoute>
                  <SubmitArticlePage />
                </ProtectedRoute>
              }
            />
            <Route
              path="/create-post"
              element={
                <ProtectedRoute>
                  <CreatePostPage />
                </ProtectedRoute>
              }
            />
            <Route
              path="/transactions"
              element={
                <ProtectedRoute>
                  <TransactionsPage />
                </ProtectedRoute>
              }
            />
            <Route
              path="/messages"
              element={
                <ProtectedRoute>
                  <MessagesPage />
                </ProtectedRoute>
              }
            />
            <Route
              path="/feed-empresarios"
              element={
                <ProtectedRoute requiredRole="empresario">
                  <FeedEmpresarios />
                </ProtectedRoute>
              }
            />
            <Route
              path="/research"
              element={
                <ProtectedRoute>
                  <ResearchersPage />
                </ProtectedRoute>
              }
            />
            <Route
              path="/profile"
              element={
                <ProtectedRoute>
                  <ProfilePage />
                </ProtectedRoute>
              }
            />
            <Route
              path="/profile/edit/researcher"
              element={
                <ProtectedRoute>
                  <EditResearcherProfilePage />
                </ProtectedRoute>
              }
            />
            <Route
              path="/profile/edit/entrepreneur"
              element={
                <ProtectedRoute>
                  <EditEntrepreneurProfilePage />
                </ProtectedRoute>
              }
            />
            <Route
              path="/ipfs-viewer"
              element={
                <ProtectedRoute>
                  <IPFSViewerPage />
                </ProtectedRoute>
              }
            />
          </Routes>
        </BrowserRouter>
      </UserProvider>
    </AuthProvider>
  </React.StrictMode>
);