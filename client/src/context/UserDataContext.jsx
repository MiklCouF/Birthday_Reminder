import { createContext, useContext, useState, useEffect } from "react";

const UserDataContext = createContext();

export const useUserData = () => useContext(UserDataContext);

export const UserDataProvider = ({ children }) => {
  const [friendData, setFriendData] = useState(null);
  const [monthFriendData, setMonthFriendData] = useState(null);
  const [isLoading, setIsLoading] = useState(true);

  const fetchfriendData = async () => {
    try {
      setIsLoading(true);
      const res = await fetch(`${import.meta.env.VITE_API_URL}/api/friend/`, {
        method: "GET",
        credentials: "include",
      });
      if (!res.ok) return;
      const data = await res.json();
      console.log("Fetched friend data :", data);
      setFriendData(data);
    } catch (err) {
      console.error(
        "Erreur lors de la récupération des données utilisateur :",
        err
      );
    } finally {
      setIsLoading(false);
    }
  };

  const fetchfriendMonthData = async () => {
    try {
      setIsLoading(true);
      const res = await fetch(
        `${import.meta.env.VITE_API_URL}/api/friend/month`,
        {
          method: "GET",
          credentials: "include",
        }
      );
      if (!res.ok) return;
      const data = await res.json();
      console.log("Fetched month data :", data);
      setMonthFriendData(data);
    } catch (err) {
      console.error(
        "Erreur lors de la récupération des données utilisateur :",
        err
      );
    } finally {
      setIsLoading(false);
    }
  };

  const fetchFriends = () => {
    fetchfriendData();
    fetchfriendMonthData();
  };

  useEffect(() => {
    fetchfriendData();
    fetchfriendMonthData();
  }, []);

  return (
    <UserDataContext.Provider
      value={{
        friendData,
        setFriendData,
        monthFriendData,
        setMonthFriendData,
        fetchfriendMonthData,
        fetchfriendData,
        fetchFriends,
        isLoading,
      }}
    >
      {children}
    </UserDataContext.Provider>
  );
};
