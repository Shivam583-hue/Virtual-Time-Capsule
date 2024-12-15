import Home from "@/Pages/Home/Home";
import OpenedCapsule from "@/Pages/OpenedCapsule/OpenedCapsule";
import AllCapsules from "@/Pages/AllCapsules/AllCapsules";
import CreateCapsule from "@/Pages/CreateCapsule/CreateCapsule";
import Navbar from "@/Pages/Navbar/Navbar";

import { Route, Routes } from "react-router-dom";
import { Toaster } from "react-hot-toast";
import { useAuthContext } from "./context/AuthContext";

function App() {
  const { authUser } = useAuthContext();

  return (
    <div className=" h-screen w-full bg-gradient-to-b from-gray-900 via-[#2A2640] to-[#1E1B2F]">
      <Routes>
        <Route path="/home" element={<Home />} />
        <Route path="/" element={<Navbar />}>
          <Route path="/create" element={<CreateCapsule />} />
          <Route path="/" element={<AllCapsules />} />
          <Route path="/capsule" element={<OpenedCapsule />} />
        </Route>
      </Routes>
      <Toaster />
    </div>
  );
}

export default App;
