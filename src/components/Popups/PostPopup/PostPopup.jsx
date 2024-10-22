"use client";
import { UserContext } from "@/lib/UserProvider/UserProvider";
import Image from "next/image";
import React, { useContext, useState, useRef } from "react";
import Visibility from "../../../../Public/icons/create/visibility.svg";
import cross from "../../../../Public/icons/register/cross.svg";
import Media from "../../../../Public/icons/create/media.svg";
import Location from "../../../../Public/icons/create/location.svg";
import proejct from "../../../../Public/icons/create/proejcts.svg";
import edit from "../../../../Public/icons/create/write.svg";
import calendar from "../../../../Public/icons/create/calendar.svg";
import invest from "../../../../Public/icons/create/invest.svg";
import PostLocationPopup from "../PostLocationPopup/PostLocationPopup";
import PostScheduledPopup from "../PostScheduledPopup/PostScheduledPopup";
import VisibilityPopup from "../VisibilityPopup/VisibilityPopup";
import { PostsFetch } from "@/hooks/PostsFetch/PostsFetch";
import { useRouter } from "next/navigation";

const PostPopup = ({
  blankUser,
  toogleLocation,
  createLoading,setError,handleRemoveMedia,
  error,handleTextChange,
  handleMediaChange,
  toogle,
  handleSubmit,
  textareaValue,
  setTextareaValue,
  selectedLocation,
  setSelectedLocation,
  visibility,locationPicker,scheluedPicker,visibilityPicker,media,
  setVisibility,
  postData,
  setPostData,
  handleLocationSelect,
  toogleVisibility,
  handleVisibilityChange,
  toogleSchelued,
}) => {
  // universefrontend1 - start
  const router = useRouter();
  // universefrontend1 - end

  const { user } = useContext(UserContext);

  const fileInputRef = useRef(null); // File input reference


  return (
    <div className="fixed  top-0 left-0 right-0 bottom-0 inset-0 bg-black backdrop-blur-sm z-[999999] bg-opacity-50 flex justify-center items-center">
      <div className="bg-white relative overflow-y-auto p-4 rounded-xl md:w-[34rem]">
        {locationPicker && (
          <div
            className={`z-[9999] absolute bottom-0 left-0 w-full transition-transform duration-500 ${
              locationPicker ? "translate-y-0" : "translate-y-full"
            } ease-in-out`}
          >
            <PostLocationPopup
              toogleLocation={toogleLocation}
              location={selectedLocation} // Pass selectedLocation as a prop
              setLocation={handleLocationSelect} // Pass the handler to set location
              cross={() => setLocationPicker(!locationPicker)}
              crossIcon={cross}
              setSelectedLocation={setSelectedLocation}
              selectedLocation={selectedLocation}
            />
          </div>
        )}
        {scheluedPicker && (
          <div
            className={`z-[9999] absolute bottom-0 left-0 w-full transition-transform duration-500 ${
              scheluedPicker ? "translate-y-0" : "translate-y-full"
            } ease-in-out`}
          >
            <PostScheduledPopup
              toogleLocation={toogleSchelued}
              cross={cross}
              scheduled_at={scheduled_at}
            />
          </div>
        )}
        <div className="flex items-start w-full justify-between">
          <div className="flex items-center gap-4">
            <div>
              <Image
                title="Your photo!"
                src={user?.profileImageURL?.String || blankUser}
                alt="profile"
                width={40}
                height={40}
                className="rounded-full object-cover object-top w-14 h-14"
                loading="lazy"
              />
            </div>
            <div className="flex flex-col items-start">
              <div className="flex items-center gap-5">
                <p className="text-[18px]">
                  {user?.firstname} {user?.lastname}
                </p>
                {selectedLocation && (
                  <>
                    <div className="flex items-center gap-1.5">
                      <Image
                        src={Location}
                        width={10}
                        loading="lazy"
                        alt="location"
                      ></Image>
                      <div className="text-xs font-light">
                        {selectedLocation}
                      </div>
                    </div>
                  </>
                )}
              </div>
              <div className="flex relative items-center gap-2">
                <div className="text-paragraph font-light opacity-60">
                  Post to {visibility}
                </div>
                <div className="relative">
                  <Image
                    onClick={toogleVisibility}
                    title="Who can see your post?"
                    src={Visibility}
                    alt="visibility"
                    width={10}
                    loading="lazy"
                    className="cursor-pointer"
                  />
                  {visibilityPicker && (
                    <VisibilityPopup
                      setVisibility={setVisibility}
                      onChange={handleVisibilityChange}
                    />
                  )}
                </div>
              </div>
            </div>
          </div>
          <Image
            title="Close"
            onClick={() => toogle()}
            src={cross}
            alt="cross"
            width={10}
            loading="lazy"
            className="cursor-pointer z-[999999]"
          />
        </div>
        <div className="mt-5">
          <textarea
            value={textareaValue}
            onChange={(e) => {
              setTextareaValue(e.target.value);
              handleTextChange(e);
              setError(" ");
            }}
            placeholder="What's on your mind?"
            className={`w-full overflow-y-auto scroll focus:outline-none px-4 font-light  resize-none `}
            id=""
            cols="30"
            rows={`${postData?.mediaPreviewUrl ? "2" : "12"}`}
          />
          <p className="text-right text-xs text-gray-400">
            {textareaValue.length}/500
          </p>
        </div>

        {postData?.mediaPreviewUrl && (
          <div className="mt-9">
            {postData.mediaPreviewUrl.endsWith(".mp4") ? (
              <video
                src={postData.mediaPreviewUrl}
                controls
                style={{ width: "100%", marginTop: "10px" }}
              />
            ) : (
              <div className="relative">
                <Image
                  src={postData.mediaPreviewUrl}
                  alt="Preview"
                  loading="lazy"
                  width={200}
                  height={200}
                  className="w-full h-full "
                  style={{ width: "100%", marginTop: "10px" }}
                ></Image>
                <div className="absolute  right-0 -top-7 md:ml-4 flex items-center gap-4">
                  <Image
                    className=" border p-1 cursor-pointer rounded-full border-gray-300"
                    src={edit}
                    alt="media"
                    width={22}
                    loading="lazy"
                    onClick={() => fileInputRef?.current?.click()} // Trigger the hidden file input on click
                  />
                  {/* Hidden file input */}
                  <input
                    name="media"
                    type="file"
                    ref={fileInputRef}
                    style={{ display: "none" }} // Hidden input
                    onChange={handleMediaChange} // Handle file selection
                  />

                  <Image
                    onClick={handleRemoveMedia}
                    src={cross}
                    width={23}
                    alt="edit"
                    loading="lazy"
                    className=" border p-1 cursor-pointer rounded-full border-gray-300"
                  ></Image>
                </div>
              </div>
            )}
          </div>
        )}
        <div className="mt-5 flex relative items-center gap-6 md:ml-5">
          <Image
            className="cursor-pointer"
            src={Media}
            alt="media"
            width={18}
            loading="lazy"
            onClick={() => fileInputRef?.current?.click()} // Trigger the hidden file input on click
          />
          {/* Hidden file input */}
          <input
            name="media"
            type="file"
            ref={fileInputRef}
            style={{ display: "none" }} // Hidden input
            onChange={media} // Handle file selection
          />
          <Image
            onClick={toogleLocation}
            className="cursor-pointer"
            src={Location}
            alt="location"
            width={14}
            loading="lazy"
          />
        </div>
        <div className="mt-3 h-[1px] w-full bg-gray-200"></div>
        <div className="mt-3 flex items-center w-full justify-between md:pl-5">
          <div className="flex items-center gap-6">
            <Image
              className="cursor-pointer"
              src={edit}
              alt="edit"
              width={14}
            />
            <Image
              className="cursor-pointer"
              src={calendar}
              alt="calendar"
              width={19}
            />
            <Image
              className="cursor-pointer"
              src={proejct}
              alt="projects"
              width={18}
              // universefrontend1 - start
              onClick={() => router.push("/create/project")}
              // universefrontend1 - end
            />
            <Image
              className="cursor-pointer"
              src={invest}
              alt="invest"
              width={22}
            />
          </div>
          <button
            onClick={handleSubmit} // Trigger post submission
            disabled={createLoading}
            className="bg-blue-800 text-white rounded-full px-6 py-1 text-paragraph"
          >
            Post
          </button>
        </div>
        {error && (
          <div className="text-red-500 text-xs md:ml-4 mt-3">{error}</div>
        )}
      </div>
    </div>
  );
};

export default PostPopup;
