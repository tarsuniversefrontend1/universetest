"use client";
import {
  createContext,
  useState,
  useEffect,
  useMemo,
  useCallback,
} from "react";
import axios from "axios";

export const UserContext = createContext(null);

export const UserProvider = ({ children }) => {
  const [user, setUser] = useState({});
  const [loading, setLoading] = useState(true);

  const updateUser = (newUserData) => {
    setUser((prevUser) => ({ ...prevUser, ...newUserData }));
  };

  const memoizedUser = useMemo(() => ({ ...user, loading }), [user, loading]);

  // Function to calculate human-readable time ago
  const calculateTimeAgo = (createdAt) => {
    const createdAtDate = new Date(createdAt);
    const now = new Date();
    const timeDiff = now - createdAtDate;

    const seconds = Math.floor(timeDiff / 1000);
    const minutes = Math.floor(seconds / 60);
    const hours = Math.floor(minutes / 60);
    const days = Math.floor(hours / 24);
    const months = Math.floor(days / 30);
    const years = Math.floor(days / 365);

    if (years > 1) return `${years} years ago`;
    if (years === 1) return "1 year ago";
    if (months > 1) return `${months} months ago`;
    if (months === 1) return "1 month ago";
    if (days > 1) return `${days} days ago`;
    if (days === 1) return "1 day ago";
    if (hours > 1) return `${hours} hours ago`;
    if (hours === 1) return "1 hour ago";
    if (minutes > 1) return `${minutes} minutes ago`;
    if (minutes === 1) return "1 minute ago";
    return "just now";
  };

const fetchUserProfile = useCallback(async () => {
  const token = localStorage.getItem("session");
  axios.defaults.headers.common["Authorization"] = `Bearer ${token}`;

  setLoading(true);
  try {
    const response = await axios.get("https://tarsuniverse.net:8443/profile", {
      withCredentials: true,
    });

    const updatedPosts = response.data.posts.map((post) => ({
      ...post,
      created_at: calculateTimeAgo(post.created_at),
    }));

    // Similar logic for events and projects...

    setUser({
      ...response.data,
      posts: updatedPosts,
      // include events and projects similarly
    });
  } catch (error) {
    console.error("Error fetching profile:", error);
  } finally {
    setLoading(false);
  }
}, []);


  // Fetch user profile on component mount
  useEffect(() => {
    fetchUserProfile();
  }, [fetchUserProfile]);

  // Context value includes user data and loading state
  const contextValue = useMemo(
    () => ({ user: memoizedUser, setUser, updateUser, loading }), // Pass loading state
    [memoizedUser, setUser, updateUser, loading] // Include all dependencies
  );

  // Provide context value to children
  return (
    <UserContext.Provider value={contextValue}>{children}</UserContext.Provider>
  );
};
