import React from "react";
import { Link } from "react-router-dom";

function UserLogin() {
  return (
    <div className="p-7 flex flex-col justify-between h-screen">
      <div>
        <img
          className="w-16 mb-10"
          src="https://upload.wikimedia.org/wikipedia/commons/c/cc/Uber_logo_2018.png"
          alt="Uber-logo-image"
        />
        <form>
          <h3 className="text-lg font-medium mb-2">What's your Email ?</h3>
          <input
            type="email"
            required
            className="bg-[#eeeeee] mb-7 rounded px-4 py-2 border-0 w-full text-lg placeholder:text-base font-medium"
            placeholder="Email"
          />
          <h3 className="text-lg font-medium mb-2">Enter Password</h3>
          <input
            type="password"
            required
            className="bg-[#eeeeee] mb-7 rounded px-4 py-2 border-0 w-full text-lg placeholder:text-base font-medium"
            placeholder="Password"
          />
          <button className="bg-[#111] font-semibold mb-7 rounded px-4 py-2 border-0 w-full text-lg text-white">
            Login
          </button>
          
          <p className="text-center font-medium">New here ? <Link to= '/signup' className="text-[#000000ab] font-semibold">Create new Account</Link></p>
        </form>
      </div>
      <div>
        <button
          className="bg-white font-semibold mb-7 rounded px-4 py-2  w-full text-lg text-black border border-black
"
        >
          Sign in as Captain
        </button>
      </div>
    </div>
  );
}

export default UserLogin;
