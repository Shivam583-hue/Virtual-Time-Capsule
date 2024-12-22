import {
  createContext,
  useContext,
  useState,
  ReactNode,
  useEffect,
} from "react";
import axios from "axios";

interface AuthUser {
  id: string;
  name: string;
  email: string;
  profilePicture: string;
}

interface AuthContextType {
  authUser: AuthUser | null;
  setAuthUser: React.Dispatch<React.SetStateAction<AuthUser | null>>;
}

export const AuthContext = createContext<AuthContextType | undefined>(
  undefined,
);

export const useAuthContext = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error(
      "useAuthContext must be used within an AuthContextProvider",
    );
  }
  return context;
};

interface AuthContextProviderProps {
  children: ReactNode;
}

export const AuthContextProvider = ({ children }: AuthContextProviderProps) => {
  const [authUser, setAuthUser] = useState<AuthUser | null>(() => {
    try {
      return JSON.parse(localStorage.getItem("time-capsule-user") || "null");
    } catch {
      return null;
    }
  });

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const token = document.cookie
          .split('; ')
          .find((row) => row.startsWith('token='))
          ?.split('=')[1]; 
    
        if (!token) {
          throw new Error("Token not found in cookies.");
        }
    
        const response = await axios.get(
          "https://samaycapsule.onrender.com/api/user/me",
          {
            headers: {
              Cookie: `token=${token}`, 
            },
            withCredentials: true, 
          },
        );
        setAuthUser(response.data);
        localStorage.setItem(
          "time-capsule-user",
          JSON.stringify(response.data),
        );
      } catch (error) {
        console.error("Error fetching user data:", error);
      }
    };

    if (!authUser) {
      fetchUserData();
    }
  }, [authUser]);

  return (
    <AuthContext.Provider value={{ authUser, setAuthUser }}>
      {children}
    </AuthContext.Provider>
  );
};
