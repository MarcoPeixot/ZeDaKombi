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
        </Routes>
      </BrowserRouter>
    </UserProvider>
  </React.StrictMode>
)
