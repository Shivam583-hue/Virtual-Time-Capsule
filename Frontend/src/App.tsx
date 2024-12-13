import Login from "./Login";
import Logout from "./Logout";

import { Toaster } from "react-hot-toast";
import { useAuthContext } from "./context/AuthContext";

function App() {
  const { authUser } = useAuthContext();
  console.log(authUser);

  return (
    <div className="bg-[#161a26]  h-screen w-full">
      <Login />
      <Logout />
      <Toaster />
    </div>
  );
}

export default App;
