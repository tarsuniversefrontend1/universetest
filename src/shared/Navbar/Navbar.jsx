"use client";
import logo from "../../../Public/icons/home/navbar/logo.svg";
import home from "../../../Public/icons/home/navbar/home.svg";
import message from "../../../Public/icons/home/navbar/message.svg";
import create from "../../../Public/icons/home/navbar/post.svg";
import connections from "../../../Public/icons/home/navbar/connections.svg";
import market from "../../../Public/icons/home/navbar/market.svg";
import search from "../../../Public/icons/home/navbar/search.svg";
import mboileSearch from "../../../Public/icons/home/navbar/mobileSearch.svg";
import menu from "../../../Public/icons/home/navbar/menu.svg";
import notification from "../../../Public/icons/home/navbar/notification.svg";
import Image from "next/image";
import Link from "next/link";
import LoggedInUserPhoto from "@/hooks/LoggedInUserPhoto/LoggedInUserPhoto";
import { usePathname } from "next/navigation";
import { useEffect, useRef, useState } from "react";
import SettingsPopup from "@/components/SettingsPopup/SettingsPopup";
import { useTimeLine } from "@/lib/TimeLineProvider/TimeLineProvider";

const Navbar = () => {
  const pathname = usePathname();
  const [settings, setSettings] = useState(false);
  const [isVisible, setIsVisible] = useState(true);
  const [lastScrollY, setLastScrollY] = useState(0);

  const handleScroll = () => {
    const currentScrollY = window.scrollY;
    if (currentScrollY > lastScrollY && currentScrollY > 50) {
      // Scrolling down
      setIsVisible(false);
    } else {
      // Scrolling up
      setIsVisible(true);
    }
    setLastScrollY(currentScrollY);
  };

  useEffect(() => {
    // Add scroll event listener
    window.addEventListener("scroll", handleScroll);

    // Cleanup event listener on component unmount
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, [lastScrollY]);
  const { setError, refetchPosts } = useTimeLine();

  const handleClick = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
    refetchPosts();
    setError(null);
  };

  const hideNavbar = [
    "/auth/signIn",
    "/auth/signUp",
    "/",
    "/auth/signUp",
    "/auth/signUp/otp",
    "/auth/signUp/success",
    "/auth/resetPassword",
    "/auth/resetPassword/success",
    "/auth/resetPassword/otp",
    "/auth/resetPassword/passwordRecovery",
    "/footer/contact",
  ].includes(pathname);

  if (hideNavbar) return null;

  const toogleSettings = () => {
    setSettings(!settings);
  };

  if (hideNavbar) return null;

  const navbar = (
    <>
      <div>
        <div className="">
          <div className="flex w-full lg:justify-normal justify-between items-center lg:px-0 px-8  lg:gap-2">
            <Link
              onClick={handleClick}
              className="lg:px-8  relative z-[9999] group lg:hover:bg-gray-100 duration-300 transition-all py-2.5 lg:py-5"
              href="/home/"
            >
              <Image
                src={home}
                loading="lazy"
                alt="home"
                className="mx-auto lg:w-5 w-4 group-hover:-translate-y-1 duration-300 transition-all "
                width={20}
              />
              <div className="hidden group-hover:block absolute bottom-1.5 left-1/2 transform -translate-x-1/2">
                <p className="  text-[10px] opacity-80">Home</p>
              </div>
            </Link>
            <Link
              className="lg:px-8 relative group lg:hover:bg-gray-100 duration-300 transition-all py-2.5 lg:py-5"
              href="/market"
            >
              <Image
                className="mx-auto lg:w-5 w-4 group-hover:-translate-y-1 duration-300 transition-all "
                src={market}
                loading="lazy"
                alt="market"
                width={20}
              />
              <div className="hidden group-hover:block absolute bottom-1.5 left-1/2 transform -translate-x-1/2">
                <p className="  text-[10px] opacity-80">Market</p>
              </div>
            </Link>
            <div className="lg:px-8 relative group lg:hover:bg-gray-100 duration-300 transition-all py-2.5 lg:py-5">
              <Image
                className="mx-auto lg:w-5 w-4 group-hover:-translate-y-1 duration-300 transition-all "
                src={create}
                loading="lazy"
                alt="create"
                width={20}
              />
              <div className="hidden group-hover:block md:absolute bottom-1.5 left-1/2 transform -translate-x-1/2">
                <p className="  text-[10px] opacity-80">Create</p>
              </div>
            </div>{" "}
            <Link
              className="lg:px-8 relative group lg:hover:bg-gray-100 duration-300 transition-all py-2.5 lg:py-5"
              href="/messages"
            >
              <Image
                className="mx-auto lg:w-5 w-4 group-hover:-translate-y-1 duration-300 transition-all "
                src={message}
                loading="lazy"
                alt="message"
                width={20}
              />
              <div className="hidden group-hover:block absolute bottom-1.5 left-1/2 transform -translate-x-1/2">
                <p className="  text-[10px] opacity-80">Message</p>
              </div>
            </Link>
            <Link
              className="lg:px-8 relative group lg:hover:bg-gray-100 duration-300 transition-all py-2.5 lg:py-5"
              href="/notification"
            >
              <Image
                className="mx-auto lg:w-5 w-4 group-hover:-translate-y-1 duration-300 transition-all "
                src={notification}
                loading="lazy"
                alt="notification"
                width={20}
              />
              <div className="hidden group-hover:block absolute bottom-1.5 left-1/2 transform -translate-x-1/2">
                <p className="  text-[10px] opacity-80">Notifications</p>
              </div>
            </Link>
            <Link
              className="lg:px-8 relative group lg:hover:bg-gray-100 hidden lg:block duration-300 transition-all py-2.5 lg:py-5"
              href="/connections"
            >
              <Image
                className="mx-auto lg:w-5 w-4 group-hover:-translate-y-1 duration-300 transition-all"
                src={connections}
                loading="lazy"
                alt="connections"
                width={22}
              />
              <div className="hidden group-hover:block absolute bottom-1.5 left-1/2 transform -translate-x-1/2">
                <p className="  text-[10px] opacity-80">Connections</p>
              </div>
            </Link>
          </div>
        </div>
      </div>
    </>
  );

  return (
    <div>
      <div
        className={`w-full z-[999999] fixed top-0 lg:py-0 py-2  bg-white  shadow-sm shadow-gray-300`}
      >
        <div className="px-5 max-w-6xl mx-auto">
          <div className="flex items-center justify-between  ">
            <div className="flex items-center gap-5">
              <Link href="/home">
                {" "}
                <Image src={logo} loading="lazy" width={35} alt="logo"></Image>
              </Link>
              <div className="relative lg:block hidden">
                {" "}
                <input
                  type="text"
                  className="lg:w-[18rem]  font-extralight text-miniTitle pl-10 focus:outline-none border-gray-300 rounded-lg h-9 border"
                  name=""
                  id=""
                  placeholder="Search Projects, Products and more"
                />
                <Image
                  src={search}
                  loading="lazy"
                  alt="search"
                  width={15}
                  className="absolute top-3 left-4"
                ></Image>
              </div>
            </div>
            <div>
              <div
                className={`lg:relative bottom-0 md:py-0 py-1 lg:bg-transparent bg-gray-200 left-0 w-full fixed transition-transform duration-300 ${
                  isVisible
                    ? "translate-y-0"
                    : "translate-y-full md:translate-y-0"
                }`}
              >
                {navbar}
              </div>
            </div>
            <div className="flex items-center gap-5">
              <Image
                src={mboileSearch}
                loading="lazy"
                alt="search"
                width={34}
                className=" block lg:hidden"
              ></Image>{" "}
              <div className="relative ">
                <Image
                  onClick={toogleSettings}
                  src={menu}
                  alt="menu"
                  loading="lazy"
                  width={20}
                  className="cursor-pointer "
                ></Image>
                <div className="w-full">
                  {settings && (
                    <SettingsPopup toogleSettings={toogleSettings} />
                  )}
                </div>
              </div>
              <LoggedInUserPhoto />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Navbar;
