import { motion } from "framer-motion";
import { useState } from "react";

const OpenedCapsule = () => {
  const [istext, setIstext] = useState(false);
  const [ispic, setIspic] = useState(false);

  return (
    <div className="flex items-center justify-center h-screen">
      <div className="h-[620px] rounded-xl w-full sm:w-[500px] md:w-[800px] bg-black bg-opacity-60 text-white shadow-lg flex flex-col">
        <div className="border-b border-[#6771b9] px-6 py-4">
          <h1 className="text-2xl font-mono font-semibold tracking-wide">
            Capsule Name
          </h1>
        </div>
        <div>
          <motion.button
            whileHover={{ scale: 1.07 }}
            whileTap={{ scale: 1 }}
            className=" mt-4 ml-5 flex items-center focus:outline-none focus:ring-2 focus:ring-gray-500 focus:ring-offset-2 gap-2 px-4 py-2 
         rounded-2xl bg-gradient-to-r from-gray-700 to-gray-900 
         text-white font-bold shadow-lg
         hover:from-gray-600 hover:to-gray-800 "
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="14"
              height="14"
              fill="none"
              viewBox="0 0 1200 1227"
            >
              <path
                fill="#fff"
                d="M714.163 519.284 1160.89 0h-105.86L667.137 450.887 357.328 0H0l468.492 681.821L0 1226.37h105.866l409.625-476.152 327.181 476.152H1200L714.137 519.284h.026ZM569.165 687.828l-47.468-67.894-377.686-540.24h162.604l304.797 435.991 47.468 67.894 396.2 566.721H892.476L569.165 687.854v-.026Z"
              />
            </svg>
            <span className="pl-3 text-lg font-mono font-semibold flex items-center">
              Share
              <span className="pl-3">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  height="18px"
                  viewBox="0 -960 960 960"
                  width="18px"
                  fill="#e8eaed"
                >
                  <path d="M240-40q-33 0-56.5-23.5T160-120v-440q0-33 23.5-56.5T240-640h120v80H240v440h480v-440H600v-80h120q33 0 56.5 23.5T800-560v440q0 33-23.5 56.5T720-40H240Zm200-280v-447l-64 64-56-57 160-160 160 160-56 57-64-64v447h-80Z" />
                </svg>
              </span>
            </span>
          </motion.button>
        </div>
        {/*um this will be the text and images container*/}
        <div className="flex-1 overflow-y-auto p-4 space-y-4">
          {/*the text container*/}
          <motion.div
            onClick={() => setIstext((state) => !state)}
            className="cursor-pointer bg-gradient-to-r from-gray-900 flex justify-between via-gray-800 to-[#6771b9] px-5 py-5 rounded-xl transform hover:-translate-y-2 duration-100"
          >
            <h1 className="font-mono font-bold text-lg text-md text-gray-300">
              Notes
            </h1>
            {istext ? (
              <svg
                xmlns="http://www.w3.org/2000/svg"
                height="24px"
                viewBox="0 -960 960 960"
                width="24px"
                fill="#e8eaed"
              >
                <path d="M480-360 280-560h400L480-360Z" />
              </svg>
            ) : (
              <svg
                xmlns="http://www.w3.org/2000/svg"
                height="24px"
                viewBox="0 -960 960 960"
                width="24px"
                fill="#e8eaed"
              >
                <path d="M400-280v-400l200 200-200 200Z" />
              </svg>
            )}
          </motion.div>
          {istext ? (
            <div className="bg-gradient-to-tr from-gray-900 via-gray-800 to-[#6771b9] px-5 py-5 rounded-xl">
              <p className="font-mono font-semibold text-md text-gray-300">
                Lorem Ipsum is simply dummy text of the printing and typesetting
                industry. Lorem Ipsum has been the industry's standard dummy
                text ever since the 1500s, when an unknown printer took a galley
                of type and scrambled it to make a type specimen book. It has
                survived not only five centuries, but also the leap into
                electronic typesetting, remaining essentially unchanged. It was
                popularised in the 1960s with the release of Letraset sheets
                containing Lorem Ipsum passages, and more recently with desktop
                publishing software like Aldus PageMaker including versions of
                Lorem Ipsum.
              </p>
            </div>
          ) : null}
          <motion.div
            onClick={() => setIspic((state) => !state)}
            className="cursor-pointer bg-gradient-to-r from-gray-900 flex justify-between via-gray-800 to-[#6771b9] px-5 py-5 rounded-xl transform hover:-translate-y-2 duration-100"
          >
            <h1 className="font-mono font-bold text-lg text-md text-gray-300">
              Images
            </h1>
            {ispic ? (
              <svg
                xmlns="http://www.w3.org/2000/svg"
                height="24px"
                viewBox="0 -960 960 960"
                width="24px"
                fill="#e8eaed"
              >
                <path d="M480-360 280-560h400L480-360Z" />
              </svg>
            ) : (
              <svg
                xmlns="http://www.w3.org/2000/svg"
                height="24px"
                viewBox="0 -960 960 960"
                width="24px"
                fill="#e8eaed"
              >
                <path d="M400-280v-400l200 200-200 200Z" />
              </svg>
            )}
          </motion.div>
        </div>
      </div>
    </div>
  );
};

export default OpenedCapsule;
