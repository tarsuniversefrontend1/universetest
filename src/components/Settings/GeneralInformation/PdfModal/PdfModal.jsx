"use client"; // Make sure to keep this if you're using Next.js

import { useEffect, useRef } from "react";

const PdfModal = ({ isOpen, onClose, pdfUrl }) => {
  const modalRef = useRef(); 

  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "unset";
    }
  }, [isOpen]);

  const handleClickOutside = (event) => {
    if (modalRef.current && !modalRef.current.contains(event.target)) {
      onClose();
    }
  };

  useEffect(() => {
    if (isOpen) {
      document.addEventListener("mousedown", handleClickOutside);
    }

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [isOpen]);

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-80 z-[999999]">
      <div
        ref={modalRef} 
        className="relative w-full h-full max-w-4xl max-h-full bg-white" // Added a background color for better contrast
      >
      
        <iframe
          src={pdfUrl}
          className="w-full h-full"
          style={{ border: "none" }}
          title="PDF Viewer"
        />
      </div>
    </div>
  );
};

export default PdfModal;
