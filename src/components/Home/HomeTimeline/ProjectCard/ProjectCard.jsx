"use client";
import { useTimeLine } from "@/lib/TimeLineProvider/TimeLineProvider";
import like from "../../../../../Public/icons/home/timeline/like.svg";
import comment from "../../../../../Public/icons/home/timeline/comment.svg";
import share from "../../../../../Public/icons/home/timeline/share.svg";
import Image from "next/image";
import MediaDisplay from "../MediaDisplay/MediaDisplay";
import dot from "../../../../../Public/icons/home/timeline/threeDot.svg";

const ProjectCard = ({ post }) => {
  const { projectPosts } = useTimeLine();
  const { author } = post;
  return (
    <div>
      <div className="flex flex-col gap-3">
        <div>
          <div className="">
            <div className="shadow p-4  shadow-gray-300 bg-white sm:rounded-xl">
              <div className="w-full items-center justify-between flex">
                <div className="flex items-center gap-3">
                  <Image
                    src={author?.profile_url}
                    alt="profile"
                    width={40}
                    height={40}
                    className="rounded-full object-cover object-top w-10 h-10"
                  ></Image>
                  <div className="flex flex-col items-start ">
                    <p className="text-[16px]">
                      {author?.firstname} {author?.lastname}
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

              <div className="mt-4">
                <p className="bg-gray-500 px-4 py-1.5 rounded-full text-white font-light text-[11px] inline-block">
                  Quantum Science and Technology
                </p>
                <p className="text-miniTitle mt-3 font-semibold text-gray-700">
                  {post?.title}
                </p>
                <p className="text-paragraph mt-3 font-light">
                  {post?.detailed_description.length > 250 ? (
                    <>
                      {post?.detailed_description.slice(0, 250)}...
                      <span className="text-blue-800 cursor-pointer">
                        {" "}
                        read more
                      </span>
                    </>
                  ) : (
                    post?.detailed_description
                  )}
                </p>
              </div>
              <div className="mt-4">
                {post?.thumb && <MediaDisplay mediaUrl={post?.thumb} />}
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
                  <button className="text-paragraph bg-gray-900 text-gray-100 rounded-full px-5 py-1.5">
                    $ {post?.price}
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProjectCard;
