"use client"
import { useState } from "react";
import Image from "next/image";


const CoverPhoto = ({ coverImageURL }) => {
  const [isModalOpen, setIsModalOpen] = useState(false);

  const openModal = () => {
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
  };

  return (
    <div className="relative">
      <div className="relative group lg:mt-0 mt-14 h-[15rem] lg:h-[20rem]">
        <Image
          loading="lazy"
          src={coverImageURL} // Use the static image
          alt="Static Cover image"
          width={500}
          height={300}
          className="w-full border  object-cover lg:object-cover bg-white h-full cursor-pointer"
          onClick={openModal} // Opens the modal on click
        />
      </div>

      {/* Modal for fullscreen view */}
      {isModalOpen && (
        <div
          className="fixed inset-0 bg-black bg-opacity-95 backdrop-blur-sm flex items-center justify-center z-[999999]"
          onClick={closeModal} // Closes the modal when clicking outside the image
        >
          <div className="relative">
            <Image
              src={coverImageURL} // Full-size cover image in the modal
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
    </div>
  );
};

export default CoverPhoto;
