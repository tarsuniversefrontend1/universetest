"use client";
import React, { useState, useEffect, useContext } from "react";
import Image from "next/image";
import Link from "next/link";
import Footer from "@/components/Footer/Footer";
import { AuthContext } from "@/AuthProvider/AuthProvider";
import email from "../../assets/icons/welcome/email.png";
import logo from "../../assets/icons/officialIcons/whiteUniverse.svg";
import logo2 from "../../assets/icons/officialIcons/blackUniverse.svg";

const Home = React.memo(() => {
  const [showLogo, setShowLogo] = useState(false);
  const [hideImage, setHideImage] = useState(false);
  const { googleSignIn } = useContext(AuthContext);

  useEffect(() => {
    const logoTimer = setTimeout(() => {
      setShowLogo(true);
    }, 20000);

    const imageTimer = setTimeout(() => {
      setHideImage(true);
    }, 1500);

    return () => {
      clearTimeout(logoTimer);
      clearTimeout(imageTimer);
    };
  }, []);

  const handleGoogle = () => {
    googleSignIn()
      .then((res) => {
        console.log(res);
        setTimeout(() => {}, 2000);
      })
      .catch((err) => console.error(err));
  };

  return (
    <div className="">
      <div
        className={`w-full  bg-black flex items-center justify-center  h-screen transition-all duration-500 ${
          hideImage ? "hidden opacity-0" : "block opacity-100"
        }`}
      >
        <div className="flex justify-center w-full ">
          <Image
            src={logo}
            alt="whiteUniverse"
            width={160}
            height={160}
            className=" w-28   flex animate-fadeIn  justify-center items-center "
            priority={true}
          />
        </div>
      </div>

      {hideImage && (
        <>
          {" "}
          <div className="2xl:w-[86rem] pb-[14rem] md:pb-0  animate-fadeIn  px-4 md:px-6 xl:px-0 mx-auto">
            <div
              className={` flex items-center  justify-center transition-opacity duration-1000`}
            ></div>
            <div className="md:h-[95vh] md:mt-0 mt-14 flex items-center md:justify-center">
              <div className="flex  flex-col md:flex-row h-full items-center justify-center xl:justify-between sm:gap-10 xl:gap-[10rem]  md:gap-5 gap-6  w-full   mx-auto">
                {" "}
                <div className="md:col-span-6  md:w-full md:h-full  col-span-12">
                  <Image
                    src={logo2}
                    alt="whiteUniverse"
                    width={300}
                    height={300}
                    className="w-20 h-full mx-auto md:w-[23rem] xl:w-[25rem] "
                  />
                </div>
                <div className="md:col-span-6  mx-auto md:px-0 px-3  w-full  col-span-12">
                  <p className="text-big xl:w-[40rem] lg:text-xtraBig font-semibold leading-[2.5rem] lg:leading-[3.8rem]  md:leading-[3rem]">
                    Welcome to Your Engineering and Technology Community
                  </p>
                  <p className="xl:w-[40rem] text-[20px] md:text-subTitle mt-2">
                    Connect, collaborate and innovate with like-minded
                    professionals
                  </p>
                  <div>
                    <Link
                      className="mt-8 md:mx-0 mx-auto w-full  md:w-[17rem]  text-miniTItle bg-black text-white flex items-center justify-center h-10 rounded-btnBase"
                      href="/auth/signIn/"
                    >
                      <div className="flex items-center gap-3">
                        <Image
                          width={18}
                          src={email}
                          loading="lazy"
                          alt="email"
                        ></Image>
                        <p>Sign In with email</p>
                      </div>
                    </Link>
                    <Link
                      href="/auth/signUp/"
                      className="mt-4 cursor-pointer md:mx-0 mx-auto w-full  md:w-[17rem]  text-miniTItle bg-btnSecondary flex items-center justify-center h-10 rounded-btnBase"
                    >
                      <div className="flex items-center gap-3">
                        <p>Create your account</p>
                      </div>
                    </Link>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <Footer />
        </>
      )}
    </div>
  );
});

export default Home;
