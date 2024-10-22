import React from "react";
import Link from "next/link";
import Image from "next/image";

import tarsLogo from "../../../../Public/icons/home/footer/tarsLogo.svg";
import copyRight from "../../../../Public/icons/home/footer/copyright.svg";
import lock from "../../../../Public/icons/home/footer/lock.svg";

const Footer = () => {
  return (
    <div>
      <div className="w-full z-[999999]  lg:py-0 py-2  bg-white  shadow-sm shadow-gray-300">
        <div className="px-8">
          <div className="flex items-center  lg:gap-6 gap-4 py-0.5 lg:py-3.5 ">
            <Link href={"/home/"}>
              <Image src={tarsLogo} alt="" className="w-[35px]  h-auto" />
            </Link>
            <div className="flex items-center justify-start text-paragraph  gap-1 opacity-70 pt-3 ">
              <Image
                src={copyRight}
                width={10}
                height={10}
                alt="copyright"
                className="opacity-50"
              />
              <p className=" text-[11px]  ">2024 TARS UNIVERSE</p>
            </div>
            <div className="flex items-center justify-start text-paragraph gap-1 opacity-70 pt-3">
              <Image src={lock} width={10} height={10} alt="ssl" className="" />
              <p className="text-[11px]  ">Secured with SSL</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Footer;
