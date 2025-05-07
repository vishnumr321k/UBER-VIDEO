import React from "react";
import { Link } from "react-router-dom";
import bgImage from "../assets/bg.jpg"; // Rename your image file if needed

function Home() {
  return (
    <div>
      <div
        className="h-screen pt-8 flex justify-between flex-col w-full bg-cover bg-center"
        style={{ backgroundImage: `url(${bgImage})` }}
      >
        <Link>
        <img
          className="w-16 ml-8"
          src="https://upload.wikimedia.org/wikipedia/commons/c/cc/Uber_logo_2018.png"
          alt="Uber-logo"
        />
        </Link>
        
        <div className="bg-white pb-7 py-4 px-4">
          <h2 className="text-2xl font-bold">Get Started with Uber</h2>
          <Link
            to="/login"
            className="flex items-center justify-center w-full bg-black text-white py-3 rounded mt-5"
          >
            Continue
          </Link>
        </div>
      </div>
    </div>
  );
}

export default Home;
