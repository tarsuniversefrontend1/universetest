"use client";
import Image from "next/image";
import success from "../../../../../assets/icons/ssuccess/greenSuccess.svg";
import { useEffect } from "react";
import { useRouter } from "next/navigation";

const Page = () => {
  const router = useRouter();

  useEffect(() => {
    const timer = setTimeout(() => {
      router.push("/home");
    }, 3000);

    return () => clearTimeout(timer);
  }, [router]);
  return (
    <div className="flex items-center justify-center ">
      <div className="flex items-center justify-center gap-4 transition-all duration-500 animate-fadeIn">
        <Image
          src={success}
          alt="success"
          height={30}
          width={30}
          loading="lazy"
        ></Image>
        <p className="text-miniTitle md:text-subTitle">
          Password Recovered Successfully
        </p>
      </div>
    </div>
  );
};

export default Page;
