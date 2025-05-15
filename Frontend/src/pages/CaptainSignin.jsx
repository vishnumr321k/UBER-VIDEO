import React, { useContext, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import driveImage from "../assets/pngwing.com.png";
import { CaptainDataContext } from "../context/CaptainContext.jsx";
import axios from "axios";

const CaptainSignin = () => {
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [vehicleColor, setVehicleColor] = useState("");
  const [vehiclePlate, setVehiclePlate] = useState("");
  const [vehicleCapacity, setVehicleCaptacity] = useState("");
  const [vehicleType, setVehicleType] = useState("");

  const navigate = useNavigate();
  const { captain, setCaptain } = useContext(CaptainDataContext);

  const submitHandler = async (e) => {
    e.preventDefault();
    const newCaptain = {
      fullName: {
        firstName: firstName,
        lastName: lastName,
      },
      email: email,
      password: password,
      vehicle: {
        color: vehicleColor,
        plate: vehiclePlate,
        capacity: Number(vehicleCapacity),
        vehicleType: vehicleType,
      },
    };

    console.log('captain Type:', typeof(newCaptain.vehicle.capacity));

    try {

      console.log('bvaiskjdbhfkh')
      const response = await axios.post(
        `${import.meta.env.VITE_BASE_URL}/captians/register`,
        newCaptain
      );

      console.log(response)
      if (response.status === 200) {
        const data = response.data;

        setCaptain(data.captain);

        localStorage.setItem('token', data.token);

        navigate("/captain-home");
      }
    } catch (error) {
      console.error("captain Signup issue...", error);
    }

    setFirstName("");
    setLastName("");
    setEmail("");
    setPassword("");
    setVehicleColor('');
    setVehiclePlate('');
    setVehicleCaptacity('');
    setVehicleType('');
  };
  return (
    <div className="p-7 flex flex-col justify-between h-screen">
      <div>
        <div className="flex justify-between items-center mb-5">
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
          <h3 className="text-lg font-medium mb-2">Vehicle Information</h3>
          <div className="flex gap-2">
            <input
              type="text"
              required
              value={vehicleColor}
              onChange={(e) => setVehicleColor(e.target.value)}
              className="bg-[#eeeeee] w-1/2 mb-7 rounded px-4 py-2 border-0 text-lg placeholder:text-base font-medium"
              placeholder="Vehicle Color"
            />
            <input
              type="text"
              required
              value={vehiclePlate}
              onChange={(e) => setVehiclePlate(e.target.value)}
              className="bg-[#eeeeee] w-1/2 mb-7 rounded px-4 py-2 border-0 text-lg placeholder:text-base font-medium"
              placeholder="Vehicle Plate Number"
            />
          </div>
          <div className="flex gap-2">
            <input
              type="number"
              required
              value={vehicleCapacity}
              onChange={(e) => setVehicleCaptacity(e.target.value)}
              className="bg-[#eeeeee] w-1/2 mb-7 rounded px-4 py-2 border-0 text-lg placeholder:text-base font-medium"
              placeholder="Vehicle Capacity"
            />
            <select
              required
              value={vehicleType}
              onChange={(e) => setVehicleType(e.target.value)}
              className="bg-[#eeeeee] w-1/2 mb-7 rounded px-4 py-2 border-0 text-lg font-medium text-gray-700"
            >
              <option value="" disabled>
                Select Vehicle Type
              </option>
              <option value="car">Car</option>
              <option value="motorcycle">Bike</option>
              <option value="auto">Auto</option>
            </select>
          </div>

          <button className="bg-[#111] font-semibold mb-3 rounded px-4 py-2 border-0 w-full text-lg text-white hover:bg-white">
            Create Captain Account
          </button>

          <p className="text-center font-medium">
            Already have a account here ?{" "}
            <Link
              to="/captain-login"
              className="text-[#000000ab] font-semibold"
            >
              Login here
            </Link>
          </p>
        </form>
      </div>
      <div className="mt-5">
        <p className="text-xs text-center text-[#000000ab]">
          This site is protected by reCAPTCHA and the{" "}
          <span className="underline font-bold">Google Privacy Policy</span> and{" "}
          <span className="underline font-bold">Terms of Service</span> apply.
        </p>
      </div>
    </div>
  );
};

export default CaptainSignin;
