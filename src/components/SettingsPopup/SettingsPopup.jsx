"use client";
import startup from "../../../Public/icons/profile/rightWidget/startup.svg";
import officials from "../../../Public/icons/profile/rightWidget/officials.svg";
import settings from "../../../Public/icons/profile/rightWidget/settings.svg";
import logOut from "../../../Public/icons/profile/rightWidget/logOut.png";
import theme from "../../../Public/icons/profile/rightWidget/theme.svg";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import axios from "axios";
import { useEffect, useRef } from "react";

const SettingsPopup = ({ toogleSettings }) => {
  const router = useRouter();
  const popupRef = useRef(null);

  const logout = async () => {
    try {
      await axios.post("https://tarsuniverse.net:8443/auth/logout", null, {
        withCredentials: true,
      });
      localStorage.clear();
      sessionStorage.clear();

      const cookieOptions = [
        "expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/; domain=.tarsuniverse.net; Secure; SameSite=strict;",
        "expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/; Secure; SameSite=strict;",
        "expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;",
      ];

      cookieOptions.forEach((option) => {
        document.cookie = `session=; ${option}`;
      });

      document.cookie =
        "otherCookieName=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;";

      router.push("/");
    } catch (error) {
      console.error("Error during logout:", error);
    }
  };

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (popupRef.current && !popupRef.current.contains(event.target)) {
        toogleSettings();
      }
    };

    document.addEventListener("mousedown", handleClickOutside);

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [popupRef, toogleSettings]);

  return (
    <div
      ref={popupRef}
      className="w-[14rem] py-3 absolute top-14 -right-12 rounded-lg border bg-white flex-col items-start"
    >
      <div className="h-3 w-3 absolute -top-[6px] right-12 border bg-white rotate-45 z-0 border-b-0 border-r-0"></div>

      <div className="flex flex-nowrap items-center gap-2 px-6 py-3 w-full hover:bg-gray-100 transition-all duration-300 cursor-pointer">
        <Image loading="lazy" src={startup} alt="officials" width={16} />
        <p className="text-paragraph font-light text-blue-800">
          Apply For Startup
        </p>
      </div>
      <div className="flex flex-nowrap items-center gap-2 px-6 py-3 w-full hover:bg-gray-100 transition-all duration-300 cursor-pointer">
        <Image loading="lazy" src={officials} alt="officials" width={16} />
        <p className="text-paragraph font-light">Apply For Officials</p>
      </div>
      <Link
        onClick={toogleSettings}
        href="/settings/generalInfo"
        className="flex flex-nowrap items-center gap-2 px-6 py-3 w-full hover:bg-gray-100 transition-all duration-300 cursor-pointer"
      >
        <Image loading="lazy" src={settings} alt="officials" width={16} />
        <p className="text-paragraph font-light">Settings</p>
      </Link>
      <div className="flex flex-nowrap items-center w-full hover:bg-gray-100 transition-all duration-300 cursor-pointer justify-between">
        <div className="flex flex-nowrap items-center gap-2 px-6 py-3">
          <Image loading="lazy" src={theme} alt="officials" width={16} />
          <p className="text-paragraph font-light">Appearance</p>
        </div>
      </div>
      <div
        onClick={logout}
        className="flex flex-nowrap items-center w-full hover:bg-gray-100 transition-all duration-300 cursor-pointer justify-between"
      >
        <div className="flex flex-nowrap items-center gap-2 px-7 py-3">
          <Image loading="lazy" src={logOut} alt="officials" width={15} />
          <p className="text-paragraph text-red-600 font-light">Log Out</p>
        </div>
      </div>
    </div>
  );
};

export default SettingsPopup;
