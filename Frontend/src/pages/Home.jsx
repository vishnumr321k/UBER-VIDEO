import React, { useRef, useState } from "react";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import 'remixicon/fonts/remixicon.css'
import LocationSearchPanel from "../components/LocationSearchPanel";



const Home = () => {
  const [pickup, setPickup] = useState("");
  const [destination, setDestination] = useState("");
  const [panelOpen, setPanelOpen] = useState(false);
  const panelRef = useRef(null);
  const panelCloseRef = useRef(null)

  const submitHandler = (e) => {
    e.preventDefault();
  };

  useGSAP(
    function () {
      if (panelOpen) {
        gsap.to(panelRef.current, {
          height: "70%",
          padding: 20
          // opacity: 1
        });
        gsap.to(panelCloseRef.current, {
          opacity: 1
        })
      } else {
        gsap.to(panelRef.current, {
          height: "0%",
          padding: 0
          // opacity: 0
        });
        gsap.to(panelCloseRef.current, {
          opacity: 0
        })
      }
    },
    [panelOpen]
  );

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
          src="https://pbs.twimg.com/media/DmeU2bdXcAArlHc.jpg:large"
          alt="map image"
        />
      </div>
      <div className=" h-screen absolute top-0 w-full flex flex-col justify-end">
        <div className="max-h-[70%] p-5 bg-white rounded-t-3xl relative overflow-y-auto">
          <h5 ref={panelCloseRef} onClick={() => {
            setPanelOpen(false)
          }} className="absolute opacity-0 right-6 top-4 text-2xl">
            <i className="ri-arrow-down-wide-line"></i>
          </h5>
          <h4 className="text-2xl font-semibold">Find a trip</h4>
          <form
            onSubmit={(e) => {
              submitHandler(e);
            }}
          >
            <div className="line absolute h-16 w-0.5 top-[45%] left-9 bg-[#000000b5] rounded-full"></div>
            <input
              onClick={() => {
                setPanelOpen(true);
              }}
              value={pickup}
              onChange={(e) => {
                setPickup(e.target.value);
              }}
              className="bg-[#eee] px-8 py-2 text-lg rounded-lg w-full mt-5"
              type="text"
              placeholder="Add a pick-up location"
            />
            <input
              onClick={() => {
                setPanelOpen(true);
              }}
              value={destination}
              onChange={(e) => {
                setDestination(e.target.value);
              }}
              className="bg-[#eee] px-8 py-2 text-lg rounded-lg w-full mt-3"
              type="text"
              placeholder="Enter your destination"
            />
          </form>
        </div>
        <div ref={panelRef} className="bg-white h-0 overflow-y-auto">
              <LocationSearchPanel/>
        </div>
      </div>
      <div className="fixed w-full z-10 bottom-0 bg-white px-3 py-6 rounded-2xl">
        
        <h3 className="text-2xl font-semibold mb-3">Choose a Vehicle</h3>


              <div className="flex w-full  border-2 mb-3 cursor-pointer border-gray-100 active:border-black   rounded-xl items-center justify-between">
                <img className="h-20 w-28 object-contain ml-2" src="https://www.uber-assets.com/image/upload/f_auto,q_auto:eco,c_fill,h_368,w_552/v1555367310/assets/30/51e602-10bb-4e65-b122-e394d80a9c47/original/Final_UberX.png" alt="car" />
                <div className=" w-1/2">
                  <h4 className=" text-base font-bold">UberGo <span><i className="ri-user-fill mr-0.5"></i>4</span></h4>
                  <h5 className="font-semibold text-sm">2 min away</h5>
                  <p className="font-normal text-xs text-[#000000d3]">Affordable, Compact rides</p>
                </div>
                <h2 className="text-lg font-semibold mr-3">₹193.20</h2>
              </div>
              <div className="flex w-full border-2 cursor-pointer border-gray-100 active:border-black   mb-3 rounded-xl items-center justify-between">
                <img className="h-20 w-28 object-contain ml-2" src="https://www.uber-assets.com/image/upload/f_auto,q_auto:eco,c_fill,h_538,w_956/v1698944322/assets/92/00189a-71c0-4f6d-a9de-1b6a85239079/original/UberMoto-India-Orange.png" alt="bike" />
                <div className="ml-2 w-1/2">
                  <h4 className=" text-base font-bold">Moto <span><i className="ri-user-fill mr-0.5"></i>1</span></h4>
                  <h5 className="font-semibold text-sm">3 min away</h5>
                  <p className="font-normal text-xs text-[#000000d3]">Affordable, Motorcycle rides</p>
                </div>
                <h2 className="text-lg font-semibold mr-3">₹65.17</h2>
              </div>
              <div className="flex  w-full border-2 cursor-pointer border-gray-100 active:border-black  mb-3 rounded-xl items-center justify-between">
                <img className="h-20 w-28 object-contain ml-2" src="https://blog.uber-cdn.com/cdn-cgi/image/width=2160,quality=80,onerror=redirect,format=auto/wp-content/uploads/2025/02/uberauto558x372pixelsdesktop-17393418542179-1024x683.webp" alt="Auto" />
                <div className=" w-1/2">
                  <h4 className=" text-base font-bold">UberAuto <span><i className="ri-user-fill mr-0.5"></i>3</span></h4>
                  <h5 className="font-semibold text-sm">2 min away</h5>
                  <p className="font-normal text-xs text-[#000000d3]">Affordable, Auto rides</p>
                </div>
                <h2 className="text-lg font-semibold mr-3">₹118.21</h2>
              </div>
      </div>
      
    </div>
  );
};

export default Home;
