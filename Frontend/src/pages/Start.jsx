import React from "react";
import { Link } from "react-router-dom";
import bgImage from "../assets/bg.jpg";

function Start() {
  return (
    <div className="relative h-screen w-full overflow-hidden">
      <div
        className="absolute inset-0 bg-cover bg-center"
        style={{ backgroundImage: `url(${bgImage})` }}
      />
      
      <div className="relative h-full flex flex-col justify-between">
        {/* Header */}
        <div className="pt-8 px-8">
          <Link to="/">
            <img
              className="w-16 md:w-20"
              src="https://upload.wikimedia.org/wikipedia/commons/c/cc/Uber_logo_2018.png"
              alt="Uber-logo"
            />
          </Link>
        </div>
        
        {/* Bottom Card */}
        <div className="bg-white w-full px-6 py-8 rounded-t-3xl shadow-lg">
          <h2 className="text-2xl font-bold mb-6">Get Started with Uber</h2>
          <Link
            to="/login"
            className="flex items-center justify-center w-full bg-black text-white py-3.5 rounded font-medium hover:bg-gray-800 transition-colors duration-200"
          >
            Continue
          </Link>
        </div>
      </div>
    </div>
  );
}

export default Start;