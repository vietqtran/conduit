import { createContext, useContext, useEffect, useState } from "react";
import getUser from "../services/getUser";

const AuthContext = createContext();

export function useAuth() {
  return useContext(AuthContext);
}

const initialAuthState = {
  headers: null,
  isAuth: false,
  loggedUser: {
    bio: null,
    email: "",
    image: null,
    token: "",
    username: "",
  },
};

function AuthProvider({ children }) {
  const [authState, setAuthState] = useState(() => {
    const loggedIn = JSON.parse(localStorage.getItem("loggedUser"));
    return loggedIn ? { ...initialAuthState, ...loggedIn } : initialAuthState;
  });

  const { headers, isAuth, loggedUser } = authState;

  useEffect(() => {
    if (!headers) return;

    getUser({ headers })
      .then((loggedUser) => setAuthState((prev) => ({ ...prev, loggedUser })))
      .catch(console.error);
  }, [headers]);

  return (
    <AuthContext.Provider value={{ ...authState, setAuthState }}>
      {children}
    </AuthContext.Provider>
  );
}

export default AuthProvider;