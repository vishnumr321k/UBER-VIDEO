import React from "react";

const RidePopUp = (props) => {
  return (
    <div>
      <h5
        onClick={() => {
          props.setRidePopupPanel(false);
        }}
        className="p-3 text-center absolute  w-[93%] top-0 py-1 cursor-pointer"
      >
        <i className="ri-arrow-down-wide-line text-2xl text-[#0000008a]"></i>
      </h5>
      <h3 className="text-2xl font-semibold">New Ride Available!</h3>
      <div className="flex items-center justify-between p-3 bg-gray-100 border rounded-lg mt-4">
        <div className="flex items-center gap-3 ">
          <img
            className="h-12 w-12 object-cover rounded-full"
            src="https://mir-s3-cdn-cf.behance.net/project_modules/1400/570a1745898621.58408191aee7a.jpg"
            alt="user image"
          />
          <h2 className="text-xl font-medium">{props.ride?.user.fullName.firstName + ' ' + props.ride?.user.fullName.lastName}</h2>
        </div>
        <h5 className="text-lg font-semibold">{props.ride?.distance} KM</h5>
      </div>
      <div className="flex gap-2 justify-between items-center flex-col">
        <div className="w-full mt-5">
          <div className="flex items-center gap-5 p-5 border-b">
            <i className="ri-map-pin-range-line text-xl"></i>

            <div>
              <h3 className="text-lg font-medium"></h3>
              <p className="text-sm -mt-1 text-gray-600">
                {props.ride?.pickup}
              </p>
            </div>
          </div>
          <div className="flex items-center gap-5 p-5 border-b">
            <i className="ri-map-pin-range-fill text-xl"></i>
            <div className="">
              <h3 className="text-lg font-medium"></h3>
              <p className="text-sm -mt-1 text-gray-600">
                {props.ride?.destination}
              </p>
            </div>
          </div>
          <div className="flex items-center gap-5 p-5 ">
            <i className="ri-wallet-3-fill text-xl"></i>
            <div className="">
              <h3 className="text-lg font-medium">₹{props.ride?.fare}</h3>
              <p className="text-sm -mt-1 text-gray-600">Cash Cash</p>
            </div>
          </div>
        </div>
        <div className="flex gap-2 w-full items-center justify-between">
           <button
            onClick={() => {
              props.setRidePopupPanel(false);
            }}
            className="w-full mt-5  bg-white border hover:bg-black  text-black hover:text-white font-semibold p-3 px-8 rounded-lg"
          >
            Ignor
          </button>
          <button
            onClick={() => {
              props.setConfirmRidePopupPanel(true);
              props.confirmRide();
            }}
            className="w-full mt-5 bg-black border hover:bg-white  text-white hover:text-black  font-semibold p-3 px-8  rounded-lg"
          >
            Accept
          </button>
         
        </div>
      </div>
    </div>
  );
};

export default RidePopUp;
