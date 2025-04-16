// import React, {
//   createContext,
//   useState,
//   useMemo,
//   useContext,
//   useEffect,
// } from "react";

// const UserContext = createContext();

// export const UserProvider = ({ children }) => {
//   console.log(
//     "%c⧭",
//     "color: #994d75",
//     "log user avant le parse",
//     typeof user,
//     user
//   );
//   const [user, setUser] = useState(() => {
//     // Charger l'utilisateur depuis localStorage si disponible
//     const savedUser = localStorage.getItem("user");
//     return savedUser ? JSON.parse(savedUser) : null;
//   });

//   useEffect(() => {
//     // Sauvegarder l'utilisateur dans localStorage à chaque modification
//     if (user) {
//       console.log("%c⧭", "color: #00258ff", "on initie le localstorage ici");
//       localStorage.setItem("user", JSON.stringify(user));
//     } else {
//       localStorage.removeItem("user");
//     }
//   }, [user]);

//   const value = useMemo(() => ({ user, setUser }), [user]);
//   console.log("Valeur de user:", value);
//   return <UserContext.Provider value={value}>{children}</UserContext.Provider>;
// };

// export const useUser = () => useContext(UserContext);
