import React, { useRef, useState } from "react";
import { Link } from "react-router-dom";
import FinishRide from "../components/FinishRide";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";

const CaptainRiding = (props) => {
  const [finishRidePanel, setFinishRidePanel] = useState(false);
  const finishRidePanelRef = useRef(null);

  useGSAP(() => {
    if (finishRidePanel) {
      gsap.to(finishRidePanelRef.current, {
        transform: "translateY(0)",
      });
    } else {
      gsap.to(finishRidePanelRef.current, {
        transform: "translateY(100%)",
      });
    }
  }, [finishRidePanel]);

  return (
    <div className="h-screen relative">
      <div className="fixed p-3 top-0 flex items-center justify-between w-screen">
        <img
          className="w-16"
          src="https://upload.wikimedia.org/wikipedia/commons/c/cc/Uber_logo_2018.png"
          alt="Uber logo"
        />
        <Link
          to=""
          className=" h-10 w-10 bg-white flex items-center justify-center rounded-full"
        >
          <i className="text-lg font-medium ri-logout-box-r-line"></i>
        </Link>
      </div>
      <div className="h-4/5 ">
        <img
          className="h-full w-full object-cover"
          src="https://miro.medium.com/v2/resize:fit:1400/0*gwMx05pqII5hbfmX.gif"
          alt="map image"
        />
      </div>
      <div
        onClick={() => {
          setFinishRidePanel(true);
        }}
        className="h-1/5 p-6 flex items-center tran justify-between relative rounded-2xl"
      >
        <h5
          onClick={() => {
            props.setRidePopupPanel(false);
          }}
          className="p-1 text-center absolute  w-[90%] top-0  cursor-pointer"
        >
          <i className="ri-arrow-up-wide-line text-2xl text-[#0000008a]"></i>
        </h5>
        <h4 className="text-xl font-semibold">4 Km away</h4>
        <button className=" bg-black border   text-white   font-semibold p-3 px-10  rounded-lg">
          Complete Ride
        </button>
      </div>
      <div
        ref={finishRidePanelRef}
        className="fixed w-full z-10 bottom-0 translate-y-full  bg-white px-3 py-12 rounded-2xl"
      >
        <FinishRide  setFinishRidePanel = {setFinishRidePanel}/>
      </div>
    </div>
  );
};

export default CaptainRiding;