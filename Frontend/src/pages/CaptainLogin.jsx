import React, { useState } from "react";
import { Link } from "react-router-dom";
import driveImage from "../assets/pngwing.com.png";

function CaptainLogin() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [captainData, setCaptainData] = useState({});

  const submitHandler = (e) => {
    e.preventDefault();
    const data = {
      email: email,
      password: password,
    };

    console.log("captainData:", data);
    setCaptainData(data);

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
          <img className="w-13" src={driveImage} alt="Uber-logo-right" />
        </div>

        <form
          onSubmit={(e) => {
            submitHandler(e);
          }}
        >
          <h3 className="text-lg font-medium mb-2">What's Captain's Email ?</h3>
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
          <button className="bg-white flex items-center justify-center font-semibold mb-3 rounded px-4 py-2  w-full text-lg text-black border border-black">
            Login
          </button>

          <p className="text-center font-medium">
            Want to join a fleet?{" "}
            <Link
              to="/captain-signup"
              className="text-[#000000ab] font-semibold"
            >
              Register as a Captain
            </Link>
          </p>
        </form>
      </div>
      <div>
        <Link
          to="/login"
          className="bg-black flex items-center justify-center font-semibold mb-2 rounded px-4 py-2  w-full text-lg text-white border border-black
"
        >
          Sign in as User
        </Link>
      </div>
    </div>
  );
}

export default CaptainLogin;
