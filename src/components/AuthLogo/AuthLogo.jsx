"use client";
import Image from "next/image";
import logo from "../../../assets/icons/officialIcons/blackUniverse.svg";
import { usePathname } from "next/navigation";

const AuthLogo = () => {
  const pathname = usePathname();
  const hideNavbar = [
    "/auth/signIn",
    "/auth/signUp/success",
    "/auth/resetPassword/success",
  ].includes(pathname);
  if (hideNavbar) return null;

  return (
    <Image
      loading="lazy"
      src={logo}
      alt="logo"
      width={80}
      className="flex items-center justify-center  mx-auto "
    ></Image>
  );
};

export default AuthLogo;
