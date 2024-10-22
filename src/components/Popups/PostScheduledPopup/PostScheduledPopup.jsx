

import Image from "next/image";
import search from "../../../../Public/icons/home/navbar/search.svg";

const PostScheduledPopup = ({ toogleLocation, params, cross }) => {
  return (
    <div className="bg-white py-5 px-16 rounded-lg w-full shadow-[0px_-5px_10px_rgba(0,0,0,0.1)] relative overflow-y-auto">
      <Image
        src={cross}
        alt="cross"
        onClick={toogleLocation}
        className="absolute cursor-pointer top-4 right-4"
        width={10}
      ></Image>

      <div className="mt-5">
        <div className="flex flex-col gap-6 mt-8">
          <div className="flex w-full flex-col gap-2">
            <p className="text-[16px] sf-pro-display">Schedule</p>
            <div className="relative w-full">
            

              <div className="flex flex-col items-start gap-3">
                {" "}
                <input
                  type="time"
                  className="w-full h-9 rounded-lg  opacity-70 bg-gray-100 sf-pro-display font-extralight text-[13px] focus:outline-none px-4"
                  
                />
                <input
                  type="date"
                  className="w-full h-9 rounded-lg  opacity-70 bg-gray-100 sf-pro-display font-extralight text-[13px] focus:outline-none px-4"
                  
                />
              </div>
            </div>
          </div>

          <div className="flex justify-end">
            <button className="text-paragraph text-gray-100 px-6 py-1 font-light rounded-full  bg-blue-900">
              Save
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PostScheduledPopup;



// PostScheduledPopup