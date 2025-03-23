import React from "react"
import ReactDOM from "react-dom/client"
import { BrowserRouter, Routes, Route } from "react-router-dom"
import "./index.css"
import { UserProvider } from "./context/user-context"
import LoginPage from "./pages/login"
import FeedPesquisador from "./pages/feed_pesquisador"
import FeedEmpresarios from "./pages/feed_empresarios"
import SubmitArticlePage from "./pages/articles/submit"
import CreatePostPage from "./pages/articles/create-post"
import TransactionsPage from "./pages/transactions"
import MessagesPage from "./pages/messages"
import ResearchersPage from "./pages/research"
import ProfilePage from "./pages/profile/profile"
import EditEntrepreneurProfilePage from "./pages/profile/edit/entrepreneur"
import EditResearcherProfilePage from "./pages/profile/edit/research"
import IPFSViewerPage from "./pages/ipfs-view"

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <UserProvider>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<LoginPage />} />
          <Route path="/feed-pesquisador" element={<FeedPesquisador />} />
          <Route path="/submit" element={<SubmitArticlePage />} />
          <Route path="/create-post" element={<CreatePostPage />} />
          <Route path="/transactions" element={<TransactionsPage/>}/>
          <Route path="/messages" element={<MessagesPage/>}/>
          <Route path="/feed-empresarios" element={<FeedEmpresarios/>}/>
          <Route path="/research" element={<ResearchersPage/>}/>
          <Route path="/profile" element={<ProfilePage/>}/>
          <Route path="profile/edit/researcher" element={<EditResearcherProfilePage/>}/>
          <Route path="profile/edit/entrepreneur" element={<EditEntrepreneurProfilePage/>}/>
          <Route path="ipfs-viewer" element={<IPFSViewerPage/>}/>
        </Routes>
      </BrowserRouter>
    </UserProvider>
  </React.StrictMode>
)
