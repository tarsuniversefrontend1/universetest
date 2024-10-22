import { useState, useRef } from "react";
import axios from "axios";

export const PostsFetch = (initialData = {}) => {
  const [postData, setPostData] = useState({
    text: "",
    privacy: "assets",
    location: null,
    scheduled_at: null,
    media: null,
    mediaPreviewUrl: null,
    ...initialData,
  });

  const [createLoading, setCreateLoading] = useState(false);
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(false);
  const [visibility, setVisibility] = useState("assets");
  const [response, setResponse] = useState();
  const [progress, setProgress] = useState(0);
  const [showProgress, setShowProgress] = useState(false);
  const [showSuccess, setShowSuccess] = useState(false);

  const fileInputRef = useRef(null); // Create a ref for the file input

  const handleTextChange = (e) => {
    setPostData((prev) => ({ ...prev, text: e.target.value }));
  };

  const setLocation = (location) => {
    setPostData((prev) => ({ ...prev, location }));
  };

  const scheduled_at = (date) => {
    setPostData((prev) => ({ ...prev, scheduled_at: date }));
  };

  const media = (e) => {
    const selectedFile = e?.target?.files[0];
    if (selectedFile) {
      const isValidMedia =
        selectedFile.type.startsWith("image/") ||
        selectedFile.type.startsWith("video/");
      if (isValidMedia) {
        setPostData((prev) => ({
          ...prev,
          media: selectedFile,
          mediaPreviewUrl: URL.createObjectURL(selectedFile),
        }));
        setError(null);
      } else {
        setError("Please select a valid image or video file.");
      }
    }
  };

  // Function to remove currently selected media
  const handleRemoveMedia = () => {
    setCreateLoading(true);
    setPostData((prev) => ({
      ...prev,
      media: null,
      mediaPreviewUrl: null,
    }));
    setError(null); // Clear any error message
    if (fileInputRef.current) {
      fileInputRef.current.value = ""; // Reset the file input value
    }
    console.log("Removing media", null); // Log the action
  };

  const submitPost = async () => {
    setCreateLoading(true);
    setError(null);
    setProgress(0);
    setShowProgress(true);
    setShowSuccess(false);

    const interval = setInterval(() => {
      setProgress((prev) => {
        if (prev < 100) {
          return prev + 100 / 100;
        }
        clearInterval(interval);
        return prev;
      });
    }, 80);

    const formData = new FormData();
    formData.append("text", postData.text);
    formData.append("privacy", postData.privacy);
    if (postData.location) formData.append("location", postData.location);
    if (postData.scheduled_at)
      formData.append("scheduled_at", postData.scheduled_at);
    if (postData.media) formData.append("media", postData.media);

    try {
      setCreateLoading(true);
      const response = await axios.post(
        "https://tarsuniverse.net:8443/createpost",
        formData,
        {
          headers: { "Content-Type": "multipart/form-data" },
          withCredentials: true,
        }
      );

      await new Promise((resolve) => setTimeout(resolve, 8000));

      clearInterval(interval);
      console.log(response);
      setResponse(response);
      if (response.status === 200) {
        console.log("You are posting......");
        setCreateLoading(true);
      }
      if (response.status === 201) {
        setCreateLoading(false);
        setSuccess(true);
        setPostData({
          text: "",
          privacy: "assets",
          location: null,
          scheduled_at: null,
          media: null,
          mediaPreviewUrl: null,
        });
      } else {
        setCreateLoading(false);
        throw new Error("Unexpected response status: " + response.status);
      }
    } catch (error) {
      setCreateLoading(false);
      setSuccess(false);
      setError("Failed to create post. Please try again.");
    } finally {
      setCreateLoading(false);
      setShowProgress(false);
      setShowSuccess(true);
      setTimeout(() => {
        setShowSuccess(false);
      }, 5000);
    }
  };

  return {
    postData,
    setPostData,
    createLoading,
    visibility,
    setVisibility,
    error,
    setError,
    success,
    handleTextChange,
    setLocation,
    scheduled_at,
    setProgress,
    media: (e) => {
      media(e);
      fileInputRef.current = e.target; // Set the ref for the file input
    },
    handleRemoveMedia, // Expose the remove media function
    response,
    progress,
    setShowProgress,
    showProgress,
    showSuccess,
    submitPost,
    fileInputRef, // Expose the ref
  };
};
