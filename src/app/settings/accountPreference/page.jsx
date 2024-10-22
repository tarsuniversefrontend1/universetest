"use client";

import Link from "next/link";
import arrow from "../../../../assets/icons/register/arrow.svg";
import Image from "next/image";

const Page = () => {
  return (
    <div className="pb-24 overflow-y-auto lg:mt-[6.3rem] mt-20  lg:w-[33rem] md:w-[32rem]">
      <div className="flex w-full flex-col items-start gap-4">
        <div className="flex items-center gap-3">
          <div>
            <Link href="/profile/">
              <Image
                src={arrow}
                width={14}
                className="rotate-90"
                alt="->"
              ></Image>
            </Link>
          </div>
          <p className="text-xl ">Account Management</p>
        </div>

        <div className="flex w-full flex-col gap-4 mt-3">
          <div className="w-full rounded-lg px-5 py-2 cursor-pointer bg-white shadow-sm shadow-gray-300 flex items-center justify-between">
            <p className="text-paragraph">Delete Account</p>
            <Image
              src={arrow}
              width={14}
              className="-rotate-90"
              alt="->"
            ></Image>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Page;
