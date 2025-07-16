import React from "react";
import { Link, useLocation } from "react-router-dom";


const Riding = () => {
  const useLocations = useLocation();
  const {ride}= useLocations.state || {};
  return (
    <div className="h-screen">
        <Link to= '/home' className="fixed  right-2 top-2 h-10 w-10 bg-white flex items-center justify-center rounded-full">
            <i className="text-lg font-medium ri-home-4-line"></i>
        </Link>
      <div className="h-1/2">
        <img
          className="h-full w-full object-cover"
          src="https://miro.medium.com/v2/resize:fit:1400/0*gwMx05pqII5hbfmX.gif"
          alt="map image"
        />
        <div className="h-1/2 p-5">
          <div className="flex items-center justify-between">
            <img
              className="h-20 -ml-4"
              src="https://www.uber-assets.com/image/upload/f_auto,q_auto:eco,c_fill,h_538,w_956/v1645186360/assets/c8/6d4555-bd78-4dbc-a3d4-53d527f52f94/original/16x9-transportation-2.png"
              alt="car"
            />
            <div className="text-right mr-3">
              <h2 className="text-xl font-medium">{ride?.captain.fullName.firstName + ' ' + ride?.captain.fullName.lastName}</h2>
              <h4 className="text-xl font-semibold -mt-1 -mb-1">
                {ride?.captain.vehicle.plate}
              </h4>
              <p className="text-sm text-gray-600">Car</p>
            </div>
          </div>
          <div className="flex gap-2 justify-between items-center flex-col">
            <div className="w-full mt-5">
              <div className="flex items-center gap-5 p-5 border-b">
                <i className="ri-map-pin-range-line text-xl"></i>

                <div>
                  <h3 className="text-lg font-medium"></h3>
                  <p className="text-sm -mt-1 text-gray-600">
                    {ride?.pickup}
                  </p>
                </div>
              </div>
              <div className="flex items-center gap-5 p-5 border-b">
                <i className="ri-map-pin-range-fill text-xl"></i>
                <div className="">
                  <h3 className="text-lg font-medium"></h3>
                  <p className="text-sm -mt-1 text-gray-600">
                    {ride?.destination}
                  </p>
                </div>
              </div>
              <div className="flex items-center gap-5 p-5 ">
                <i className="ri-wallet-3-fill text-xl"></i>
                <div className="">
                  <h3 className="text-lg font-medium">₹{ride?.fare}</h3>
                  <p className="text-sm -mt-1 text-gray-600">Cash Cash</p>
                </div>
              </div>
            </div>
          </div>
          {/* {ride && (
            <div>
              <h2>Ride ID: {ride.id}</h2>
              <p>Pickup Location: {ride.pickup}</p>
              <p>Destination: {ride.destination}</p>
            </div>
          )} */}
          <button className="w-full mt-5 bg-black cursor-pointer text-white font-semibold p-2 rounded-lg">Make a Payment</button>
        </div>
      </div>
    </div>
  );
};

export default Riding;
