import { createContext, useContext, useState, useEffect } from "react";

const friendDataContext = createContext();

export const usefriendData = () => useContext(friendDataContext);

export const friendDataProvider = ({ children }) => {
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
      if (!res.ok) throw new Error("Fetch failed");

      const data = await res.json();
      setFriendData(data);
    } catch (err) {
      console.error("Erreur lors de la récupération des données utilisateur :", err);
    } finally {
      setIsLoading(false);
    }
  };

  const fetchfriendMonthData = async () => {
    try {
      setIsLoading(true);
      const res = await fetch(`${import.meta.env.VITE_API_URL}/api/friend/month`, {
        method: "GET",
        credentials: "include",
      });
      if (!res.ok) throw new Error("Fetch failed");

      const data = await res.json();
      setMonthFriendData(data);
    } catch (err) {
      console.error("Erreur lors de la récupération des données utilisateur :", err);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchfriendData();
    fetchfriendMonthData();
  }, []);

  return (
    <friendDataContext.Provider
      value={{
        friendData,
        setFriendData,
        monthFriendData,
        setMonthFriendData,
        fetchfriendMonthData,
        fetchfriendData,
        isLoading,
      }}
    >
      {children}
    </friendDataContext.Provider>
  );
};
