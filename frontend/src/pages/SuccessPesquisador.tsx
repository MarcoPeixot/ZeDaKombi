import { useEffect } from "react";
import { useNavigate } from "react-router-dom";

export function SuccessPesquisador() {
  const navigate = useNavigate();

  useEffect(() => {
    const role = localStorage.getItem("role");
    if (role === "pesquisador") {
      navigate("/feed-pesquisador");
    } else {
      navigate("/");
    }
  }, []);

  return <p>Redirecionando para o Feed de Pesquisador...</p>;
}
