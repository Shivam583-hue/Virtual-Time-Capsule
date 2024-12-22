import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";

export type Capsule = {
  id: string;
  title: string;
  images: string[];
  notes: string;
  releaseDate: Date;
  released: boolean;
  createdAt: Date;
  ownerId: string;
};

type Props = {
  capsule: Capsule;
};

const Capsule = ({ capsule }: Props) => {
  const id = capsule.id;
  const navigate = useNavigate();
  let a: boolean = false;
  if (capsule.released) {
    a = false;
  } else {
    a = true;
  }
  const unlocked = a;
  const title = capsule.title;
  const releaseDate = new Date(capsule.releaseDate).toLocaleDateString();

  const redirect = () => {
    navigate(`/capsule/${id}`);
  };

  return (
    <div>
      <motion.div
        whileHover={{ scale: 1.02 }}
        whileTap={{ scale: 0.98 }}
        className="flex justify-between items-center bg-gray-900 bg-opacity-80 w-full rounded-2xl px-4 py-2 shadow-md hover:shadow-lg transition-shadow duration-300"
      >
        <div className="flex flex-col">
          <h2 className="text-lg font-semibold text-white">{title}</h2>
          {unlocked ? null : (
            <p className="text-sm text-purple-600">
              🎉🎉 Time Capsule has been unsealed!
            </p>
          )}
        </div>
        {unlocked ? (
          <div className="text-right">
            <h2 className="text-sm md:text-base text-gray-300">
              Unlocking on: <span className="text-red-400">{releaseDate}</span>
            </h2>
          </div>
        ) : (
          <motion.button
            onClick={redirect}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="px-4 py-2 text-sm flex items-center md:text-base bg-[#6771b9] hover:bg-[#4d4f87] text-white rounded-full  shadow-lg shawdow-gray-700 transition-all duration-300"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              height="24px"
              viewBox="0 -960 960 960"
              width="24px"
              fill="#e8eaed"
            >
              <path d="m480-920 362 216q18 11 28 30t10 40v434q0 33-23.5 56.5T800-120H160q-33 0-56.5-23.5T80-200v-434q0-21 10-40t28-30l362-216Zm0 466 312-186-312-186-312 186 312 186Zm0 94L160-552v352h640v-352L480-360Zm0 160h320-640 320Z" />
            </svg>
            <span className="pl-1"> Open</span>
          </motion.button>
        )}
      </motion.div>
    </div>
  );
};

export default Capsule;
