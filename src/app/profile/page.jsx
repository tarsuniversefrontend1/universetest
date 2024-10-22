"use client";

import CoverPhoto from "@/components/Profile/CoverPhoto/CoverPhoto";
import LeftWidget from "@/components/Profile/LeftWidget/LeftWidget";
import RightWidget from "@/components/Profile/RightWidget/RightWidget";
import TimeLine from "@/components/Profile/TimeLine/TimeLine";



const Page = () => {


  return (
    <div className="pb-32">
      <CoverPhoto />

      <div className="max-w-6xl  mx-auto px-0 md:px-4">
        <div className="flex flex-col lg:flex-row items-start gap-3.5">
          <LeftWidget/>
          <TimeLine/>
          <RightWidget/>
        </div>
      </div>
    </div>
  );
};

export default Page;
