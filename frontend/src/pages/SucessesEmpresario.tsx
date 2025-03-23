import { useEffect } from "react";
import { useNavigate } from "react-router-dom";

export function SuccessEmpresario() {
  const navigate = useNavigate();

  useEffect(() => {
    const role = localStorage.getItem("role");
    if (role === "empresario") {
      navigate("/feed-empresarios");
    } else {
      navigate("/");
    }
  }, []);

  return <p>Redirecionando para o Feed de Empresários...</p>;
}
