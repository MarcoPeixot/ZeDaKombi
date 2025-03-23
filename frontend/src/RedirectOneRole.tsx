// src/components/RedirectOnRole.tsx
import { useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { useAuth } from "../src/context/auth-context";

export const RedirectOnRole = () => {
  const { role } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    if (location.pathname === "/" || location.pathname === "/login") {
      if (role === "pesquisador") {
        navigate("/feed-pesquisador");
      } else if (role === "empresario") {
        navigate("/feed-empresarios");
      }
    }
  }, [role, location.pathname]);

  return null;
};
