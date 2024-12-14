import { motion } from "framer-motion";
import { useState } from "react";

const CreateCapsule = () => {
  const [isText, setIsText] = useState(true);
  const [isFile, setIsFile] = useState(false);

  const baseClass =
    "font-mono pt-4 text-md font-semibold cursor-pointer transition-all duration-300";
  const inactiveClass = "text-gray-400 hover:text-purple-300";
  const activeClass =
    "text-white underline underline-offset-4 decoration-purple-500";

  function handleFiles() {
    setIsText(false);
    setIsFile(true);
  }
  function handleText() {
    setIsText(true);
    setIsFile(false);
  }

  return (
    <div className="flex items-center justify-center h-screen ">
      <div className="h-[500px] md:h-[600px] rounded-xl w-full sm:w-[500px] md:w-[800px] bg-black backdrop-purple-md bg-opacity-60 text-white shadow-lg">
        <div className="flex justify-around border-b border-[#6771b9] py-4">
          <h1
            onClick={handleText}
            className={`${baseClass} ${isText ? activeClass : inactiveClass}`}
          >
            Add text
          </h1>
          <h1
            onClick={handleFiles}
            className={`${baseClass} ${isFile ? activeClass : inactiveClass}`}
          >
            Upload Image
          </h1>
        </div>
        {isFile ? (
          <div className="flex justify-center items-center h-[calc(100%-80px)]">
            <motion.div
              whileHover={{ scale: 1.5 }}
              whileTap={{ scale: 1 }}
              className="flex justify-center items-center cursor-pointer"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                height="50px"
                viewBox="0 -960 960 960"
                width="50px"
                fill="#e8eaed"
              >
                <path d="M260-160q-91 0-155.5-63T40-377q0-78 47-139t123-78q25-92 100-149t170-57q117 0 198.5 81.5T760-520q69 8 114.5 59.5T920-340q0 75-52.5 127.5T740-160H520q-33 0-56.5-23.5T440-240v-206l-64 62-56-56 160-160 160 160-56 56-64-62v206h220q42 0 71-29t29-71q0-42-29-71t-71-29h-60v-80q0-83-58.5-141.5T480-720q-83 0-141.5 58.5T280-520h-20q-58 0-99 41t-41 99q0 58 41 99t99 41h100v80H260Zm220-280Z" />
              </svg>
            </motion.div>
          </div>
        ) : (
          <div className="p-4 h-[calc(100%-80px)] flex items-center">
            <textarea
              className="w-full h-full bg-transparent text-white border border-[#6771b9] focus:border-purple-900 focus:ring-2 focus:ring-purple-900 rounded-md p-3 resize-none placeholder-gray-400 focus:outline-none"
              placeholder="Write a note to your future self"
            />
          </div>
        )}
        <motion.button
          whileHover={{ scale: 1.07 }}
          whileTap={{ scale: 0.95 }}
          className="flex items-center justify-center px-3 md:px-4 py-1 text-sm md:text-base bg-[#6771b9] hover:bg-[#4d4f87] text-white rounded-xl"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 24 24"
            fill="currentColor"
            className="w-4 h-4"
          >
            <path d="M17.414 2.586a2 2 0 112.828 2.828l-14.83 14.83a1 1 0 01-.414.26l-4 1a1 1 0 01-1.225-1.225l1-4a1 1 0 01.26-.414l14.83-14.83zM16.586 4L4 16.586V19h2.414L20 7.414 16.586 4z" />
          </svg>

          <span className="pl-2"> Create capsule</span>
        </motion.button>
      </div>
    </div>
  );
};

export default CreateCapsule;
