import React from "react";

const LocationSearchPanel = ({suggestions, setVehiclePanel, setPanelOpen, setPickup, setDestination, activeField}) => {
  // sample array for location
  console.log("suggestions:",suggestions);
  console.log("activeField:", activeField);
  const handleSuggestionChange = (suggestions) => {
    if(activeField === 'pickup'){
      setPickup(suggestions);
    }else if(activeField === 'destination'){
      setDestination(suggestions);
    }
  }

  return (
    <div>
      {/* this is just a sample data */}

      {suggestions.map((element, index) => {
        return (
          <div
            key={index}
            onClick={() => {
              // props.setVehiclePanel(true);
              // props.setPanelOpen(false);
              handleSuggestionChange(element)
            }}
            className="flex items-center justify-start gap-4 my-2 p-3 border-2  border-gray-100 active:border-black cursor-pointer rounded-xl"
          >
            <h2 className=" w-10 h-10  flex items-center justify-center rounded-full  bg-[#eee]">
              <i className="ri-map-pin-2-fill text-xl"></i>
            </h2>
            <h4 className="font-medium">{element}</h4>
          </div>
        );
      })}
    </div>
  );
};

export default LocationSearchPanel;
