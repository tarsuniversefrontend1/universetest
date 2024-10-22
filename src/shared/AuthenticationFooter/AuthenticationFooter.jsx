"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import c from "../../../assets/icons/register/c.svg";
import tars from "../../../assets/icons/register/blackTars.svg";
import Image from "next/image";

const AuthenticationFooter = () => {
  const pathname = usePathname();
  const currentPath = pathname.pathname;

  const footerShowing =
    currentPath === "/auth/signIn" ||
    currentPath === "/auth/signUp" ||
    currentPath === "/auth/forgotPassword";
  return (
    <>
      {footerShowing && (
        <>
          <div className="bg-white fixed bottom-0 left-0 w-full lg:flex items-center justify-center sf-pro-display text-slate-500 text-[11px]  py-1.5   ">
            <div className="flex flex-col lg:flex-row  items-center justify-evenly lg:gap-0 gap-6 w-full">
              <div className="lg:flex flex-col hidden  lg:flex-row gap-2 lg:gap-5 items-center">
                <Link
                  href="/systemStatus"
                  className="no-underline text-[#7E7E7E] hover:font-semibold"
                >
                  System Status
                </Link>{" "}
                <div className="h-3 thin-border bg-slate-500"></div>
                <Link
                  href="/privacyPolicy"
                  className="no-underline text-[#7E7E7E] hover:font-semibold"
                >
                  Privacy Policy
                </Link>
                <div className="h-3 thin-border bg-slate-500"></div>
                <Link
                  href="/terms&Conditions"
                  className="no-underline text-[#7E7E7E] hover:font-semibold"
                >
                  Terms and Conditions
                </Link>
              </div>
              <div>
                <div className="flex items-center content-center gap-2">
                  <span>Copyright</span>
                  <Image src={c} className="w-[10px]" alt="" />
                  <div>
                    {" "}
                    <Image
                      src={tars}
                      alt=""
                      className="opacity-50 h-[25px] w-[31px] mb-2"
                    />
                  </div>
                  <span>All Rights Reserved </span>
                </div>
              </div>
            </div>
          </div>
        </>
      )}
    </>
  );
};

export default AuthenticationFooter;
