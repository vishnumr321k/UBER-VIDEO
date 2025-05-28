import React from "react";
import {Link} from 'react-router-dom';
const ConfirmRidePopup = (props) => {
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
      <h3 className="text-2xl font-semibold">Confirm this ride to Start.</h3>
      <div className="flex items-center justify-between p-3 bg-gray-100 border rounded-lg mt-4">
        <div className="flex items-center gap-3 ">
          <img
            className="h-12 w-12 object-cover rounded-full"
            src="https://mir-s3-cdn-cf.behance.net/project_modules/1400/570a1745898621.58408191aee7a.jpg"
            alt="user image"
          />
          <h2 className="text-xl font-medium">Vishnu</h2>
        </div>
        <h5 className="text-lg font-semibold">2.2 KM</h5>
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
        <Link to='/captain-riding' className="w-full mt-5 bg-black border flex justify-center hover:bg-white  text-white hover:text-black  font-semibold p-2 rounded-lg">
          Confirm
        </Link>
        <button
          onClick={() => {
            props.setRidePopupPanel(false);
            props.setConfirmRidePopupPanel(false);
          }}
          className="w-full mt-1 bg-white border hover:bg-black  text-black hover:text-white font-semibold p-2 rounded-lg"
        >
          Cancel
        </button>
      </div>
    </div>
  );
};

export default ConfirmRidePopup;
