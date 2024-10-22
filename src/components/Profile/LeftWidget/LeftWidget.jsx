"use client";

import { UserContext } from "@/lib/UserProvider/UserProvider";
import Image from "next/image";
import React, { useContext, useEffect, useRef, useState } from "react";
import blankUser from "../../../../Public/icons/blankUser.png";
import study from "../../../../Public/icons/profile/study.png";
import company from "../../../../Public/icons/profile/company.png"; // Note: This variable is not used in your code
import editing from "../../../../Public/icons/profile/editing.png";
import location from "../../../../Public/icons/profile/location.svg";
import axios from "axios";
import coverEdit from "../../../../Public/icons/profile/profileEdit.svg";
import LeftWidgetLoader from "@/loaders/Profile/LeftWidgetLoader/LeftWidgetLoader";
import Link from "next/link";

const LeftWidget = () => {
  const { user, updateUser, loading } = useContext(UserContext);
  const { profileImageURL } = user;

  const [currentProfileImage, setCurrentProfileImage] = useState(
    profileImageURL?.String || ""
  );
  const [isFullScreen, setIsFullScreen] = useState(false);
  const fileInputRef = useRef(null);

  useEffect(() => {
    if (profileImageURL?.String) {
      setCurrentProfileImage(profileImageURL.String);
    }
  }, [profileImageURL]);

  const handleProfilePictureUpload = async (event) => {
    const url = "https://tarsuniverse.net:8443/profile";
    const file = event.target.files[0];

    if (!file) return; // Ensure a file is selected

    const formData = new FormData();
    formData.append("profile_pic", file);

    try {
      const response = await axios.post(url, formData, {
        withCredentials: true,
      });
      const updatedProfileImageURL = response?.data.profileImageURL?.String;
      if (updatedProfileImageURL) {
        setCurrentProfileImage(updatedProfileImageURL);
        updateUser({ profileImageURL: { String: updatedProfileImageURL } });
      }
    } catch (error) {
      console.error("Error uploading profile picture:", error);
    }
  };

  const handleSelectClick = () => {
    fileInputRef.current.click();
  };

  const toggleFullScreen = () => {
    setIsFullScreen((prev) => !prev);
  };

  return (
    <div className="sm:w-[20rem] w-full mx-auto lg:w-full">
      {loading ? (
        <LeftWidgetLoader />
      ) : (
        <div className="shadow-sm shadow-gray-300 rounded-b-xl bg-white relative p-5">
          <div className="relative group w-44">
            <div className="flex gap-3">
              <Image
                loading="lazy"
                src={currentProfileImage || blankUser}
                alt="Profile image"
                width={400}
                height={400}
                onClick={toggleFullScreen}
                className={`border cursor-pointer object-cover rounded-full object-top h-44 w-full z-[9999] absolute -top-28 mx-auto lg:left-8 ${
                  !currentProfileImage && "shadow-sm shadow-gray-200 bg-white"
                }`}
              />
            </div>
            {currentProfileImage && (
              <div className="absolute -bottom-10 lg:-bottom-14 border rounded-md z-[99999] right-0 lg:-right-6 transform transition-all duration-300 lg:opacity-0 lg:group-hover:opacity-100">
                <Image
                  src={coverEdit}
                  priority={true}
                  className="w-6 h-6 cursor-pointer"
                  alt="Edit cover"
                  onClick={handleSelectClick}
                  width={20}
                  height={20}
                />
                <input
                  type="file"
                  accept="image/*"
                  ref={fileInputRef}
                  style={{ display: "none" }}
                  onChange={handleProfilePictureUpload}
                />
              </div>
            )}
          </div>

          {isFullScreen && (
            <div className="relative z-[999999]">
              <div className="fixed inset-0 bg-black backdrop-blur-sm bg-opacity-90 flex justify-center items-center">
                <div className="flex items-start">
                  <Image
                    src={currentProfileImage || blankUser}
                    alt="Profile image fullscreen"
                    width={800}
                    height={800}
                    className="rounded-xl shadow-sm shadow-gray-800"
                  />
                </div>
              </div>
              <button
                onClick={toggleFullScreen}
                className="fixed top-4 right-4 bg-white text-black px-2.5 py-1 rounded-full"
              >
                ✕
              </button>
            </div>
          )}

          <div className="flex flex-col items-start gap-1 mt-20">
            {!currentProfileImage && (
              <div className="w-full">
                <p className="lg:text-center text-paragraph text-red-800 z-[9999] font-extralight">
                  Select a professional Profile Photo
                </p>
                <button
                  className="text-center flex md:items-center md:justify-center mt-2 lg:mx-auto text-paragraph text-red-100 bg-red-800 px-4 py-1 rounded-md z-[9999] font-extralight"
                  onClick={handleSelectClick}
                >
                  Select
                </button>
              </div>
            )}

            <div className="flex w-full items-center justify-between gap-2">
              <div className="flex items-center justify-between gap-2">
                <div className="flex w-full items-center justify-between gap-2">
                  <p className={`text-2xl ${!currentProfileImage && "mt-4"}`}>
                    {user?.firstname} {user?.lastname}
                  </p>
                  <Link href="/settings/generalInfo/">
                    <Image
                      src={editing}
                      alt="edit"
                      width={16}
                      className="cursor-pointer"
                    />
                  </Link>
                </div>
              </div>
            </div>

            {user?.education?.designation && (
              <p className="text-[16px] font-extralight">
                {user?.education?.designation}
              </p>
            )}

            {user?.biodata && (
              <p className="text-paragraph font-extralight mt-2 ">
                &apos; {user?.biodata} &apos;
              </p>
            )}

            {user?.profession?.industry && (
              <>
                {" "}
                <div className="flex items-center gap-2 mt-1 opacity-65">
                  <Image
                    loading="lazy"
                    src={company}
                    alt="industry"
                    width={18}
                  />
                  <p className="text-paragraph font-extralight">
                    {user?.profession?.industry}
                  </p>
                </div>
                <div className="grid grid-cols-2 w-full gap-4 mt-3 text-paragraph font-extralight">
                  <div className="flex cursor-pointer flex-col bg-gray-100 px-4 py-2 rounded-xl items-center">
                    <p>Projects</p>
                    <p>{user.projects.length}</p>
                  </div>
                  <div className="flex flex-col cursor-pointer bg-gray-100 px-4 py-2 rounded-xl items-center">
                    <p>Wallet</p>
                    <p>$ 0</p>
                  </div>
                </div>
              </>
            )}

            {user?.education?.current_institution && (
              <div className="flex items-center gap-2 mt-1 opacity-65">
                <Image loading="lazy" src={study} alt="study" width={18} />
                <p className="text-paragraph font-extralight">
                  {user?.education?.current_institution}
                </p>
              </div>
            )}

            {user?.lives_in && (
              <div className="flex items-start gap-1 md:gap-2 mt-1 opacity-65">
                <Image
                  loading="lazy"
                  src={location}
                  alt="location"
                  className="mx-auto mt-[3px]"
                  width={12}
                />
                <p className="text-paragraph font-extralight">
                  {user?.lives_in}
                </p>
              </div>
            )}

            <div className="flex text-blue-800 text-paragraph font-extralight items-center gap-2 mt-3">
              <p>0 Followers</p>
              <div className="h-1 w-1 rounded-full bg-blue-900"></div>
              <p>0 Connections</p>
            </div>

            <div className="grid grid-cols-2 w-full gap-4 mt-3 text-paragraph font-extralight">
              <div className="flex cursor-pointer flex-col bg-gray-100 px-4 py-2 rounded-xl items-center">
                <p>Projects</p>
                <p>0</p>
              </div>
              <div className="flex flex-col cursor-pointer bg-gray-100 px-4 py-2 rounded-xl items-center">
                <p>Wallet</p>
                <p>$ 0</p>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default LeftWidget;
