"use client";
import Image from "next/image";
import success from "../../../../../Public/icons/ssuccess/greenSuccess.svg";
import { useRouter } from "next/navigation";
import { useEffect } from "react";
import axios from "axios";

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
            <Image  src={success} alt="success" height={30} width={30} loading="lazy" ></Image>
            <p className="text-miniTitle md:text-subTitle">Successfully Created Account</p>
        </div>
    </div>
  )
}

export default Page