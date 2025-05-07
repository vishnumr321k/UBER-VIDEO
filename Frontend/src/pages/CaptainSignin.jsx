import React, { useState } from "react";
import { Link } from "react-router-dom";
import driveImage from '../assets/pngwing.com.png'

function CaptainSignin() {
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [captainData, setCaptainData] = useState({});

  const submitHandler = (e) => {
    e.preventDefault();
    const data = {
      fullName: {
        firstName: firstName,
        lastName: lastName,
      },
      email: email,
      password: password,
    };

    console.log("Captain Data:", data);
    setCaptainData(data);

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
          <img className="w-13" src={driveImage} alt="Uber-logo-right" />
        </div>
        <form
          onSubmit={(e) => {
            submitHandler(e);
          }}
        >
          <h3 className="text-lg font-medium mb-2">What's Captain's Name</h3>
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
          <button className="bg-[#111] font-semibold mb-3 rounded px-4 py-2 border-0 w-full text-lg text-white hover:bg-white">
            Sign up
          </button>

          <p className="text-center font-medium">
            Already have a account here ?{" "}
            <Link
              to="/captain-login"
              className="text-[#000000ab] font-semibold"
            >
              Captain Login here
            </Link>
          </p>
        </form>
      </div>
      <div>
        <p className="text-xs text-center text-[#000000ab]">
          This site is protected by reCAPTCHA and the{" "}
          <span className="underline font-bold">Google Privacy Policy</span> and{" "}
          <span className="underline font-bold">Terms of Service</span> apply.
        </p>
      </div>
    </div>
  );
}

export default CaptainSignin;
