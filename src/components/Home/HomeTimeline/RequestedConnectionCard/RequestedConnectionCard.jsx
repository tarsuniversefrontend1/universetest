import blankUser from "../../../../../assets/icons/home/suggestedconnection/blankUser.svg";
import Image from "next/image";
import React from "react";
import Carousel from "react-multi-carousel";
import "react-multi-carousel/lib/styles.css";

const RequestedConnectionCard = () => {
  const responsive = {
    superLargeDesktop: {
      // the naming can be any, depends on you.
      breakpoint: { max: 4000, min: 3000 },
      items: 5,
    },
    desktop: {
      breakpoint: { max: 3000, min: 1024 },
      items: 4,
    },
    tablet: {
      breakpoint: { max: 1024, min: 464 },
      items: 3,
    },
    mobile: {
      breakpoint: { max: 464, min: 0 },
      items: 1,
    },
  };
  return (
    <div className="mb-3 sm:w-[32rem] lg:w-[37rem] w-full shadow-gray-300 shadow-sm bg-white rounded-lg  ">
      <p className="text-miniTItle mb-2 pt-4 pl-4">Requested Connections</p>
      <Carousel
        responsive={responsive}
        itemClass="carousel-item"
        className="mb-4 ml-2"
      >
        <SingleRequestedUserCard />
        <SingleRequestedUserCard />
        <SingleRequestedUserCard />
        <SingleRequestedUserCard />
        <SingleRequestedUserCard />
        <SingleRequestedUserCard />
      </Carousel>
    </div>
  );
};

export default RequestedConnectionCard;

export const SingleRequestedUserCard = () => {
  return (
    <div className="border w-40 border-gray-300 rounded-lg ">
      <Image
        src={blankUser}
        alt="user image"
        className="w-40 h-28 object-cover rounded-t-lg"
      />
      <p className="pl-2 pt-1 text-paragraph">Fatin Ahmed</p>
      <p className=" pl-2 text-[12px] font-light text-gray-500 leading-3 mb-2">
        Creator
      </p>
      <div className="flex flex-col gap-1 justify-center items-center w-full mb-2 px-2">
        <button className="bg-blue-800 text-white text-[12px] rounded-lg  py-1  w-full">
          Confirm
        </button>
        <button className="bg-gray-200 text-black text-[12px] rounded-lg  py-1  w-full">
          Cancel
        </button>
      </div>
    </div>
  );
};
