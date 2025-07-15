import React from "react";

const VehiclePanel = (props) => {
  return (
    <div>
      <h5
        onClick={() => {
          props.setVehiclePanel(false);
          props.setVehicleType(true);
        }}
        className="p-3 text-center absolute  w-[93%] top-0 py-1 cursor-pointer"
      >
        <i className="ri-arrow-down-wide-line text-2xl text-[#0000008a]"></i>
      </h5>
      <h3 className="text-2xl font-semibold mb-3">Choose a Vehicle</h3>
      <div
        onClick={() => {
          props.setConfirmRidePanel(true);
          props.setVehiclePanel(false);
          props.selectvehicle("car");
        }}
        className="flex w-full  border-2 mb-3 cursor-pointer border-gray-100 active:border-black   rounded-xl items-center justify-between"
      >
        <img
          className="h-20 w-28 object-contain ml-2"
          src="https://www.uber-assets.com/image/upload/f_auto,q_auto:eco,c_fill,h_368,w_552/v1555367310/assets/30/51e602-10bb-4e65-b122-e394d80a9c47/original/Final_UberX.png"
          alt="car"
        />
        <div className=" w-1/2">
          <h4 className=" text-base font-bold">
            UberGo
            <span>
              <i className="ri-user-fill mr-0.5"></i>4
            </span>
          </h4>
          <h5 className="font-semibold text-sm">2 min away</h5>
          <p className="font-normal text-xs text-[#000000d3]">
            Affordable, Compact rides
          </p>
        </div>
        <h2 className="text-lg font-semibold mr-3">₹{props.fare.car}</h2>
      </div>
      <div
        onClick={() => {
          props.setConfirmRidePanel(true);
          props.selectvehicle("motorcycle");
        }}
        className="flex w-full border-2 cursor-pointer border-gray-100 active:border-black   mb-3 rounded-xl items-center justify-between"
      >
        <img
          className="h-20 w-28 object-contain ml-2"
          src="https://www.uber-assets.com/image/upload/f_auto,q_auto:eco,c_fill,h_538,w_956/v1698944322/assets/92/00189a-71c0-4f6d-a9de-1b6a85239079/original/UberMoto-India-Orange.png"
          alt="bike"
        />
        <div className="ml-2 w-1/2">
          <h4 className=" text-base font-bold">
            Moto
            <span>
              <i className="ri-user-fill mr-0.5"></i>1
            </span>
          </h4>
          <h5 className="font-semibold text-sm">3 min away</h5>
          <p className="font-normal text-xs text-[#000000d3]">
            Affordable, Motorcycle rides
          </p>
        </div>
        <h2 className="text-lg font-semibold mr-3">
          ₹{props.fare.motorcycle}
        </h2>
      </div>
      <div
        onClick={() => {
          props.setConfirmRidePanel(true);
          props.selectvehicle("auto");
        }}
        className="flex  w-full border-2 cursor-pointer border-gray-100 active:border-black  mb-3 rounded-xl items-center justify-between"
      >
        <img
          className="h-20 w-28 object-contain ml-2"
          src="https://blog.uber-cdn.com/cdn-cgi/image/width=2160,quality=80,onerror=redirect,format=auto/wp-content/uploads/2025/02/uberauto558x372pixelsdesktop-17393418542179-1024x683.webp"
          alt="Auto"
        />
        <div className=" w-1/2">
          <h4 className=" text-base font-bold">
            UberAuto
            <span>
              <i className="ri-user-fill mr-0.5"></i>3
            </span>
          </h4>
          <h5 className="font-semibold text-sm">2 min away</h5>
          <p className="font-normal text-xs text-[#000000d3]">
            Affordable, Auto rides
          </p>
        </div>
        <h2 className="text-lg font-semibold mr-3">₹{props.fare.auto}</h2>
      </div>
    </div>
  );
};

export default VehiclePanel;
