import Link from "next/link";
import arrow from "../../../assets/icons/home/homeFooter/arrow.svg";
import Image from "next/image";

const HomeFooter = () => {
  return (
    <div className="text-[12px] text-gray-600">
      <div className="flex flex-col items-center gap-4">
        <div className="flex items-center gap-6">
          <Link href="/about">About</Link>
          <Link href="/helpCenter">Help Center</Link>
          <Link href="/footer/contact">Contact Us</Link>
        </div>
        <div className="flex items-center gap-1.5">
          <Link href="/privacyAndTerms">Privacy and Terms</Link>
          <Image src={arrow} alt="arrow" loading="lazy" width={8}></Image>
        </div>
        <Link href="/getApp">
          Get The <span className="azonix">Universe</span> App
        </Link>
      </div>
    </div>
  );
};

export default HomeFooter;
