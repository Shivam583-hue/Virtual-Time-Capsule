import Capsule from "./Capsule";

const AllCapsules = () => {
  return (
    <div className="flex items-center justify-center min-h-screen">
      <div className="h-[600px] rounded-xl w-full sm:w-[500px] md:w-[800px] bg-black bg-opacity-60 text-white shadow-2xl flex flex-col">
        <div className="border-b border-[#6771b9] px-6 py-4">
          <h1 className="text-xl font-mono font-semibold tracking-wide">
            Your Capsules
          </h1>
        </div>

        <div className="flex-1 overflow-y-auto p-4 space-y-4">
          <Capsule />
          <Capsule />
          <Capsule />
          <Capsule />
          <Capsule />
          <Capsule />
        </div>
      </div>
    </div>
  );
};

export default AllCapsules;
