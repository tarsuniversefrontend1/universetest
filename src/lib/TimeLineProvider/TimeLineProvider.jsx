"use client";
import {
  createContext,
  useState,
  useEffect,
  useContext,
  useCallback,
  useRef,
} from "react";
import axios from "axios";

const TimeLineContext = createContext();

export const useTimeLine = () => useContext(TimeLineContext);

export const TimeLineProvider = ({ children }) => {
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [page, setPage] = useState(1);

  const observer = useRef();


  const fetchPosts = useCallback(async () => {
    const token = localStorage.getItem("session");
    axios.defaults.headers.common["Authorization"] = `Bearer ${token}`;

    console.log("Token:", token); 

    setLoading(true);
    setError(null);

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

  let timeAgoStr = "";

  if (years > 1) {
    timeAgoStr = `${years} years ago`;
  } else if (years === 1) {
    timeAgoStr = "1 year ago";
  } else if (months > 1) {
    timeAgoStr = `${months} months ago`;
  } else if (months === 1) {
    timeAgoStr = "1 month ago";
  } else if (days > 1) {
    timeAgoStr = `${days} days ago`;
  } else if (days === 1) {
    timeAgoStr = "1 day ago";
  } else if (hours > 1) {
    timeAgoStr = `${hours} hours ago`;
  } else if (hours === 1) {
    timeAgoStr = "1 hour ago";
  } else if (minutes > 1) {
    timeAgoStr = `${minutes} minutes ago`;
  } else if (minutes === 1) {
    timeAgoStr = "1 minute ago";
  } else {
    timeAgoStr = "just now";
  }

  return timeAgoStr;
};

    try {
      setError("")
      const response = await axios.get(
        `https://tarsuniverse.net:8443/home?page=${page}&limit=5`,
        { withCredentials: true }
      );
      const fetchedPosts = response.data;
      console.log("fetch posts", fetchedPosts)

      if (Array.isArray(fetchedPosts)) {
        setError("")
        const newPosts = fetchedPosts.map((post) => ({
          ...post,
          created_at: calculateTimeAgo(post.created_at),
        }));

        setPosts((prevPosts) => {
          setError("")
          const allPosts = page === 1 ? newPosts : [...prevPosts, ...newPosts];
          const uniquePosts = Array.from(
            new Map(allPosts.map((post) => [post.id, post])).values()
          );
          return uniquePosts;
        });
      } else if (fetchedPosts === null) {
        setError("Post finished");
        return;
      } else {
        setError("Failed to load posts. Please try again.");
      }
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  }, [page]);

  const fetchMorePosts = useCallback(() => {
    if (!loading) {
      setPage((prevPage) => prevPage + 1);
    }
  }, [loading]);

  // Function to refetch posts with clearing posts first and delay
  const refetchPosts = useCallback(() => {
    setPosts([]); // Clear current posts
    setError("")
    setLoading(true); // Show loader
    setTimeout(() => {
      setError("")
      setPage(1); // Reset page to 1
      fetchPosts(); // Refetch posts
    }, 2000); // 2-second delay before refetching
  }, [fetchPosts]);

  useEffect(() => {
    fetchPosts();
  }, []);

  useEffect(() => {
    if (page > 1) {
      fetchPosts();
    }
  }, [page, fetchPosts]);

  const lastPostElementRef = useCallback(
    (node) => {
      if (loading) return;

      if (observer.current) observer.current.disconnect();

      observer.current = new IntersectionObserver((entries) => {
        if (
          entries[0].isIntersecting &&
          window.innerHeight + window.scrollY >= document.body.offsetHeight
        ) {
          fetchMorePosts();
        }
      });

      if (node) {
        observer.current.observe(node);
      }
    },
    [loading, fetchMorePosts]
  );

  const value = {
    posts: posts.sort(
      (a, b) => new Date(b.created_at) - new Date(a.created_at)
    ),
    fetchPosts,
    refetchPosts,
    loading,
    error,
    setError,
    fetchMorePosts,
    lastPostElementRef,
  };

  return (
    <TimeLineContext.Provider value={value}>
      {children}
    </TimeLineContext.Provider>
  );
};
