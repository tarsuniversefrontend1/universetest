"use client";
import { useEffect, useRef, useState } from "react";
import user from "../../../../Public/icons/settings/user.svg";
import security from "../../../../Public/icons/settings/security.svg";
import notification from "../../../../Public/icons/settings/notification.svg";
import wallet from "../../../../Public/icons/settings/wallet.svg";
import preference from "../../../../Public/icons/settings/preference.svg";
import arrow from "../../../../Public/icons/settings/arrow.svg";
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation"; // Import usePathname

const LeftNav = () => {
  const [isOpen, setIsOpen] = useState(false);
  const navRef = useRef(null);
  const pathname = usePathname(); // Get current pathname

  const toggleDrawer = () => {
    setIsOpen((prev) => !prev);
  };

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (navRef.current && !navRef.current.contains(event.target)) {
        setIsOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [navRef]);

  const isActiveLink = (href) => pathname === href; // Check if current path matches the link

  const navLinks = [
    { href: "/settings/generalInfo/", icon: user, label: "General Info" },
    { href: "/settings/security/", icon: security, label: "Security" },
    {
      href: "/settings/notification/",
      icon: notification,
      label: "Notification",
    },
    { href: "/settings/wallet/", icon: wallet, label: "Wallet" },
    {
      href: "/settings/accountPreference/",
      icon: preference,
      label: "Account Preferences",
    },
  ];

  return (
    <>
      <button
        className="fixed left-1 block md:hidden top-[4.5rem] bg-gray-600 h-10 w-2 rounded-r-md"
        onClick={toggleDrawer}
      ></button>

      <div
        ref={navRef}
        className={`fixed left-0 top-0 h-auto bg-white shadow-sm z-[9999] shadow-gray-300 w-[60%] lg:w-[20rem] md:w-[16rem] transform transition-transform duration-300 ease-in-out ${
          isOpen ? "translate-x-0" : "-translate-x-full"
        } md:translate-x-0 h-screen md:sticky md:top-0`}
      >
        <div className="flex items-center gap-4 mt-[6rem] ml-2 lg:ml-5">
          <Image
            loading="lazy"
            src={arrow}
            alt="arrow"
            className="rotate-90"
            width={14}
          />
          <p className="font-semibold text-heading">Settings</p>
        </div>

        <div className="mt-5 flex flex-col items-start">
          {navLinks.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className={`${
                isActiveLink(link.href) ? "bg-gray-100 font-semibold" : ""
              } flex items-center gap-3 px-5 lg:px-12 py-4 cursor-pointer hover:bg-gray-100 w-full duration-300 transition-all`}
            >
              <Image
                loading="lazy"
                src={link.icon}
                alt={link.label}
                width={15}
              />
              <p className="text-paragraph">{link.label}</p>
            </Link>
          ))}
        </div>
      </div>
    </>
  );
};

export default LeftNav;
