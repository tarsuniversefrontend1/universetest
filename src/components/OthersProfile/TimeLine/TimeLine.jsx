"use client";

import EventCard from "@/components/Home/HomeTimeline/EventCard/EventCard";
import InvestCard from "@/components/Home/HomeTimeline/InvestCard/InvestCard";
import PostCard from "@/components/Home/HomeTimeline/PostCard/PostCard";
import ProjectCard from "@/components/Home/HomeTimeline/ProjectCard/ProjectCard";
import { useTimeLine } from "@/lib/TimeLineProvider/TimeLineProvider";
import Spinner from "@/loaders/Spinner/Spinner";

const TimeLine = ({ postsData, proejctData }) => {
  const { loading } = useTimeLine();

  const calculateTimeAgo = (createdAt) => {
    const createdAtDate = new Date(createdAt);
    const now = new Date();
    const timeDiff = now - createdAtDate;

    const seconds = Math.floor(timeDiff / 1000);
    const minutes = Math.floor(seconds / 60);
    const hours = Math.floor(minutes / 60);
    const days = Math.floor(hours / 24);
    const months = Math.floor(days / 30);
    const years = Math.floor(days / 365);

    let timeAgoStr = "";

    if (years > 1) {
      timeAgoStr = `${years} years ago`;
    } else if (years === 1) {
      timeAgoStr = "1 year ago";
    } else if (months > 1) {
      timeAgoStr = `${months} months ago`;
    } else if (months === 1) {
      timeAgoStr = "1 month ago";
    } else if (days > 1) {
      timeAgoStr = `${days} days ago`;
    } else if (days === 1) {
      timeAgoStr = "1 day ago";
    } else if (hours > 1) {
      timeAgoStr = `${hours} hours ago`;
    } else if (hours === 1) {
      timeAgoStr = "1 hour ago";
    } else if (minutes > 1) {
      timeAgoStr = `${minutes} minutes ago`;
    } else if (minutes === 1) {
      timeAgoStr = "1 minute ago";
    } else {
      timeAgoStr = "just now";
    }

    return timeAgoStr;
  };

  const formattedPostsData = postsData?.map((post) => ({
    ...post,
    created_at: calculateTimeAgo(post.created_at),
  }));
  const formattedProejctsData = proejctData?.map((proejct) => ({
    ...proejct,
    created_at: calculateTimeAgo(proejct.created_at),
  }));

  console.log("user posts", postsData);

  return (
    <div className="lg:mt-3 sm:w-[32rem] mx-auto lg:w-[135rem] w-full">
      <div className="bg-white rounded-lg text-xs shadow-sm shadow-gray-300 pt-2 px-5 md:px-12 flex items-center w-full justify-around">
        <div className="cursor-pointer flex flex-col items-center gap-2 relative font-semibold">
          <div>Posts</div>
          <div className="bg-gray-800 h-1 w-16 rounded-t-lg"></div>
        </div>
        <div className="cursor-pointer flex flex-col items-center gap-2">
          Projects <div></div>
        </div>
        <div className="cursor-pointer flex flex-col items-center gap-2">
          Events <div></div>
        </div>
        <div className="cursor-pointer flex flex-col items-center gap-2">
          Investments <div></div>
        </div>
      </div>

      <div>
        <div className="w-[98%] mx-auto h-[1px] bg-gray-200 my-3"></div>

        <div className="flex w-full flex-col items-center gap-3">
          {formattedProejctsData?.map((post) => {
            return <ProjectCard key={post?.id} post={post} />;
          })}
          {formattedPostsData?.map((post) => {
            return <PostCard key={post?.id} post={post} />;
          })}
        </div>

        {loading && <Spinner />}
      </div>
    </div>
  );
};

export default TimeLine;
