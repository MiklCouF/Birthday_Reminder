import { createContext, useEffect, useMemo, useState } from "react";
import PropTypes from "prop-types";

export const AuthContext = createContext();

function AuthProvider({ children }) {
  const [user, setUser] = useState(null);

  useEffect(() => {
    // const credentials = localStorage.getItem("firstname");
    // if (credentials) {
      // setUser({ firstname: credentials });
      const firstname = localStorage.getItem("firstname");
      if (firstname) {
        setUser({ firstname});
      }
  }, []);


  const updateUser = (newUser) => {
    setUser(newUser);
    localStorage.setItem("firstname", newUser.firstname);
  };

  const contextValue = useMemo(() => ({
    user,
    setUser,
    updateUser
  }), [user])
 

  return (
    <AuthContext.Provider value={contextValue}>{children}</AuthContext.Provider>
  );
}

AuthProvider.propTypes = {
  children: PropTypes.node.isRequired,
};

export default AuthProvider;
