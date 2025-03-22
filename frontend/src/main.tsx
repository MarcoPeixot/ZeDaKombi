import React from "react"
import ReactDOM from "react-dom/client"
import { BrowserRouter, Routes, Route } from "react-router-dom"
import "./index.css"
import { UserProvider } from "./context/user-context"
import LoginPage from "./pages/login"
import Feed from "./pages/feed"
import SubmitArticlePage from "./pages/articles/submit"
import CreatePostPage from "./pages/articles/create-post"

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <UserProvider>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<LoginPage />} />
          <Route path="/feed" element={<Feed />} />
          <Route path="/submit" element={<SubmitArticlePage />} />
          <Route path="/create-post" element={<CreatePostPage />} />
        </Routes>
      </BrowserRouter>
    </UserProvider>
  </React.StrictMode>
)
