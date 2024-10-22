import startup from "../../../../assets/icons/profile/rightWidget/startup.svg";
import officials from "../../../../assets/icons/profile/rightWidget/officials.svg";
import settings from "../../../../assets/icons/profile/rightWidget/settings.svg";
import theme from "../../../../assets/icons/profile/rightWidget/theme.svg";
import Image from "next/image";
import Link from "next/link";

const RightWidget = () => {
  return (
    <div className=" w-full  mt-4 lg:block hidden ">
      {/* <div className="flex flex-col items-start">
        <div className="flex items-center gap-2 px-6 py-3 w-full hover:bg-gray-100 transition-all duration-300 cursor-pointer">
          <Image
            loading="lazy"
            src={startup}
            alt="officials"
            width={16}
          ></Image>
          <p className="text-paragraph font-light text-blue-800">
            Apply For Startup
          </p>
        </div>
        <div className="flex items-center gap-2 px-6 py-3 w-full hover:bg-gray-100 transition-all duration-300 cursor-pointer">
          <Image
            loading="lazy"
            src={officials}
            alt="officials"
            width={16}
          ></Image>
          <p className="text-paragraph font-light">Apply For Oficials</p>
        </div>
        <Link href="/settings/generalInfo" className="flex items-center gap-2 px-6 py-3 w-full hover:bg-gray-100 transition-all duration-300 cursor-pointer">
          <Image
            loading="lazy"
            src={settings}
            alt="officials"
            width={16}
          ></Image>
          <p className="text-paragraph font-light">Settings</p>
        </Link>
        <div className="flex items-center w-full hover:bg-gray-100 transition-all duration-300 cursor-pointer justify-between">
          <div className="flex items-center gap-2 px-6 py-3  ">
            <Image
              loading="lazy"
              src={theme}
              alt="officials"
              width={16}
            ></Image>
            <p className="text-paragraph font-light">Appearance</p>
          </div>
        </div>
      </div> */}
    </div>
  );
};

export default RightWidget;
