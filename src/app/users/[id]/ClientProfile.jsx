// app/users/[id]/ClientProfile.jsx (Client Component)
"use client"; // Mark this as a client component
import React, { useEffect, useState } from "react";

const ClientProfile = ({ user }) => {
  const [error, setError] = useState(null);

  useEffect(() => {
    if (!user) {
      setError("User data not available");
    }
  }, [user]);

  if (error) {
    return <div className="text-paragraph font-light">{error}</div>;
  }

  return <div>{/* Any client-side interactivity goes here */}</div>;
};

export default ClientProfile;
