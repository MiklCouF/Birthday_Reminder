// // /src/contexts/UserContext.js
// import { createContext, useState } from "react";

// // Vérifie si un user est stocké dans le localStorage
// const getInitialUser = () => {
//   const storedUser = localStorage.getItem("user");
//   return storedUser ? JSON.parse(storedUser) : null;
// };

// export const UserContext = createContext();

// export const UserProvider = ({ children }) => {
//   const [user, setUser] = useState(getInitialUser());

//   //  vérifier ou mettre à jour l'user avec le token en cookies, fais-le ici
//   //   useEffect(() => {
//   //  vérifier le token dans les cookies et mettre à jour user
//   // const token = getCookie("authtoken");
//   // if (token && !user) { ... }
//   //   }, [user]);

//   return (
//     <UserContext.Provider value={{ user, setUser }}>
//       {children}
//     </UserContext.Provider>
//   );
// };
