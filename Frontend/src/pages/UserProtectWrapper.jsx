import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";

const UserProtectWrapper = ({ children }) => {
  const navigate = useNavigate();
  const token = localStorage.getItem('token');

  useEffect(() => {
    

    if(!token){
      navigate('/login');
    }
  }, [token, navigate]);

  return <>{children}</>;
};

export default UserProtectWrapper;
