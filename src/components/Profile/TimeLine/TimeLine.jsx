"use client";

import CreateCard from "@/components/Home/CreateCard/CreateCard";
import EventCard from "@/components/Home/HomeTimeline/EventCard/EventCard";
import PostCard from "@/components/Home/HomeTimeline/PostCard/PostCard";
import ProjectCard from "@/components/Home/HomeTimeline/ProjectCard/ProjectCard";
import { UserContext } from "@/lib/UserProvider/UserProvider";
import EventCardLoader from "@/loaders/Home/Timeline/EventCardLoader/EventCardLoader";
import PostCardLoader from "@/loaders/Home/Timeline/PostCardLoader/PostCardLoader";
import ProjectCardLoader from "@/loaders/Home/Timeline/ProjectCardLoader/ProjectCardLoader";
import { useContext } from "react";

const TimeLine = () => {
  const { user,loading } = useContext(UserContext);
  const { events, posts, projects } = user;
  console.log("user", user);

  console.log("user", posts?.length);

  return (
    <div className="lg:mt-3 sm:w-[32rem] mx-auto lg:w-[135rem] w-full">
      <CreateCard />
      <div className="bg-gray-200 w-[98%] mx-auto h-[1px] my-3"></div>

      <div className="flex flex-col gap-3 w-full">
        {loading ? (
          <>
            <PostCardLoader /> <ProjectCardLoader /> <EventCardLoader />
          </>
        ) : (
          <>
            {" "}
            {posts &&
              posts.map((post) => <PostCard key={post.id} post={post} />)}
            {events &&
              events.map((post) => <EventCard key={post.id} post={post} />)}
            {projects &&
              projects.map((post) => <ProjectCard key={post.id} post={post} />)}
          </>
        )}
      </div>

      {!posts && !events && !projects && (
        <>
          <p className="text-center mt-3 text-paragraph">No posts Available</p>
        </>
      )}
    </div>
  );
};

export default TimeLine;
