import React, { useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";

const CaptainProtectWrapper = ({ children }) => {
  const navigate = useNavigate();
  const token = localStorage.getItem("token");

  useEffect(() => {
    if (!token) {
      navigate("/captain-login");
    }
  }, [token, navigate]);

  return <>{children}</>;
};

export default CaptainProtectWrapper;
