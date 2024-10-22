"use client";
import { useContext, useState } from "react";
import blankUser from "../../../assets/icons/blankUser.png";
import Image from "next/image";
import Link from "next/link";
import menu from "../../../assets/icons/home/navbar/menu.svg";
import { UserContext } from "@/lib/UserProvider/UserProvider";
import SettingsPopup from "@/components/SettingsPopup/SettingsPopup";

const LoggedInUserPhoto = () => {
  const { user } = useContext(UserContext);
  const [settings, setSettings] = useState(false);

  const toggleSettings = () => {
    setSettings(!settings);
  };

  return (
    <div className="flex relative items-center gap-3">
      <Link href="/profile">
        <Image
          src={user?.profileImageURL?.String || blankUser}
          width={26}
          height={26}
          loading="lazy"
          className={`object-cover object-top ${
            user?.profileImageURL?.String
              ? "rounded-full w-10 h-10 border"
              : "w-9 h-9"
          }`}
          alt="Profile image"
        />
      </Link>

      {settings && <SettingsPopup />}
    </div>
  );
};

export default LoggedInUserPhoto;
