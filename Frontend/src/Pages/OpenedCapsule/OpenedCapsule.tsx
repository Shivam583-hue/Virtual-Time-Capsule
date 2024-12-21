import { motion } from "framer-motion";
import { Capsule } from "../AllCapsules/Capsule";
import { backendUrl } from "@/App";
import axios from "axios";
import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";

const OpenedCapsule = () => {
  const [istext, setIstext] = useState(false);
  const [ispic, setIspic] = useState(false);
  const [capsule, setCapsule] = useState<Capsule>();
  const [images, setImages] = useState<string[]>([]);
  const [loading, setLoading] = useState(true);
  const [selectedImage, setSelectedImage] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);

  const { id } = useParams();

  const handleShare = () => {
    const text =
      "I just opened my digital time capsule! 🎉\nCheck out my memories and create your own at:";
    const url = `https://timecapsule-website.com/capsule/${capsule?.id}`;
    window.open(
      `https://twitter.com/intent/tweet?text=${encodeURIComponent(text)}&url=${encodeURIComponent(url)}&hashtags=DigitalTimeCapsule,Memories`,
      "_blank",
    );
  };

  const arrayBufferToBase64 = (buffer: { [key: string]: number }) => {
    try {
      const bytes = Object.values(buffer);
      const uint8Array = new Uint8Array(bytes);
      const blob = new Blob([uint8Array], { type: "image/png" });
      return URL.createObjectURL(blob);
    } catch (error) {
      console.error("Error converting image:", error);
      return null;
    }
  };

  useEffect(() => {
    const fetch = async () => {
      try {
        setLoading(true);
        setError(null);

        const response = await axios.get(`${backendUrl}/get/capsule/${id}`);
        setCapsule(response.data.data);

        if (Array.isArray(response.data.data.images)) {
          const processedImages = response.data.data.images
            .map((imageData: string) => {
              try {
                const parsedData = JSON.parse(imageData);
                return arrayBufferToBase64(parsedData);
              } catch (error) {
                console.error("Error processing image:", error);
                return null;
              }
            })
            .filter(Boolean);

          setImages(processedImages);
        }
      } catch (error) {
        console.error("Error fetching capsule:", error);
        setError("Failed to load capsule data");
      } finally {
        setLoading(false);
      }
    };
    fetch();

    return () => {
      images.forEach((url) => {
        if (url.startsWith("blob:")) {
          URL.revokeObjectURL(url);
        }
      });
    };
  }, [id]);

  if (loading) {
    return (
      <div className="flex items-center justify-center h-screen">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-[#6771b9]"></div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex items-center justify-center h-screen">
        <div className="text-red-500 font-mono">{error}</div>
      </div>
    );
  }

  return (
    <div className="flex items-center justify-center min-h-screen p-4">
      <div className="min-h-[620px] max-h-[80vh] rounded-xl w-full sm:w-[500px] md:w-[800px] bg-black bg-opacity-60 text-white shadow-lg flex flex-col transition-all duration-300">
        <div className="border-b border-[#6771b9] px-6 py-4">
          <h1 className="text-2xl font-mono font-semibold tracking-wide">
            {capsule?.title || "Untitled Capsule"}
          </h1>
        </div>

        <div>
          <motion.button
            whileHover={{ scale: 1.07 }}
            onClick={handleShare}
            whileTap={{ scale: 1 }}
            className="mt-4 ml-5 flex items-center focus:outline-none focus:ring-2 focus:ring-gray-500 focus:ring-offset-2 gap-2 px-4 py-2 
            rounded-2xl bg-gradient-to-r from-gray-700 to-gray-900 
            text-white font-bold shadow-lg
            hover:from-gray-600 hover:to-gray-800"
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
            <span className="text-lg font-mono font-semibold">Share</span>
          </motion.button>
        </div>

        <div className="flex-1 scrollbar-thin scrollbar-thumb-[#6771b9] scrollbar-track-transparent scrollbar-thumb-rounded-full overflow-y-auto p-4 space-y-4">
          {/* Notes Section */}
          <motion.div
            onClick={() => setIstext((prev) => !prev)}
            className="cursor-pointer bg-gradient-to-r from-gray-900 flex justify-between via-gray-800 to-[#6771b9] px-5 py-5 rounded-xl transform hover:-translate-y-2 duration-100"
          >
            <h1 className="font-mono font-bold text-lg text-gray-300">Notes</h1>
            <motion.svg
              xmlns="http://www.w3.org/2000/svg"
              height="24"
              viewBox="0 -960 960 960"
              width="24"
              fill="currentColor"
              animate={{ rotate: istext ? 180 : 0 }}
              transition={{ duration: 0.3 }}
            >
              <path d="M480-360 280-560h400L480-360Z" />
            </motion.svg>
          </motion.div>

          {istext && (
            <div className="bg-gradient-to-tr from-gray-900 via-gray-800 to-[#6771b9] px-5 py-5 rounded-xl">
              {capsule?.notes ? (
                <p className="font-mono font-semibold text-md text-gray-300 whitespace-pre-wrap">
                  {capsule.notes}
                </p>
              ) : (
                <p className="font-mono text-gray-400 italic">
                  No notes available
                </p>
              )}
            </div>
          )}

          {/* Images Section */}
          <motion.div
            onClick={() => setIspic((prev) => !prev)}
            className="cursor-pointer bg-gradient-to-r from-gray-900 flex justify-between via-gray-800 to-[#6771b9] px-5 py-5 rounded-xl transform hover:-translate-y-2 duration-100"
          >
            <h1 className="font-mono font-bold text-lg text-gray-300">
              Images
            </h1>
            <motion.svg
              xmlns="http://www.w3.org/2000/svg"
              height="24"
              viewBox="0 -960 960 960"
              width="24"
              fill="currentColor"
              animate={{ rotate: ispic ? 180 : 0 }}
              transition={{ duration: 0.3 }}
            >
              <path d="M480-360 280-560h400L480-360Z" />
            </motion.svg>
          </motion.div>

          {ispic && (
            <div className="bg-gradient-to-tr from-gray-900 via-gray-800 to-[#6771b9] px-5 py-5 rounded-xl">
              {images.length > 0 ? (
                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
                  {images.map((imageUrl, index) => (
                    <motion.div
                      key={index}
                      className="relative aspect-square overflow-hidden rounded-xl cursor-pointer"
                      whileHover={{ scale: 1.05 }}
                      onClick={() => setSelectedImage(imageUrl)}
                    >
                      <img
                        className="absolute inset-0 w-full h-full object-cover"
                        src={imageUrl}
                        alt={`Capsule image ${index + 1}`}
                        onError={(e) => {
                          console.error(`Error loading image ${index}`);
                          e.currentTarget.src = "/placeholder-image.jpg";
                        }}
                      />
                    </motion.div>
                  ))}
                </div>
              ) : (
                <p className="font-mono text-gray-400 italic text-center">
                  No images available
                </p>
              )}
            </div>
          )}
        </div>
      </div>

      {selectedImage && (
        <div
          className="fixed inset-0 bg-black bg-opacity-90 flex items-center justify-center z-50 p-4"
          onClick={() => setSelectedImage(null)}
        >
          <motion.img
            initial={{ scale: 0.9, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0.9, opacity: 0 }}
            src={selectedImage}
            alt="Selected capsule image"
            className="max-h-[90vh] max-w-[90vw] object-contain rounded-xl"
          />
        </div>
      )}
    </div>
  );
};

export default OpenedCapsule;
