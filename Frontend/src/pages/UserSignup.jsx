import React, { useState, useContext } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from 'axios';
import {UserDataContext} from "../context/UserContext.jsx";

function UserSignup() {
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");


  const navigate = useNavigate();

  const {user, setUser} = useContext(UserDataContext);

  const submitHandler = async (e) => {
    e.preventDefault();
    const newUser = {
      fullName: {
        firstName: firstName,
        lastName: lastName,
      },
      email: email,
      password: password,
    };

    try {
       const response = await axios.post(`${import.meta.env.VITE_BASE_URL}/users/register`, newUser);
      
    if(response.status === 201){
      const data = response.data;

      setUser(data.user);
      
      navigate('/home');
    }
    } catch (error) {
      console.error('Signup failed:', error);
    }
   

    setFirstName("");
    setLastName("");
    setEmail("");
    setPassword("");
  };

  return (
    <div className="p-7 flex flex-col justify-between h-screen">
      <div>
        <div className="flex justify-between items-center mb-10">
          <Link to="/">
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
          <h3 className="text-lg font-medium mb-2">What's your Name</h3>
          <div className="flex gap-2">
            <input
              type="text"
              required
              value={firstName}
              onChange={(e) => {
                setFirstName(e.target.value);
              }}
              className="bg-[#eeeeee] w-1/2 mb-7 rounded px-4 py-2 border-0  text-lg placeholder:text-base font-medium"
              placeholder="First Name"
            />
            <input
              type="text"
              required
              value={lastName}
              onChange={(e) => {
                setLastName(e.target.value);
              }}
              className="bg-[#eeeeee] w-1/2 mb-7 rounded px-4 py-2 border-0  text-lg placeholder:text-base font-medium"
              placeholder="Last Name"
            />
          </div>

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
          <button className="bg-[#111] font-semibold mb-3 rounded px-4 py-2 border-0 w-full text-lg text-white">
            Create account
          </button>

          <p className="text-center font-medium">
            Already have a account here ?{" "}
            <Link to="/login" className="text-[#000000ab] font-semibold">
              Login here
            </Link>
          </p>
        </form>
      </div>
      <div>
        <p className="text-xs text-center text-[#000000ab]">
          By proceeding, you consent to get calls, WhatsApp or SMS message,
          including by autimated means, from Uber and its affiliates to the
          number provided.
        </p>
      </div>
    </div>
  );
}

export default UserSignup;
