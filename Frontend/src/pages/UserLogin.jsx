import React, { useContext, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import { UserDataContext } from "../context/UserContext";

const UserLogin = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  

  const {user, setUser} = useContext(UserDataContext);
  const navigate = useNavigate();

  

  const submitHandler = async (e) => {
    e.preventDefault();
    
    const userData = {
      email:email,
      password: password
    }

    try {
      const response  = await axios.post(`${import.meta.env.VITE_BASE_URL}/users/login`, userData);

      if(response.status === 200){
        const data = response.data;
        setUser(data.user);
        localStorage.setItem('token', data.token)
        navigate('/home');
      }
    } catch (error) {
      console.error('Login failed:', error);
    }
    
    setEmail("");
    setPassword("");
  };

  return (
    <div className="p-7 flex flex-col justify-between h-screen">
      <div>
        <div className="flex justify-between items-center mb-10">
          <Link to= '/'>
            <img
              className="w-16"
              src="https://upload.wikimedia.org/wikipedia/commons/c/cc/Uber_logo_2018.png"
              alt="Uber-logo-left"
            />
          </Link>
        </div>
        <form
          onSubmit={(e) => {
            submitHandler(e);
          }}
        >
          <h3 className="text-lg font-medium mb-2">What's your Email ?</h3>
          <input
            type="email"
            required
            value={email}
            onChange={(e) => {
              setEmail(e.target.value);
            }}
            className="bg-[#eeeeee] mb-7 rounded px-4 py-2 border-0 w-full text-lg placeholder:text-base font-medium"
            placeholder="Email"
          />
          <h3 className="text-lg font-medium mb-2">Enter Password</h3>
          <input
            type="password"
            required
            value={password}
            onChange={(e) => {
              setPassword(e.target.value);
            }}
            className="bg-[#eeeeee] mb-7 rounded px-4 py-2 border-0 w-full text-lg placeholder:text-base font-medium"
            placeholder="Password"
          />
          <button className="bg-[#111] font-semibold mb-7 rounded px-4 py-2 border-0 w-full text-lg text-white">
            Login
          </button>

          <p className="text-center font-medium">
            New here ?{" "}
            <Link to="/signup" className="text-[#000000ab] font-semibold">
              Create new Account
            </Link>
          </p>
        </form>
      </div>
      <div>
        <Link
          to="/captain-signup"
          className="bg-white flex items-center justify-center font-semibold mb-2 rounded px-4 py-2  w-full text-lg text-black border border-black
"
        >
          Sign in as Captain
        </Link>
      </div>
    </div>
  );
};

export default UserLogin;
