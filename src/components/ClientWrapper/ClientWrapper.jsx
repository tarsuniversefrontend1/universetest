"use client";
import React, { useState, useEffect } from "react";
import DefaultLogoLoader from "../DefaultLogoLoader/DefaultLogoLoader";

const ClientWrapper = ({ children }) => {
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Set the loader to display for 3 seconds
    const timer = setTimeout(() => {
      setLoading(false);
    }, 3000); // 3 seconds

    return () => clearTimeout(timer);
  }, []);

  return <>{loading ? <DefaultLogoLoader /> : <>{children}</>}</>;
};

export default ClientWrapper;
