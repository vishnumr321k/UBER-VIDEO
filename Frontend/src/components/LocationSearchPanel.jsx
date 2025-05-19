import React from "react";

const LocationSearchPanel = (props) => {
  // sample array for location
  const locations = [
    "East Nada, Guruvayur Temple, Guruvayur, Kerala 680101",
    "Punnathur Kotta Elephant Sanctuary, Kottapadi, Guruvayur, Kerala",
    "Mammiyoor Junction, Guruvayur, Kerala 680101",
    "Guruvayur Railway Station, West Nada, Guruvayur, Kerala",
    "Parthasarathy Temple Road, Guruvayur, Kerala",
    "Kottapadi Center, Guruvayur, Kerala",
    "Near Manjulal, East Nada, Guruvayur, Kerala",
    "Chembai Nagar, Guruvayur, Kerala",
    "Chavakkad Beach, Chavakkad, Kerala",
    "Thiruvenkitam Road, Guruvayur, Kerala",
  ];

  return (
    <div>
      {/* this is just a sample data */}

      {locations.map((location, index) => {
        return (
          <div
            key={index}
            onClick={() => {
              props.setVehiclePanel(true);
              props.setPanelOpen(false);
            }}
            className="flex items-center justify-start gap-4 my-2 p-3 border-2  border-gray-100 active:border-black cursor-pointer rounded-xl"
          >
            <h2 className=" w-10 h-10  flex items-center justify-center rounded-full  bg-[#eee]">
              <i className="ri-map-pin-2-fill text-xl"></i>
            </h2>
            <h4 className="font-medium">{location}</h4>
          </div>
        );
      })}
    </div>
  );
};

export default LocationSearchPanel;
