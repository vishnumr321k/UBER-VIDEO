import React from "react";

const WaitingForDriver = (props) => {
  return (
    <div>
      <h5
        onClick={() => {
          props.setWaitingForDriver(false)
       
        }}
        className="p-3 text-center absolute  w-[93%] top-0 py-1 cursor-pointer"
      >
        <i className="ri-arrow-down-wide-line text-2xl text-[#0000008a]"></i>
      </h5>

      <div className="flex items-center justify-between">
        <img
          className="h-30 -ml-4"
          src="https://www.uber-assets.com/image/upload/f_auto,q_auto:eco,c_fill,h_538,w_956/v1645186360/assets/c8/6d4555-bd78-4dbc-a3d4-53d527f52f94/original/16x9-transportation-2.png"
          alt="car"
        />
        <div className="text-right mr-3">
          <h2 className="text-xl font-medium">Pranave</h2>
          <h4 className="text-xl font-semibold -mt-1 -mb-1">KL 52 A 6669</h4>
          <p className="text-sm text-gray-600">BMW M5</p>
        </div>
      </div>
      <div className="flex gap-2 justify-between items-center flex-col">
        <div className="w-full mt-5">
          <div className="flex items-center gap-5 p-5 border-b">
            <i className="ri-map-pin-range-line text-xl"></i>

            <div>
              <h3 className="text-lg font-medium">562/11-A</h3>
              <p className="text-sm -mt-1 text-gray-600">
                East Nada, Guruvayur Temple, Guruvayur
              </p>
            </div>
          </div>
          <div className="flex items-center gap-5 p-5 border-b">
            <i className="ri-map-pin-range-fill text-xl"></i>
            <div className="">
              <h3 className="text-lg font-medium">570/21-A</h3>
              <p className="text-sm -mt-1 text-gray-600">
                Kottapadi Center, Guruvayur
              </p>
            </div>
          </div>
          <div className="flex items-center gap-5 p-5 ">
            <i className="ri-wallet-3-fill text-xl"></i>
            <div className="">
              <h3 className="text-lg font-medium">₹193.20</h3>
              <p className="text-sm -mt-1 text-gray-600">Cash Cash</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default WaitingForDriver;
