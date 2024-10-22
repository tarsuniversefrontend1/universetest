"use client";
import Media from "../../../../assets/icons/home/create/media.svg";
import event from "../../../../assets/icons/home/create/event.svg";
import project from "../../../../assets/icons/home/create/createProject.svg";
import { UserContext } from "@/lib/UserProvider/UserProvider";
import { useContext, useState } from "react";
import Image from "next/image";
import blankUser from "../../../../assets/icons/blankUser.png";
import CreateCardLoader from "@/loaders/Home/Timeline/CreateCardLoader/CreateCardLoader";
import PostPopup from "@/components/Popups/PostPopup/PostPopup";
import greenTik from "../../../../assets/icons/ssuccess/greenSuccess.svg";
import { PostsFetch } from "@/hooks/PostsFetch/PostsFetch";
import Link from "next/link";

const CreateCard = () => {
  const { user, loading } = useContext(UserContext);
  const [popupToogle, setPopupToogle] = useState(false);
  const [textareaValue, setTextareaValue] = useState("");
  const [locationPicker, setLocationPicker] = useState(false);
  const [scheluedPicker, setScheluedPicker] = useState(false);
  const [visibilityPicker, setVisibilityPicker] = useState(false);
  const [selectedLocation, setSelectedLocation] = useState("");
  const {
    error,
    progress,
    setError,
    showProgress,
    showSuccess,
    visibility,
    media,
    setVisibility,
    createLoading,
    submitPost,
    postData,
    setPostData,
    handleTextChange,
  } = PostsFetch();

  const toogle = () => {
    setPopupToogle(!popupToogle);
  };
  const { profileImageURL } = user;
  const handleLocationSelect = (locationText) => {
    setSelectedLocation(locationText);
    setLocation(locationText);
    setLocationPicker(false);
  };
  const toogleVisibility = (newVisibility) => {
    setVisibilityPicker(!visibilityPicker);
    setLocationPicker(false);
  };
  const handleVisibilityChange = (visibility) => {
    setVisibilityPicker(false);
    setVisibility(visibility);
  };
  const toogleSchelued = () => {
    setScheluedPicker(!scheluedPicker);
    setLocationPicker(false);
  };

  const toogleLocation = () => {
    setLocationPicker(!locationPicker);
  };

  const validatePost = () => {
    const hasText = textareaValue.trim().length > 0;
    const hasMedia = !!postData?.mediaPreviewUrl;

    return hasText || hasMedia; // Return true if either condition is met
  };
  const handleMediaChange = (event) => {
    console.log("POst data", postData);
    console.log("clicked media");
    const file = event.target.files[0];
    if (file) {
      const mediaPreviewUrl = URL.createObjectURL(file);
      setPostData((prev) => ({ ...prev, mediaPreviewUrl }));
    }
  };

  const handlePostSubmit = async () => {
    toogle();
    if (!validatePost()) {
      setError("At least description or media");
      return;
    }

    await submitPost();
  };

  const handleRemoveMedia = () => {
    setPostData((prev) => ({ ...prev, mediaPreviewUrl: null })); // Reset the mediaPreviewUrl
  };

  return (
    <div className="w-full">
      {loading ? (
        <>
          {" "}
          <CreateCardLoader />
        </>
      ) : (
        <>
          <div className=" bg-white sm:rounded-xl shadow-sm shadow-gray-300 p-4">
            <>
              {popupToogle && (
                <>
                  <PostPopup
                    handleMediaChange={handleMediaChange}
                    handleRemoveMedia={handleRemoveMedia}
                    handleTextChange={handleTextChange}
                    createLoading={createLoading}
                    toogleLocation={toogleLocation}
                    blankUser={blankUser}
                    media={media}
                    locationPicker={locationPicker}
                    toogle={toogle}
                    error={error}
                    handleSubmit={handlePostSubmit}
                    textareaValue={textareaValue}
                    setTextareaValue={setTextareaValue}
                    selectedLocation={selectedLocation}
                    setSelectedLocation={setSelectedLocation}
                    visibility={visibility}
                    setVisibility={setVisibility}
                    postData={postData}
                    setPostData={setPostData}
                    handleLocationSelect={handleLocationSelect}
                    toogleVisibility={toogleVisibility}
                    handleVisibilityChange={handleVisibilityChange}
                    toogleSchelued={toogleSchelued}
                    scheluedPicker={scheluedPicker}
                    visibilityPicker={visibilityPicker}
                    setError={setError}
                  />
                </>
              )}
            </>
            <div className="flex items-center justify-between w-full">
              <div className="flex items-center gap-2">
                <Image
                  loading="lazy"
                  src={profileImageURL?.String || blankUser}
                  alt="profile"
                  width={40}
                  height={40}
                  className="rounded-full w-10 h-10 object-cover object-top border"
                ></Image>
                <input
                  type="text"
                  className="border-0 focus:outline-none"
                  placeholder="What's on your mind ..."
                  name=""
                  id=""
                  onClick={toogle}
                />
              </div>
              <p className="text-xs text-gray-500 font-light">0/500</p>
            </div>

            <div className="mt-2.5  flex items-center justify-between w-full">
              <div className="flex px-3 items-center gap-6 md:gap-10">
                {" "}
                <div className="flex items-center gap-1.5">
                  <Image
                    loading="lazy"
                    src={Media}
                    alt="media"
                    width={16}
                  ></Image>
                  <div className="text-paragraph hidden md:block  font-light">
                    Media
                  </div>
                </div>
                <div className="flex items-center gap-1.5">
                  <Image
                    loading="lazy"
                    src={event}
                    alt="media"
                    width={15}
                  ></Image>
                  <div className="text-paragraph hidden md:block  font-light">
                    Event
                  </div>
                </div>
                {/* universefrontend1 - start*/}
                <Link
                  href="/create/project"
                  className="flex items-center gap-1.5 cursor-pointer"
                >
                  <Image
                    loading="lazy"
                    src={project}
                    alt="media"
                    width={15}
                  ></Image>
                  <div className="text-paragraph hidden md:block  font-light">
                    Project
                  </div>
                </Link>
                {/* universefrontend1 - end*/}
              </div>
              <button className="text-paragraph text-gray-100 px-6 py-1 rounded-full  bg-blue-900">
                Post
              </button>
            </div>
          </div>
        </>
      )}

      {showProgress && (
        <>
          {" "}
          <div className="mt-2.5">
            <div className="bg-white p-5 rounded-xl leftNav">
              <div className="flex items-center justify-between">
                <p className="sf-pro-display font-semibold text-[16px]">
                  Uploading
                </p>
                <p className="sf-pro-display text-[13px]">{progress}%</p>
              </div>
              <div className="rounded-full mt-3 bg-gray-100 h-2 w-full leftNav">
                <div
                  className="rounded-full h-full bg-blue-900 leftNav transition-all duration-700"
                  style={{ width: `${progress}%` }}
                ></div>
              </div>
            </div>
          </div>
        </>
      )}

      {showSuccess && (
        <div className="mt-2.5">
          <div className="bg-white p-5 rounded-xl leftNav">
            <div className="flex items-center justify-center gap-2">
              <Image src={greenTik} width={14} alt="->"></Image>
              <p className="sf-pro-display text-[14px]">Posted</p>
            </div>
          </div>
        </div>
      )}
      {error && (
        <>
          <div className="text-xs text-red-700">{error}</div>
        </>
      )}
    </div>
  );
};

export default CreateCard;
