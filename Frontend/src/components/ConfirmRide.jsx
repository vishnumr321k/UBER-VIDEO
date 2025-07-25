import React from "react";

const ConfirmRide = (props) => {
  const { selectvehicle } = props;

 

  const vehicleImage =
    selectvehicle === "car"
      ? "https://www.uber-assets.com/image/upload/f_auto,q_auto:eco,c_fill,h_538,w_956/v1645186360/assets/c8/6d4555-bd78-4dbc-a3d4-53d527f52f94/original/16x9-transportation-2.png"
      : selectvehicle === "motorcycle"
      ? "https://www.uber-assets.com/image/upload/f_auto,q_auto:eco,c_fill,h_538,w_956/v1698944322/assets/92/00189a-71c0-4f6d-a9de-1b6a85239079/original/UberMoto-India-Orange.png"
      : "https://blog.uber-cdn.com/cdn-cgi/image/width=2160,quality=80,onerror=redirect,format=auto/wp-content/uploads/2025/02/uberauto558x372pixelsdesktop-17393418542179-1024x683.webp";
  return (
    <div>
      <h5
        onClick={() => {
          // props.setVehiclePanel(true);
          props.setConfirmRidePanel(false);
        }}
        className="p-3 text-center absolute  w-[93%] top-0 py-1 cursor-pointer"
      >
        <i className="ri-arrow-down-wide-line text-2xl text-[#0000008a]"></i>
      </h5>
      <h3 className="text-2xl font-semibold mb-3">Confirm your Ride</h3>

      <div className="flex gap-2 justify-between items-center flex-col">
        <img className="h-52" src={vehicleImage} alt={selectvehicle} />
        <div className="w-full mt-5">
          <div className="flex items-center gap-5 p-5 border-b">
            <i className="ri-map-pin-range-line text-xl"></i>

            <div>
              <h3 className="text-lg font-medium"></h3>
              <p className="text-lg -mt-1 text-gray-600">{props.pickup}</p>
            </div>
          </div>
          <div className="flex items-center gap-5 p-5 border-b">
            <i className="ri-map-pin-range-fill text-xl"></i>
            <div className="">
              <h3 className="text-lg font-medium"></h3>
              <p className="text-lg -mt-1 text-gray-600">{props.destination}</p>
            </div>
          </div>
          <div className="flex items-center gap-5 p-5 ">
            <i className="ri-wallet-3-fill text-xl"></i>
            <div className="">
              <h3 className="text-lg font-medium">
                ₹{props.fare[selectvehicle]}
              </h3>
              <p className="text-sm -mt-1 text-gray-600">Cash Cash</p>
            </div>
          </div>
        </div>
        <button
          onClick={() => {
            props.setVehicleFount(true);
            props.setConfirmRidePanel(false);
            props.createRide();
          }}
          className="w-full mt-5 bg-black text-white font-semibold p-2 rounded-lg"
        >
          Confirm
        </button>
      </div>
    </div>
  );
};

export default ConfirmRide;
