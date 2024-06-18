import { createContext, useContext, useState, useEffect } from "react";
import { useRouter } from "next/router";
import { LOCAL_STORAGE_KEYS } from "@/constants";
import { AuthContextType, AuthProviderProps } from "@/types";

const { LOGIN_IDENTIFIER } = LOCAL_STORAGE_KEYS;

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider = ({ children }: AuthProviderProps) => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const router = useRouter();

  useEffect(() => {
    const authStatus = localStorage.getItem(LOGIN_IDENTIFIER) || "false";
    setIsAuthenticated(authStatus === "true" || JSON.parse(authStatus));
  }, []);

  const login = () => {
    setIsAuthenticated(true);
    localStorage.setItem(LOGIN_IDENTIFIER, "true");
    router.push("/");
  };

  const logout = () => {
    setIsAuthenticated(false);
    localStorage.removeItem("isAuthenticated");
    router.push("/login");
  };

  return (
    <AuthContext.Provider value={{ isAuthenticated, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = (): AuthContextType => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
};
