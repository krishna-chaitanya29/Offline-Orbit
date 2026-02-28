// src/pages/Logout.jsx
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { disconnectSocket } from "../lib/socket";

const Logout = () => {
  const navigate = useNavigate();

  useEffect(() => {
    disconnectSocket();
    localStorage.removeItem("token");
    localStorage.removeItem("role");
    navigate("/login", { replace: true });
  }, [navigate]);

  return null;
};

export default Logout;
