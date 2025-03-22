import { createContext, useContext, useEffect, useState } from "react";
import { jwtDecode } from "jwt-decode";
import axios from 'axios'

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const token = localStorage.getItem("token");
        if (!token) return;
  
        const decoded = JSON.parse(atob(token.split(".")[1])); // Decode JWT
        const res = await axios.get(`${import.meta.env.VITE_BACKEND_URI}/user/${decoded._id}`);
  
        setUser(res.data); // Update auth state
      } catch (err) {
        console.error("Failed to fetch user data", err);
      }
    };
    fetchUser();
  }, []);


  return (
       <AuthContext.Provider value={{ user, setUser }}>
        {children}
      </AuthContext.Provider>
  )
};

export const useAuth = () => useContext(AuthContext);
