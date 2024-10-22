"use client";
import Image from "next/image";
import refresh from "../../../../Public/icons/home/refresh.png";

const RefreshButton = ({ loadNewPosts, setError }) => {
  
  const handleClick = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
    loadNewPosts();
    setError(null);
  };

  return (
    <div
      onClick={handleClick}
      className="fixed top-24 bg-blue-900 cursor-pointer left-1/2 transform -translate-x-1/2 flex gap-2 items-center px-4 py-2 z-[9999] rounded-full"
    >
      <Image
        src={refresh}
        alt="refresh"
        width={12}
        className="transition-all duration-1000"
      />
      <button className="text-xs font-light text-white">Reload More</button>
    </div>
  );
};

export default RefreshButton;
