"use client";
import PostCard from "./PostCard/PostCard";
import ProjectCard from "./ProjectCard/ProjectCard";
import EventCard from "./EventCard/EventCard";
import InvestCard from "./InvestCard/InvestCard";
import CreateCard from "../CreateCard/CreateCard";
import { useTimeLine } from "@/lib/TimeLineProvider/TimeLineProvider";
import { useEffect, useCallback } from "react";
import UseTitle from "@/hooks/DynamicTitle/useTitle";
import Spinner from "@/loaders/Spinner/Spinner";
import RefreshButton from "../RefreshButton/RefreshButton";
import RequestedConnectionCard from "./RequestedConnectionCard/RequestedConnectionCard";

const HomeTimeline = () => {
  UseTitle("Universe | Home");
  const {
    loading,
    fetchMorePosts,
    setError,
    fetchPosts,
    error,
    posts,
    refetchPosts,
  } = useTimeLine();

  useEffect(() => {
    fetchPosts();
  }, [fetchPosts]);

  const handleScroll = useCallback(() => {
    const nearBottom =
      window.innerHeight + window.scrollY >= document.body.offsetHeight - 1;

    if (nearBottom && !loading) {
      fetchMorePosts();
    }
  }, [loading, fetchMorePosts]);

  useEffect(() => {
    window.addEventListener("scroll", handleScroll);

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, [handleScroll]);

  return (
    <div className="pb-32 sm:w-[32rem] lg:w-[137rem] w-full ">
      {error === "Post finished" && (
        <>
          <RefreshButton loadNewPosts={refetchPosts} setError={setError} />
        </>
      )}
      <CreateCard />
      <div className="w-[98%] mx-auto h-[1px] bg-gray-200 my-3" />
      <div className="flex w-full h-auto gap-3">
        <RequestedConnectionCard />
      </div>

      <div className="flex w-full flex-col items-center gap-3">
        {posts?.map((post) => {
          switch (post.type) {
            case "post":
              return <PostCard key={post?.id} post={post} />;
            case "event":
              return <EventCard key={post?.id} post={post} />;
            case "project":
              return <ProjectCard key={post?.id} post={post} />;
            case "investment":
              return <InvestCard key={post?.id} post={post} />;
            default:
              return null;
          }
        })}
      </div>

      {loading && <Spinner />}
      {error && !error === "Post finished" && (
        <p className="text-center text-red-800 mt-3 text-paragraph">{error}</p>
      )}
    </div>
  );
};

export default HomeTimeline;
