import React from "react";
import Image from "next/image";
import Link from "next/link";
import logo from "../../../../assets/icons/home/footer/whiteTars.svg";

const Navbar = () => {
  return (
    <div>
      <div className="w-full z-[999999] fixed  -top-1 lg:py-0 py-2  bg-[#2B2B2B] shadow-black   shadow-sm ">
        <div className="px-8">
          <div className="flex items-center justify-between py-0.5 lg:py-3.5 ">
            <Link href={"/home/"}>
              <Image src={logo} alt="" width={47} className="" />
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Navbar;
