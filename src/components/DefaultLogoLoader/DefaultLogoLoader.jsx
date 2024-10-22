"use client"; // Ensure this component is a client component
import Image from "next/image";
import logo from "../../../assets/icons/officialIcons/whiteUniverse.svg";
import { useEffect, useState } from "react";

const DefaultLogoLoader = ({ children }) => {
  const [progress, setProgress] = useState(0); // For controlling the position of the blue bar
  const [direction, setDirection] = useState(1); // 1 for right, -1 for left
  const [visible, setVisible] = useState(true);
  const [isOffline, setIsOffline] = useState(false); // Default to false, update in useEffect

  useEffect(() => {
    // Check for navigator object existence in the browser
    if (typeof navigator !== "undefined") {
      setIsOffline(!navigator.onLine); // Detect initial offline status

      const handleOnline = () => {
        setIsOffline(false);
        console.log("User is online."); // Log when user is online
      };

      const handleOffline = () => {
        setIsOffline(true);
        console.log("User is offline.");
      };

      window.addEventListener("online", handleOnline);
      window.addEventListener("offline", handleOffline);

      // Show loader and manage progress
      const interval = setInterval(() => {
        setProgress((prevProgress) => {
          const newProgress = prevProgress + direction * 4; // Move by 4% for faster animation
          // Reverse direction when reaching limits
          if (newProgress >= 100) {
            setDirection(-1); // Move left
            return 100; // Cap the progress at 100%
          } else if (newProgress <= 0) {
            setDirection(1); // Move right
            return 0; // Cap the progress at 0%
          }
          return newProgress; // Return new progress value
        });
      }, 30); // Adjust interval time for speed

      // Hide loader and check for offline status after a delay
      const timeout = setTimeout(() => {
        setVisible(false); // Hide loader after showing once

        // If offline, set isOffline to true
        if (!navigator.onLine) {
          setIsOffline(true);
        }

        clearInterval(interval);
      }, 1500); // Adjust delay if necessary

      return () => {
        clearInterval(interval);
        clearTimeout(timeout);
        window.removeEventListener("online", handleOnline);
        window.removeEventListener("offline", handleOffline);
      };
    }
  }, [direction]);

  // If the loader is visible, show it
  if (visible) {
    return (
      <div className="fixed inset-0 flex h-screen top-0 flex-col pt-[35vh] items-center bg-gray-950 z-[999999]">
        <Image
          src={logo}
          alt="logo"
          width={100}
          height={100}
          className="mb-4"
        />
        <div className="relative w-28 h-1 mt-2 bg-gray-300 rounded-full overflow-hidden">
          <div
            className="absolute left-0 top-0 h-full bg-blue-700 shadow-sm shadow-gray-300 transition-all duration-100"
            style={{
              width: "100%", // Set the width of the blue active progress bar to cover the entire background
              transform: `translateX(${progress}%)`, // Move the blue bar based on progress
            }}
          ></div>
        </div>
      </div>
    );
  }

  if (isOffline) {
    return (
      <div className="fixed inset-0 flex h-screen top-0 flex-col pt-[35vh] items-center bg-gray-950 z-[999999]">
        <Image
          src={logo}
          alt="logo"
          width={100}
          height={100}
          className="mb-4"
        />
        <p className="text-white mt-4 bg-black rounded-full py-2 px-8 fixed top-0 left-1/2 transform -translate-x-1/2">
          You&apos;re offline. Please check your internet connection.
        </p>
      </div>
    );
  }

  return <>{children}</>;
};

export default DefaultLogoLoader;
