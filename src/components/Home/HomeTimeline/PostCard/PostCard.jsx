"use client";

import Image from "next/image";
import like from "../../../../../Public/icons/home/timeline/like.svg";
import comment from "../../../../../Public/icons/home/timeline/comment.svg";
import Location from "../../../../../Public/icons/create/location.svg";
import share from "../../../../../Public/icons/home/timeline/share.svg";
import { UserContext } from "@/lib/UserProvider/UserProvider";
import { useContext, useEffect, useState } from "react";
import MediaDisplay from "../MediaDisplay/MediaDisplay";
import dot from "../../../../../Public/icons/home/timeline/threeDot.svg";
import Link from "next/link";
import PostLikeList from "@/components/PostLikeList/PostLikeList";
const PostCard = ({ post }) => {
  const { user } = useContext(UserContext);
const [showLikeList, setShowLikeList] = useState(false);
 console.log("PostCard details" , post)
  return (
    <div className="flex w-full flex-col gap-3">
      <div>
        <div className="">
          <div className="shadow p-4  shadow-gray-300 bg-white sm:rounded-xl">
            <div className="w-full items-center justify-between flex">
              <div className="flex items-center gap-3">

                <Link
                  href={`/${
                    post?.user_id === user?.id
                      ? "profile/"
                      : `users/${post?.user_id}`
                  }`}
                >

                  {" "}
                  <Image
                    src={post?.author?.profile_url || ""}
                    alt="profile"
                    width={40}
                    height={40}
                    className="rounded-full object-cover object-top w-10 h-10"
                    loading="lazy"
                  ></Image>
                </Link>
                <div className="flex flex-col items-start ">
                  <div className="flex items-center gap-4">
                    <p className="text-[16px]">
                      {post?.author?.firstname} {post?.author?.lastname}
                    </p>
                    {post?.location && (
                      <div className="flex items-center gap-1.5">
                        <Image
                          src={Location}
                          width={10}
                          alt="location"
                          loading="lazy"
                        ></Image>
                        <p className="text-sm">{post?.location}</p>
                      </div>
                    )}
                  </div>
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

            <div className="mt-4">
              <p className="text-paragraph font-light">
                {post?.text?.length > 300 ? (
                  <>
                    {post?.text?.slice(0, 300)}...
                    <span className="text-blue-800 cursor-pointer">
                      {" "}
                      read more
                    </span>
                  </>
                ) : (
                  post?.text
                )}
              </p>
            </div>
            <Link href={`/post/${post?.id}`}>
              {" "}
              <div className="mt-4">
                {post?.media_url && <MediaDisplay mediaUrl={post?.media_url} />}
              </div>
            </Link>

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
                    <p
                      onMouseEnter={() => setShowLikeList(true)}
                      onMouseLeave={() => setShowLikeList(false)}
                      className="text-paragraph font-light hover:underline transition-all duration-300"
                    >
                      32
                    </p>
                  </div>
                  <div className="flex relative items-center gap-1.5 group hover:bg-gray-200 px-3 transition-all cursor-pointer duration-300 rounded-lg py-2">
                    {showLikeList && <PostLikeList />}

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

                {user?.id === post?.user_id && (
                  <button className="text-paragraph bg-gray-900 text-gray-100 rounded-full px-5 py-1.5">
                    Boost
                  </button>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PostCard;
