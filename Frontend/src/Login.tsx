import { useEffect, useState } from "react";
import axios from "axios";
import { motion } from "framer-motion";
import React from "react";
import { useAuthContext } from "./context/AuthContext";

const Login: React.FC = () => {
  const { setAuthUser } = useAuthContext();
  const [isLoading, setIsLoading] = useState(false);

  const handleGoogleLogin = () => {
    setIsLoading(true);
    window.location.href = "https://samaycapsule.onrender.com/api/auth/google";
  };

  const fetchUserData = async () => {
    try {
      const response = await axios.get(
        "https://samaycapsule.onrender.com/api/user/me",
        {
          withCredentials: true,
        },
      );
      setAuthUser(response.data);
    } catch (error) {
      console.error("Error fetching user data:", error);
    }
  };

  useEffect(() => {
    fetchUserData();
  }, []);

  return (
    <div className="pt-4 flex justify-center">
      <motion.button
        className="flex items-center justify-center gap-4 rounded-full bg-gradient-to-r from-[#6a77c1] to-[#4a56a1] px-6 py-3 text-white shadow-lg shadow-gray-700 hover:shadow-2xl"
        onClick={handleGoogleLogin}
        whileHover={{ scale: 1.07 }}
        whileTap={{ scale: 0.95 }}
        aria-label="Login with Google"
      >
        {isLoading ? (
          <span>Loading...</span>
        ) : (
          <>
            <svg
              width="24"
              height="24"
              viewBox="0 0 256 262"
              xmlns="http://www.w3.org/2000/svg"
              preserveAspectRatio="xMidYMid"
            >
              <path
                d="M255.878 133.451c0-10.734-.871-18.567-2.756-26.69H130.55v48.448h71.947c-1.45 12.04-9.283 30.172-26.69 42.356l-.244 1.622 38.755 30.023 2.685.268c24.659-22.774 38.875-56.282 38.875-96.027"
                fill="#ffffff"
              />
              <path
                d="M130.55 261.1c35.248 0 64.839-11.605 86.453-31.622l-41.196-31.913c-11.024 7.688-25.82 13.055-45.257 13.055-34.523 0-63.824-22.773-74.269-54.25l-1.531.13-40.298 31.187-.527 1.465C35.393 231.798 79.49 261.1 130.55 261.1"
                fill="#ffffff"
              />
              <path
                d="M56.281 156.37c-2.756-8.123-4.351-16.827-4.351-25.82 0-8.994 1.595-17.697 4.206-25.82l-.073-1.73L15.26 71.312l-1.335.635C5.077 89.644 0 109.517 0 130.55s5.077 40.905 13.925 58.602l42.356-32.782"
                fill="#ffffff"
              />
              <path
                d="M130.55 50.479c24.514 0 41.05 10.589 50.479 19.438l36.844-35.974C195.245 12.91 165.798 0 130.55 0 79.49 0 35.393 29.301 13.925 71.947l42.211 32.783c10.59-31.477 39.891-54.251 74.414-54.251"
                fill="#ffffff"
              />
            </svg>
            <span className="text-lg font-semibold">Login With Google</span>
          </>
        )}
      </motion.button>
    </div>
  );
};

export default Login;
