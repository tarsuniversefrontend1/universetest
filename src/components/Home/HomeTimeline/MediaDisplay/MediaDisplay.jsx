"use client";
import Image from "next/image";

const MediaDisplay = ({ mediaUrl }) => {
  const isVideo =
    mediaUrl.endsWith(".mp4") ||
    mediaUrl.endsWith(".webm") ||
    mediaUrl.endsWith(".mkv") ||
    mediaUrl.endsWith(".mov") ||
    mediaUrl.endsWith(".avi") ||
    mediaUrl.endsWith(".wmv") ||
    mediaUrl.endsWith(".flv");
  const isImage =
    mediaUrl.endsWith(".jpg") ||
    mediaUrl.endsWith(".jpeg") ||
    mediaUrl.endsWith(".png") ||
    mediaUrl.endsWith(".gif") ||
    mediaUrl.endsWith(".avif") ||
    mediaUrl.endsWith(".jfif") ||
    mediaUrl.endsWith(".svg") ||
    mediaUrl.endsWith(".webp");

  return (
    <div className="relative w-full">
      {isVideo && (
        <video controls width="100%" className="rounded-xl">
          <source src={mediaUrl} type="video/webm" />
          Your browser does not support the video tag.
        </video>
      )}
      {isImage && (
        <Image
          loading="lazy"
          src={mediaUrl}
          alt="post media"
          width={600}
          height={400}
          className="w-full rounded-xl h-auto"
        />
      )}
    </div>
  );
};

export default MediaDisplay;
