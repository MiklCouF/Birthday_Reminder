import { Navigate } from "react-router-dom";
import { useEffect, useState } from "react";

const ProtectedRoute = ({ children }) => {
  const [isAuthorized, setIsAuthorized] = useState(null); // null = en attente, true = autorisé, false = non autorisé

  useEffect(() => {
    const checkAuth = async () => {
      try {
        const response = await fetch(
          `${import.meta.env.VITE_API_URL}/api/auth`,
          {
            method: "GET",
            credentials: "include",
          }
        );

        if (response.status === 202) {
          setIsAuthorized(true);
        } else {
          setIsAuthorized(false);
        }
      } catch (err) {
        setIsAuthorized(false);
      }
    };

    checkAuth();
  }, []);

  if (isAuthorized === null) {
    return <div>Chargement...</div>; // ou un loader
  }

  return isAuthorized ? children : <Navigate to="/login" />;
};

export default ProtectedRoute;
