"use client";
import C from "../../../assets/icons/welcome/copyright.svg";
import { useRouter } from "next/navigation";
import Link from "next/link";
import Image from "next/image";

const Footer = () => {
  const router = useRouter();
  const currentPath = router.pathname;

  const footerShowing = currentPath !== "/";

  return (
    <>
      {footerShowing && (
        <>
          <div className="w-full  bg-gray-100  sm:fixed  bottom-0 left-0  ">
            <div className="h-[1px]  bg-gray-200 w-[90%] mx-auto"></div>
            <div className="flex flex-wrap text-[13px] font-light py-4 justify-center items-center gap-x-6 gap-y-2 w-full md:px-0 px-4 md:w-[80%] mx-auto">
              <p>About</p>
              <button>Download Universe App</button>
              <p>Help Center</p>
              <p>Terms & Services</p>
              <p>Privacy Policy</p>
              <Link href="https://tarsindustries.com/careers/">Careers</Link>
              <p>Developers</p>
              <p>Blog</p>
              <p>Settings</p>
              <p>Advertising</p>
              <div className="flex items-center gap-1">
                <Image
                  src={C}
                  alt="copyright"
                  loading="lazy"
                  width={10}
                ></Image>
                <p>2024 Universe</p>
              </div>
            </div>
          </div>
        </>
      )}
    </>
  );
};

export default Footer;
