
"use client";
import Image from "next/image";
import cover from"../../Public/images/error/cover.svg"
import { useRouter } from "next/navigation";

const Page = () => {
    const route = useRouter()
  return (
    <div className="md:flex w-full max-w-5xl mx-auto items-center justify-center md:h-screen ">
      <div className="grid grid-cols-12 justify-center gap-10 items-center">
        <div className="lg:col-span-6 col-span-12 order-2 lg:order-1 lg:px-0 px-4">
          <p className="text-title lg:text-xtraBig lg:leading-[4rem]">
            Sorry! The page you requested could not be found
          </p>
          <p className="text-miniTItle lg:text-subTitle font-light mt-2 text-gray-400">
            Please try searching again or use the navigation menu to find what
            you&apos;re looking for
          </p>
          <p className="mt-8 text-gray-400 md:text-left text-center">
            Go back to{" "}
            <span
              className="text-black cursor-pointer"
              onClick={() => route.push("/")}
            >
              Home page
            </span>{" "}
            or visit our <span className="text-black">Help Center</span>
          </p>
        </div>
        <div className="lg:col-span-6 order-1 lg:order-2 col-span-12">
          <Image
            src={cover}
            alt="cover"
            height={600}
            width={600}
            className="lg:rounded-full w-[30rem] mx-auto shadow-sm shadow-gray-200"
            loading="lazy"
          ></Image>
        </div>
      </div>
    </div>
  );
}

export default Page