import * as Yup from "yup";

const PostSchema = Yup.object().shape({
  description: Yup.string()
    .max(500, "Description must be at most 500 characters")
    .optional(), 

  media: Yup.mixed().test(
    "fileType",
    "Only images and videos are allowed",
    (value) => {
      if (!value) return true; 
      const allowedTypes = [
        // Images
        "image/jpeg", // JPEG
        "image/png", // PNG
        "image/gif", // GIF
        "image/bmp", // BMP
        "image/webp", // WebP
        "image/svg+xml", // SVG

        // Videos
        "video/mp4", // MP4
        "video/avi", // AVI
        "video/mpeg", // MPEG
        "video/quicktime", // MOV
        "video/x-ms-wmv", // WMV
        "video/webm", // WebM
        "video/x-flv", // FLV
      ];

      return (
        value &&
        value.length &&
        value.every((file) => allowedTypes.includes(file.type))
      );
    }
  ),

  scheduled_at: Yup.date()
    .min(new Date(), "Scheduled time can't be in the past") // Ensure it's a future date
    .optional(), // Optional
});

export default PostSchema;
