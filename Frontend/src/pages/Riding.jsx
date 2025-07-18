import React, { useContext, useEffect } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { SocketContext } from "../context/SocketContext";
import LiveTracking from "../components/LiveTracking";

const Riding = () => {
  const useLocations = useLocation();
  const { ride } = useLocations.state || {};
  const { socket } = useContext(SocketContext);
  const navigate = useNavigate();

  useEffect(() => {
    if(!socket){
      return
    }

    const handleRideEnded = () => {
      console.log('ride-ended event received');
      navigate('/home');
    }

    socket.on('ride-ended', handleRideEnded);
    
    return () => {
      socket.off('ride-ended', handleRideEnded);
    };
  }, [socket, navigate]);

  return (
    <div className="h-screen relative overflow-hidden">
      {/* Home button - highest z-index */}
      <Link
        to="/home"
        className="fixed right-2 top-2 h-10 w-10 bg-white flex items-center justify-center rounded-full z-50 shadow-lg"
      >
        <i className="text-lg font-medium ri-home-4-line"></i>
      </Link>

      {/* Map container - full screen */}
      <div className="absolute top-0 left-0 right-0 bottom-0 z-10">
        <LiveTracking className="w-full h-full" />
      </div>

      {/* Ride details container - higher z-index than map */}
      <div className="absolute bottom-0 left-0 right-0 h-1/2 bg-white rounded-t-3xl shadow-2xl z-20">
        <div className="p-5 h-full flex flex-col">
          {/* Header section - fixed */}
          <div className="flex items-center justify-between flex-shrink-0">
            <img
              className="h-16 -ml-4"
              src="https://www.uber-assets.com/image/upload/f_auto,q_auto:eco,c_fill,h_538,w_956/v1645186360/assets/c8/6d4555-bd78-4dbc-a3d4-53d527f52f94/original/16x9-transportation-2.png"
              alt="car"
            />
            <div className="text-right mr-3">
              <h2 className="text-lg font-medium">
                {ride?.captain.fullName.firstName +
                  " " +
                  ride?.captain.fullName.lastName}
              </h2>
              <h4 className="text-lg font-semibold -mt-1 -mb-1">
                {ride?.captain.vehicle.plate}
              </h4>
              <p className="text-sm text-gray-600">Car</p>
            </div>
          </div>

          {/* Scrollable content area */}
          <div className="flex-1 mt-4 overflow-y-auto">
            <div className="flex items-center gap-4 p-4 border-b">
              <i className="ri-map-pin-range-line text-lg"></i>
              <div>
                <h3 className="text-base font-medium"></h3>
                <p className="text-sm -mt-1 text-gray-600">{ride?.pickup}</p>
              </div>
            </div>
            <div className="flex items-center gap-4 p-4 border-b">
              <i className="ri-map-pin-range-fill text-lg"></i>
              <div className="">
                <h3 className="text-base font-medium"></h3>
                <p className="text-sm -mt-1 text-gray-600">
                  {ride?.destination}
                </p>
              </div>
            </div>
            <div className="flex items-center gap-4 p-4">
              <i className="ri-wallet-3-fill text-lg"></i>
              <div className="">
                <h3 className="text-base font-medium">₹{ride?.fare}</h3>
                <p className="text-sm -mt-1 text-gray-600">Cash Cash</p>
              </div>
            </div>
          </div>

          {/* Button section - fixed at bottom */}
          <div className="flex-shrink-0 pt-4">
            <button className="w-full bg-black cursor-pointer text-white font-semibold p-3 rounded-xl">
              Make a Payment
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Riding;