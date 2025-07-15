import React, { useContext, useRef, useState, useEffect } from "react";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import "remixicon/fonts/remixicon.css";
import LocationSearchPanel from "../components/LocationSearchPanel";
import VehiclePanel from "../components/VehiclePanel";
import ConfirmRide from "../components/ConfirmRide";
import LookingForDriver from "../components/LookingForDriver";
import WaitingForDriver from "../components/WaitingForDriver";
import axios from "axios";
import { SocketContext } from "../context/SocketContext";
import { UserDataContext } from "../context/UserContext";

const Home = () => {
  const [pickup, setPickup] = useState("");
  const [destination, setDestination] = useState("");
  const [panelOpen, setPanelOpen] = useState(false);
  const [vehiclePanel, setVehiclePanel] = useState(false);
  const [confirmRidePanel, setConfirmRidePanel] = useState(false);
  const [vehicleFount, setVehicleFount] = useState(false);
  const [waitingForDriver, setWaitingForDriver] = useState(false);
  const [pickupSuggestions, setPickupSuggestions] = useState([]);
  const [destinationSuggestions, setDestinationSuggestions] = useState([]);
  const [activeField, setActiveField] = useState(null);
  const [fare, setFare] = useState({});
  const [vehicleType, setVehicleType] = useState(null);
  // const [passenger, setPassenger] = useState(null);
  const [ride, setRide] = useState(null);

  const vehiclePanelRef = useRef(null);
  const panelRef = useRef(null);
  const panelCloseRef = useRef(null);
  const confirmRidePanelRef = useRef(null);
  const vehicleFountRef = useRef(null);
  const waitinForDrivingRef = useRef(null);

  const { socket } = useContext(SocketContext);
  const { user } = useContext(UserDataContext);

  socket.on("ride-confirmed", (ride) => {
    setVehicleFount(false);
    setWaitingForDriver(true);
    setRide(ride);
  });

  useEffect(() => {
    if (user) {
      socket.emit("join", { userType: "user", userId: user._id });
    }
  }, [user]);

  const handlePickupChage = async (e) => {
    setPickup(e.target.value);

    try {
      const response = await axios.get(
        `${import.meta.env.VITE_BASE_URL}/maps/get-suggestions`,
        {
          params: {
            input: e.target.value,
          },
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      );
      setPickupSuggestions(response.data.suggestions);
    } catch (error) {
      console.log(error);
    }
  };

  const handleDestinationChange = async (e) => {
    setDestination(e.target.value);

    try {
      const response = await axios.get(
        `${import.meta.env.VITE_BASE_URL}/maps/get-suggestions`,
        {
          params: {
            input: e.target.value,
          },
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      );
      setDestinationSuggestions(response.data.suggestions);
    } catch (error) {
      console.log(error);
    }
  };

  const submitHandler = (e) => {
    e.preventDefault();
  };

  useGSAP(
    function () {
      if (panelOpen) {
        gsap.to(panelRef.current, {
          height: "70%",
          padding: 20,
          // opacity: 1
        });
        gsap.to(panelCloseRef.current, {
          opacity: 1,
        });
      } else {
        gsap.to(panelRef.current, {
          height: "0%",
          padding: 0,
          // opacity: 0
        });
        gsap.to(panelCloseRef.current, {
          opacity: 0,
        });
      }
    },
    [panelOpen]
  );

  useGSAP(() => {
    if (vehiclePanel) {
      gsap.to(vehiclePanelRef.current, {
        transform: "translateY(0)",
      });
    } else {
      gsap.to(vehiclePanelRef.current, {
        transform: "translateY(100%)",
      });
    }
  }, [vehiclePanel]);

  useGSAP(() => {
    if (confirmRidePanel) {
      gsap.to(confirmRidePanelRef.current, {
        transform: "translateY(0)",
      });
    } else {
      gsap.to(confirmRidePanelRef.current, {
        transform: "translateY(100%)",
      });
    }
  }, [confirmRidePanel]);

  useGSAP(() => {
    if (vehicleFount) {
      gsap.to(vehicleFountRef.current, {
        transform: "translateY(0)",
      });
    } else {
      gsap.to(vehicleFountRef.current, {
        transform: "translateY(100%)",
      });
    }
  }, [vehicleFount]);

  useGSAP(() => {
    if (waitingForDriver) {
      gsap.to(waitinForDrivingRef.current, {
        transform: "translateY(0)",
      });
    } else {
      gsap.to(waitinForDrivingRef.current, {
        transform: "translateY(100%)",
      });
    }
  }, [waitingForDriver]);

  async function findTrip() {
    setVehiclePanel(true);
    setPanelOpen(false);

    const response = await axios.get(
      `${import.meta.env.VITE_BASE_URL}/rides/get-fare`,
      {
        params: {
          pickup: pickup,
          destination: destination,
        },
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      }
    );

    
    setFare(response.data.fare.fare);
  }

  async function createRide() {
    try {
      const response = await axios.post(
        `${import.meta.env.VITE_BASE_URL}/rides/create`,
        {
          pickup,
          destination,
          vehicleType,
        },
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      );
    } catch (error) {
      console.log(error);
    }
  }

  return (
    <div className="h-screen relative overflow-hidden">
      <img
        className="w-16 absolute left-5 top-5"
        src="https://upload.wikimedia.org/wikipedia/commons/c/cc/Uber_logo_2018.png"
        alt="Uber Logo"
      />

      <div className="h-screen w-screen">
        {/* image for temporary use */}
        <img
          className="h-full w-full object-cover"
          src="https://miro.medium.com/v2/resize:fit:1400/0*gwMx05pqII5hbfmX.gif"
          alt="map image"
        />
      </div>
      <div className=" h-screen absolute top-0 w-full flex flex-col justify-end">
        <div className="max-h-[70%] p-5 bg-white rounded-t-3xl relative overflow-y-auto">
          <h5
            ref={panelCloseRef}
            onClick={() => {
              setPanelOpen(false);
            }}
            className="absolute opacity-0 right-6 top-4 text-2xl"
          >
            <i className="ri-arrow-down-wide-line"></i>
          </h5>
          <h4 className="text-2xl font-semibold">Find a trip</h4>
          <form onSubmit={submitHandler}>
            <div className="relative mt-5">
              <i className="ri-map-pin-3-line absolute left-3 top-1/2 -translate-y-1/2 text-xl text-gray-600"></i>
              <input
                onClick={() => {
                  setPanelOpen(true);
                  setActiveField("pickup");
                }}
                value={pickup}
                onChange={handlePickupChage}
                className="bg-[#eee] px-8 py-2 text-lg rounded-lg w-full pl-10"
                type="text"
                placeholder="Add a pick-up location"
              />
            </div>
            <div className="relative mt-3">
              <i className="ri-map-pin-4-fill absolute left-3 top-1/2 -translate-y-1/2 text-xl text-gray-600"></i>
              <input
                onClick={() => {
                  setPanelOpen(true);
                  setActiveField("destination");
                }}
                value={destination}
                onChange={handleDestinationChange}
                className="bg-[#eee] px-8 py-2 text-lg rounded-lg w-full pl-10"
                type="text"
                placeholder="Enter your destination"
              />
            </div>
          </form>

          <button
            onClick={findTrip}
            className="mt-5 bg-black border w-full  text-white   font-semibold p-3 px-10  rounded-lg"
          >
            Find Trip
          </button>
        </div>
        <div ref={panelRef} className="bg-white h-0 overflow-y-auto">
          <LocationSearchPanel
            suggestions={
              activeField === "pickup"
                ? pickupSuggestions
                : destinationSuggestions
            }
            setPanelOpen={setPanelOpen}
            vehiclePanel={vehiclePanel}
            setVehiclePanel={setVehiclePanel}
            setPickup={setPickup}
            setDestination={setDestination}
            activeField={activeField}
          />
        </div>
      </div>
      <div
        ref={vehiclePanelRef}
        className="fixed w-full z-10 bottom-0 translate-y-full bg-white px-3 py-12 rounded-2xl"
      >
        <VehiclePanel
          setConfirmRidePanel={setConfirmRidePanel}
          setVehiclePanel={setVehiclePanel}
          setPanelOpen={setPanelOpen}
          fare={fare}
          // createRide = {createRide}
          selectvehicle={setVehicleType}
        />
      </div>
      <div
        ref={confirmRidePanelRef}
        className="fixed w-full z-10 bottom-0 translate-y-full bg-white px-3 py-12 rounded-2xl"
      >
        <ConfirmRide
          setVehiclePanel={setVehiclePanel}
          setConfirmRidePanel={setConfirmRidePanel}
          setVehicleFount={setVehicleFount}
          createRide={createRide}
          pickup={pickup}
          destination={destination}
          fare={fare}
          selectvehicle={vehicleType}
          // passenger= {passenger}
        />
      </div>
      <div
        ref={vehicleFountRef}
        className="fixed w-full z-10 bottom-0 translate-y-full bg-white px-3 py-12 rounded-2xl"
      >
        <LookingForDriver
          setVehicleFount={setVehicleFount}
          setConfirmRidePanel={setConfirmRidePanel}
          pickup={pickup}
          destination={destination}
          fare={fare}
          selectvehicle={vehicleType}
        />
      </div>
      <div
        ref={waitinForDrivingRef}
        className="fixed w-full z-10 bottom-0  bg-white px-3 py-12 rounded-2xl"
      >
        <WaitingForDriver
          ride={ride}
          setVehicleFount={setVehicleFount}
          setWaitingForDriver={setWaitingForDriver}
          waitingForDriver={waitinForDrivingRef}
        />
      </div>
    </div>
  );
};

export default Home;
