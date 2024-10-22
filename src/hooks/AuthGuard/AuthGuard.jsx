"use client";
import { useEffect, useState } from "react";
import { useRouter, usePathname } from "next/navigation";
import axios from "axios";

const AuthGuard = ({ children }) => {
  const router = useRouter();
  const pathname = usePathname();
  const [initialized, setInitialized] = useState(false);

  const publicRoutes = [
    "/auth/signIn/",
    "/auth/signUp/",
    "/auth/signUp/otp/",
    "/auth/signUp/success/",
    "/auth/resetPassword/",
    "/auth/resetPassword/success/",
    "/auth/resetPassword/otp/",
    "/auth/resetPassword/passwordRecovery/",
  ];

  useEffect(() => {
    const checkProfile = async () => {
      try {
        const response = await axios.get(
          "https://tarsuniverse.net:8443/profile",
          { withCredentials: true }
        );
console.log(response)
        if (response.status === 200 && publicRoutes.includes(pathname)) {
          console.log("User authenticated. Redirecting to /home.");
          router.push("/home");
        }
      } catch (error) {
        console.error("Error fetching profile or unauthenticated user:", error);

        if (!publicRoutes.includes(pathname)) {
          router.push("/");
        }
      } finally {
        // Ensure we mark initialization as complete
        setInitialized(true);
      }
    };

    // Only check once on initial mount
    if (!initialized) {
      checkProfile();
    }
  }, [router, pathname, initialized]);

  // Prevent rendering children until authentication is checked
  if (!initialized) {
    return null; // Or render a loading spinner
  }

  return <>{children}</>;
};

export default AuthGuard;
