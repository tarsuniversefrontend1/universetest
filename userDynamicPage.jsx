// app/users/[id]/page.jsx

"use client";
import React, { useEffect, useState } from "react";
import axios from "axios"; // Import axios directly here
import CoverPhoto from "@/components/OthersProfile/CoverPhoto/CoverPhoto";
import LeftWidget from "@/components/OthersProfile/LeftWidget/LeftWidget";
import TimeLine from "@/components/OthersProfile/TimeLine/TimeLine";
import RightWidget from "@/components/OthersProfile/RightWidget/RightWidget";
import LeftWidgetLoader from "@/loaders/Profile/LeftWidgetLoader/LeftWidgetLoader";

const OtherProfiles = ({ params: { id } }) => {
  // const { id } = params;
  const [user, setUser] = useState(null);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);
  useEffect(() => {
    setLoading(true);
    const fetchUser = async () => {
      setLoading(true);
      try {
        setLoading(true);
        const response = await axios.get(
          `https://tarsuniverse.net:8443/users/${id}`,
          {
            withCredentials: true,
          }
        );
        const userData = response.data;
        setUser(userData);
      } catch (err) {
        setLoading(false);
        setError(err.response?.data?.message || err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchUser();
  }, [id]);

  if (error) {
    setLoading(false);
    return (
      <div className="text-paragraph font-light flex items-center justify-center h-[95vh]">
        {error}
      </div>
    );
  }
  console.log("User", user);
  console.log("id", id);

  return (
    <div className="pb-32">
      {loading ? (
        <>
          <div className="h-[20rem] w-full bg-gray-500 animate-pulse"></div>
        </>
      ) : (
        <>
          <CoverPhoto coverImageURL={user?.coverImageURL?.String} />
        </>
      )}

      <div className="max-w-6xl mx-auto px-0 md:px-4">
        <div className="flex w-full flex-col lg:flex-row items-start gap-3.5">
          {loading ? (
            <>
              <LeftWidgetLoader />
            </>
          ) : (
            <LeftWidget user={user} />
          )}
          <TimeLine postsData={user?.posts} />
          <RightWidget />
        </div>
      </div>
    </div>
  );
};

export default OtherProfiles;



// app/users/[id]/page.jsx



// import axios from "axios";
// import CoverPhoto from "@/components/OthersProfile/CoverPhoto/CoverPhoto";
// import LeftWidget from "@/components/OthersProfile/LeftWidget/LeftWidget";
// import TimeLine from "@/components/OthersProfile/TimeLine/TimeLine";
// import RightWidget from "@/components/OthersProfile/RightWidget/RightWidget";
// import LeftWidgetLoader from "@/loaders/Profile/LeftWidgetLoader/LeftWidgetLoader";

// export async function generateStaticParams() {
//   try {
//     const response = await axios.get(
//       `https://tarsuniverse.net:8443/users/${id}`,
//       {
//         withCredentials: true,
//       }
//     );
//     const id = response.data.id; 

//     return id
//   } catch (error) {
//     console.error("Error fetching friends:", error);
//     return []; 
//   }
// }

// const OtherProfiles = ({ params }) => {
//   const { id } = params;

//   return (
//     <div className="mt-20">
//       <h1>Profile ID: {id}</h1>
//       {/* Additional components for rendering the friend's profile can go here */}
//     </div>
//   );
// };

// export default OtherProfiles;
