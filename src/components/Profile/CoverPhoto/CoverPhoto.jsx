"use client";
import { UserContext } from "@/lib/UserProvider/UserProvider";
import axios from "axios";
import Image from "next/image";
import { useContext, useEffect, useRef, useState } from "react";
import coverEdit from "../../../../assets/icons/profile/profileEdit.svg";

const CoverPhoto = () => {
  const { user, setUser, loading } = useContext(UserContext);
  const { coverImageURL } = user;
  const [currentCoverImage, setCurrentCoverImage] = useState(
    coverImageURL?.String || ""
  );
  const fileInputRef = useRef(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  useEffect(() => {
    if (coverImageURL?.String) {
      setCurrentCoverImage(coverImageURL.String);
    }
  }, [coverImageURL]);

  const handleCoverPictureUpload = async (event) => {
    const url = "https://tarsuniverse.net:8443/profile";
    const file = event.target.files[0];

    try {
      const formData = new FormData();
      formData.append("cover_pic", file);

      let response;
      if (currentCoverImage) {
        response = await axios.put(url, formData, { withCredentials: true });
      } else {
        response = await axios.post(url, formData, { withCredentials: true });
      }

      setUser((prevUser) => ({
        ...prevUser,
        coverImageURL: response?.data.coverImageURL?.String,
      }));

      setCurrentCoverImage(response?.data.coverImageURL?.String);
    } catch (error) {
      console.error("Error uploading cover picture:", error);
    }
  };

  const handleSelectClick = () => {
    fileInputRef.current.click();
  };

  const openModal = () => {
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
  };

  return (
    <div className="relative">
      {loading ? (
        <>
          <div className="h-[20rem] w-full bg-gray-500 animate-pulse"></div>
        </>
      ) : (
        <>
          {!currentCoverImage && (
            <div className="w-full absolute justify-center flex py-2 items-center gap-2 lg:top-16 shadow-sm shadow-red-100 z-[9999] bg-red-50">
              <p className="text-center text-paragraph text-red-800 z-[9999] font-extralight">
                Please Select a professional Cover Photo
              </p>
              <button
                className="text-center text-paragraph text-red-100 bg-red-800 px-4 py-1 rounded-md z-[9999] font-extralight"
                onClick={handleSelectClick}
              >
                Select
              </button>
              <input
                type="file"
                accept="image/*"
                ref={fileInputRef}
                style={{ display: "none" }}
                onChange={handleCoverPictureUpload}
              />
            </div>
          )}

          <div className="relative group lg:mt-0 mt-14 h-[15rem] lg:h-[20rem]">
            <Image
              loading="lazy"
              src={currentCoverImage || ""}
              alt="Cover image"
              width={500}
              height={300}
              className={`w-full border h-full object-cover lg:object-cover ${
                !currentCoverImage && "bg-white"
              } h-full cursor-pointer`}
              onClick={openModal}
            />

            {currentCoverImage && (
              <div className="absolute bottom-3 right-3 z-10 lg:transform lg:transition-all lg:duration-300 lg:opacity-0 lg:group-hover:opacity-100">
                <Image
                  src={coverEdit}
                  priority={true}
                  className="w-6 h-6 cursor-pointer"
                  alt="Edit cover"
                  onClick={handleSelectClick}
                  width={20}
                />
                <input
                  type="file"
                  accept="image/*"
                  ref={fileInputRef}
                  style={{ display: "none" }}
                  onChange={handleCoverPictureUpload}
                />
              </div>
            )}
          </div>

          {isModalOpen && (
            <div
              className="fixed inset-0 bg-black bg-opacity-90 backdrop-blur-sm flex items-center justify-center z-[999999]"
              onClick={closeModal}
            >
              <div className="relative">
                <Image
                  src={currentCoverImage}
                  alt="Full-size cover image"
                  width={1200}
                  height={800}
                  className="object-cover w-full h-full"
                />
                <button
                  onClick={closeModal}
                  className="fixed top-4 right-4 bg-white text-black px-2.5 py-1 rounded-full"
                >
                  ✕
                </button>
              </div>
            </div>
          )}
        </>
      )}
    </div>
  );
};

export default CoverPhoto;
