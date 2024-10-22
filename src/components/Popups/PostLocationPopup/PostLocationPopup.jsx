import Image from "next/image";
import PropTypes from "prop-types";
import { useState } from "react"; // Import useState to manage input state
import search from "../../../../assets/icons/home/navbar/search.svg";

const PostLocationPopup = ({
  toogleLocation,
  location,
  crossIcon,
  setLocation,
  setSelectedLocation,
  selectedLocation,
  cross,
}) => {
  const handleLocationChoice = () => {
    setLocation(selectedLocation); // Set the selected location
    toogleLocation(); // Close the popup
    cross(); // Execute cross function
    setSelectedLocation(selectedLocation); // Set the selected location
    console.log(selectedLocation);
  };

  return (
    <div className="bg-white py-5 md:px-16 px-3 rounded-lg w-full shadow-[0px_-5px_10px_rgba(0,0,0,0.1)] relative overflow-y-auto">
      <Image
        src={crossIcon}
        alt="close"
        onClick={cross}
        className="absolute cursor-pointer top-4 right-4"
        width={10}
        height={10}
      />

      <div className="mt-5">
        <div className="flex flex-col gap-6 mt-8">
          <div className="flex w-full flex-col gap-2">
            <p className="text-[16px] sf-pro-display">Location</p>
            <div className="relative w-full">
              <Image
                src={search}
                alt="search icon"
                className="absolute top-3 left-3"
                width={14}
                height={14}
              />
              <input
                type="text"
                value={selectedLocation} // Control the input value
                onChange={(e) => setSelectedLocation(e.target.value)} // Update state on input change
                className="w-full h-9 rounded-lg pl-9 opacity-70 bg-gray-100 sf-pro-display font-extralight text-[13px] focus:outline-none px-3"
                placeholder="Search your location"
                aria-label="Search location"
              />
            </div>
          </div>

          <div className="flex justify-end">
            <button
              onClick={handleLocationChoice}
              className="text-paragraph text-gray-100 px-6 py-1 font-light rounded-full bg-blue-900"
              disabled={!selectedLocation} // Disable button if input is empty
            >
              Save
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PostLocationPopup;
