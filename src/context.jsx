import { createContext, useContext, useEffect } from "react";
import useFetch from "./hooks/use-fetch";
import { getCurrentUser } from "./db/apiAuth";

const AuthContext = createContext();

const AuthProvider = ({ children }) => {
  const { data: user, loading, fn: fetchUser } = useFetch(getCurrentUser);
  const isAuthenticated = user?.role === "authenticated";
  useEffect(() => {
    fetchUser();
  }, []);
  return (
    <AuthContext.Provider value={{ user, fetchUser, loading, isAuthenticated }}>
      {children}
    </AuthContext.Provider>
  );
};
export const authState = () => {
  return useContext(AuthContext);
};
export default AuthProvider;
