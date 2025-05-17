import React, { useContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { UserDataContext } from "../context/UserContext";
import axios from "axios";

const UserProtectWrapper = ({ children }) => {
  const navigate = useNavigate();
  const token = localStorage.getItem("token");
  const { user, setUser } = useContext(UserDataContext);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    if (!token) {
      navigate("/login");
    }
    axios.get(`${import.meta.env.VITE_BASE_URL}/users/profile`, {
      headers:{
        Authorization: `Bearer ${token}`
      }
    })
    .then(respnose => {
      if(respnose.status === 200){
        const data = respnose.data;
        setUser(data.user);
        setIsLoading(false)
      }
    })
    .catch(err => {
      console.log(err);
      localStorage.removeItem('token');
      navigate('/login')
    })
  }, [token]);

  if (isLoading) {
    return <>Loading...</>;
  }

  return <>{children}</>;
};

export default UserProtectWrapper;
