import { motion } from "framer-motion";
import axios from "axios";
import toast from "react-hot-toast";
import logo from "../../assets/logo.png";
import { useAuthContext } from "@/context/AuthContext";

const Navbar = () => {
  const { authUser } = useAuthContext();
  const profilePic = authUser?.profilePicture;

  const handleLogout = async () => {
    try {
      await axios.get("http://localhost:5000/api/logout", {
        withCredentials: true,
      });
      window.location.reload();
    } catch (error) {
      console.error("Logout failed:", error);
      toast.error("Failed to log out. Please try again.");
    }
  };

  return (
    <div className="fixed top-0 w-full backdrop-blue-md bg-opacity-50 bg-black text-white shadow-md z-50">
      <div className="flex items-center justify-between px-4 md:px-8 py-2 mx-auto">
        <div className="flex items-center space-x-4">
          <img src={logo} alt="Logo" className="h-8 w-auto hidden md:block" />
        </div>

        <div className="flex items-center space-x-4">
          <motion.button
            whileHover={{ scale: 1.07 }}
            whileTap={{ scale: 0.95 }}
            className="px-3 md:px-4 py-1 text-sm md:text-base bg-[#495b87] hover:bg-[#4d4f87] text-white rounded-xl"
          >
            Create new capsule
          </motion.button>

          <motion.button
            onClick={handleLogout}
            whileHover={{ scale: 1.07 }}
            whileTap={{ scale: 0.95 }}
            className="flex items-center px-3 md:px-4 py-1 text-sm md:text-base bg-[#6770b8] hover:bg-[#8596d0] text-white rounded-xl"
          >
            <span className="hidden md:inline">Logout</span>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              height="24px"
              viewBox="0 -960 960 960"
              width="24px"
              fill="#e8eaed"
              className="ml-2"
            >
              <path d="M200-120q-33 0-56.5-23.5T120-200v-560q0-33 23.5-56.5T200-840h280v80H200v560h280v80H200Zm440-160-55-58 102-102H360v-80h327L585-622l55-58 200 200-200 200Z" />
            </svg>
          </motion.button>

          <div className="relative">
            {profilePic ? (
              <img
                src={profilePic}
                alt="Profile"
                className="h-8 w-8 md:h-10 md:w-10 rounded-full object-cover border-2 border-gray-600"
              />
            ) : (
              <div className="h-8 w-8 md:h-10 md:w-10 rounded-full bg-gray-700 flex items-center justify-center text-xs">
                N/A
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Navbar;
