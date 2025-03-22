import React from "react"
import ReactDOM from "react-dom/client"
import { BrowserRouter, Routes, Route } from "react-router-dom"
import "./index.css"
import { UserProvider } from "./context/user-context"
import LoginPage from "./pages/login"
import Feed from "./pages/feed"

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <UserProvider>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<LoginPage />} />
          <Route path="/feed" element={<Feed />} />
        </Routes>
      </BrowserRouter>
    </UserProvider>
  </React.StrictMode>
)
