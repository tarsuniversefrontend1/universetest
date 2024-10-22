// app/users/[id]/page.jsx
"use client";

import React, { useEffect, useState } from "react";
import axios from "axios";
import CoverPhoto from "@/components/OthersProfile/CoverPhoto/CoverPhoto";
import LeftWidget from "@/components/OthersProfile/LeftWidget/LeftWidget";
import TimeLine from "@/components/OthersProfile/TimeLine/TimeLine";
import RightWidget from "@/components/OthersProfile/RightWidget/RightWidget";

const OtherProfiles = ({ params }) => {
  const { id } = params;
  const [user, setUser] = useState(null);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const response = await axios.get(
          `https://tarsuniverse.net:8443/users/${id}`,
          {
            withCredentials: true,
          }
        );
        setUser(response.data);
      } catch (err) {
        setError(err.message);
      }
    };

    fetchUser();
  }, [id]);

  if (error) {
    return (
      <div className="text-paragraph font-light flex items-center justify-center h-[95vh]">
        {error}
      </div>
    );
  }

  if (!user) {
    return (
      <div className="text-paragraph font-light flex items-center justify-center h-[95vh]">
        Loading...
      </div>
    );
  }

  return (
    <div className="pb-32">
      <CoverPhoto coverImageURL={user?.coverImageURL?.String} />

      <div className="max-w-6xl mx-auto px-0 md:px-4">
        <div className="flex flex-col lg:flex-row items-start gap-3.5">
          <LeftWidget user={user} />
          <TimeLine postsData={user?.posts} />
          <RightWidget />
        </div>
      </div>
    </div>
  );
};

export default OtherProfiles;
