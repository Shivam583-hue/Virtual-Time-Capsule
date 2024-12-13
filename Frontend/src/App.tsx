import Logout from "@/Logout";
import Home from "@/Pages/Home/Home";

import { Route, Routes } from "react-router-dom";
import { Toaster } from "react-hot-toast";
import { useAuthContext } from "./context/AuthContext";

function App() {
  const { authUser } = useAuthContext();

  return (
    <div className="bg-[#161a26]  h-screen w-full">
      <Routes>
        <Route path="/home" element={<Home />} />
      </Routes>
      <Logout />
      <Toaster />
    </div>
  );
}

export default App;
