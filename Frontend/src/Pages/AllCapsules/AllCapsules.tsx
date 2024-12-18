import Capsule from "./Capsule";
import toast from "react-hot-toast";
import { useEffect, useState } from "react";
import axios from "axios";
import { useAuthContext } from "@/context/AuthContext";
import { backendUrl } from "@/App";

type CapsuleType = {
  id: string;
  title: string;
  notes: string;
  releaseDate: Date;
  released: boolean;
  createdAt: Date;
  ownerId: string;
};

const AllCapsules = () => {
  const { authUser } = useAuthContext();
  const [capsule, setCapsule] = useState<CapsuleType[]>([]);

  useEffect(() => {
    const fetch = async () => {
      try {
        const response = await axios.get(`${backendUrl}/capsules`, {
          data: { userId: authUser?.id },
        });
        setCapsule(response.data.data || []);
      } catch (error) {
        toast.error("The server didn't respond, please try again later");
        console.error("Error : ", error);
      }
    };

    fetch();
  }, [authUser?.id]);

  return (
    <div className="flex items-center justify-center min-h-screen">
      <div className="h-[600px] rounded-xl w-full sm:w-[500px] md:w-[800px] bg-black bg-opacity-60 text-white shadow-2xl flex flex-col">
        <div className="border-b border-[#6771b9] px-6 py-4">
          <h1 className="text-xl font-mono font-semibold tracking-wide">
            Your Capsules
          </h1>
        </div>

        <div className="flex-1 overflow-y-auto p-4 space-y-4">
          {capsule.length === 0 ? (
            <div className="">No Capsles created</div>
          ) : (
            capsule.map((capsule) => (
              <Capsule key={capsule.id} capsule={capsule} />
            ))
          )}
        </div>
      </div>
    </div>
  );
};

export default AllCapsules;
