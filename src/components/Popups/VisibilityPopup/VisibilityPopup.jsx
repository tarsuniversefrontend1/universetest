"use client";
import assets from "../../../../assets/icons/create/public.svg";
import connections from "../../../../assets/icons/create/connections.svg";
import onlyMe from "../../../../assets/icons/create/onlyMe.svg";
import Image from "next/image";

const VisibilityPopup = ({ onChange }) => {
  const handleVisibilityChange = (visibility) => {
    onChange(visibility);
    console.log("visibility", visibility);
  };

  return (
    <div className=" w-32 absolute py-2 border top-5 -left-10 rounded-xl bg-white shadow-sm shadow-gray-300">
      {" "}
      <div className="h-3 w-3 absolute -top-[6px] left-[2.3rem] border bg-white rotate-45 z-0 border-b-0 border-r-0"></div>
      <div className="flex flex-col items-start">
        <div
          onClick={() => handleVisibilityChange("assets")}
          className="flex items-center w-full cursor-pointer gap-2 py-1.5 hover:bg-gray-100 transition-all duration-300 px-5"
        >
          <Image src={assets} alt="public" width={10} loading="lazy"></Image>
          <div className="text-xs font-light">assets</div>
        </div>
        <div
          onClick={() => handleVisibilityChange("Connections")}
          className="flex items-center w-full cursor-pointer gap-2 py-1.5 hover:bg-gray-100 transition-all duration-300 px-5"
        >
          <Image
            src={connections}
            alt="public"
            width={10}
            loading="lazy"
          ></Image>
          <div className="text-xs font-light">Connections</div>
        </div>
        <div
          onClick={() => handleVisibilityChange("Only me")}
          className="flex items-center w-full cursor-pointer gap-2 py-1.5 hover:bg-gray-100 transition-all duration-300 px-5"
        >
          <Image src={onlyMe} alt="public" width={10} loading="lazy"></Image>
          <div className="text-xs font-light">Only me</div>
        </div>
      </div>
    </div>
  );
};

export default VisibilityPopup;
