"use client";
import Image from "next/image";
import like from "../../../../../Public/icons/home/timeline/like.svg";
import comment from "../../../../../Public/icons/home/timeline/comment.svg";
import share from "../../../../../Public/icons/home/timeline/share.svg";
import dot from "../../../../../Public/icons/home/timeline/threeDot.svg";
import MediaDisplay from "../MediaDisplay/MediaDisplay";
import location from "../../../../../Public/icons/home/timeline/location.svg";
import date from "../../../../../Public/icons/home/timeline/date.svg";
import time from "../../../../../Public/icons/home/timeline/time.svg";

const EventCard = ({ post }) => {
  return (
    <div className="w-full">
      <div className="flex w-full flex-col gap-3">
        <div className="">
          <div className="shadow p-4  shadow-gray-300 bg-white sm:rounded-xl">
            <div className="w-full items-center justify-between flex">
              <div className="flex items-center gap-3">
                <Image
                  src={post?.author?.profile_url || ""}
                  alt="profile"
                  width={40}
                  height={40}
                  className="rounded-full object-cover object-top w-10 h-10"
                ></Image>
                <div className="flex flex-col items-start ">
                  <p className="text-[16px] flex items-center gap-3">
                    <span>
                      {post?.author?.firstname} {post?.author?.lastname}
                    </span>
                    <span className="text-xs">
                      Announced for an{" "}
                      <span className="text-red-600">Event</span>
                    </span>
                  </p>
                  <p className="text-[11px] font-light">{post?.created_at}</p>
                </div>
              </div>
              <Image
                src={dot}
                alt="dot"
                height={25}
                width={20}
                className=" h-7 cursor-pointer object-cover"
              ></Image>
            </div>

            <div className="mt-4 hover:scale-105  cursor-pointer overflow-hidden transition-all duration-300">
              {post?.thumb && <MediaDisplay mediaUrl={post?.thumb} />}
            </div>
            <div className="mt-4">
              <div className="flex flex-col items-start gap-3">
                <div className="flex items-center gap-1.5">
                  <Image
                    src={location}
                    alt="location"
                    width={10}
                    loading="lazy"
                  ></Image>
                  <p className="text-[11px] text-gray-500 font-light">
                    {post?.location}
                  </p>
                </div>
                <div className="flex items-center gap-8">
                  <div className="flex items-center gap-1.5">
                    <Image
                      src={date}
                      alt="date"
                      width={12}
                      loading="lazy"
                    ></Image>
                    <p className="text-[11px] text-gray-500 font-light">
                      {post?.date}
                    </p>
                  </div>
                  <div className="flex items-center gap-1.5">
                    <Image
                      src={time}
                      alt="date"
                      width={12}
                      loading="lazy"
                    ></Image>
                    <p className="text-[11px] text-gray-500 font-light">
                      12:15 PM
                    </p>
                  </div>
                </div>
              </div>
            </div>

            <div className="mt-4">
              <div className="w-full h-[1px] bg-gray-200"> </div>
              <div className="mt-3.5 flex justify-between w-full items-center">
                <div className="flex items-center">
                  <div className="flex items-center gap-1.5 group hover:bg-gray-200 px-3 transition-all cursor-pointer duration-300 rounded-lg py-2">
                    <Image
                      src={like}
                      alt="like"
                      width={20}
                      loading="lazy"
                      className="group-hover:-rotate-12 transition-all duration-300"
                    ></Image>
                    <p className="text-paragraph font-light">32</p>
                  </div>
                  <div className="flex items-center gap-1.5 group hover:bg-gray-200 px-3 transition-all cursor-pointer duration-300 rounded-lg py-2">
                    <Image
                      src={comment}
                      alt="comment"
                      width={20}
                      height={20}
                      loading="lazy"
                      className="group-hover:-rotate-12 h-4 transition-all duration-300"
                    ></Image>
                    <p className="text-paragraph font-light">32</p>
                  </div>
                  <div className="flex items-center gap-1.5 group hover:bg-gray-200 px-3 transition-all cursor-pointer duration-300 rounded-lg py-2">
                    <Image
                      src={share}
                      alt="share"
                      width={20}
                      height={20}
                      loading="lazy"
                      className="group-hover:rotate-45 h-4 transition-all duration-300"
                    ></Image>
                    <p className="text-paragraph font-light">32</p>
                  </div>
                </div>

                <button className="text-xs md:text-paragraph bg-gray-900 text-gray-100 md:py-2 rounded-full px-3 md:px-5 py-1.5">
                  Register Now
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default EventCard;
