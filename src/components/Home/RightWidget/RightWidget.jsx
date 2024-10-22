"use client";
import Image from "next/image";
import logo from "../../../../assets/icons/officialIcons/blackUniverse.svg";
import HomeFooter from "@/components/HomeFooter/HomeFooter";
import { useTimeLine } from "@/lib/TimeLineProvider/TimeLineProvider";
import RightWidgetLoader from "@/loaders/Home/RightWidgetLoader/RightWidgetLoader";

const RightWidget = () => {
  const { loading } = useTimeLine();
  return (
    <div className="w-full lg:block hidden">
      {" "}
      <div className="w-full  ">
        <div>
          <div className="h-96 relative shadow shadow-gray-300 rounded-xl bg-white">
            <Image
              className="w-full -top-4 opacity-5 absolute h-full"
              src={logo}
              alt="logo"
              loading="lazy"
            ></Image>
            <div className="flex items-center h-full justify-center">
              <div>
                <p className="text-xl animate-pulse text-center font-semibold -mt-4">
                  COMING SOON...
                </p>
              </div>
              <p className="absolute bottom-2 text-[11px] font-light text-center">
                Powered by <span className="azonix">UNIVERSE</span> Admin
              </p>
            </div>
          </div>
        </div>

        <div className="mt-10">
          <HomeFooter />
        </div>
      </div>
    </div>
  );
};

export default RightWidget;
