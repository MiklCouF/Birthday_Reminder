const fetchWithRedirect = async (url, options = {}) => {
    try {
      const response = await fetch(url, options);
  
      // Vérification du code de statut de la réponse
      if (response.status === 401) {
        window.location.href = "/login"; // Redirection vers la page /login
        throw new Error("Unauthorized - Redirecting to /login");
      }
  
      return response; // Retourne la réponse pour que le code appelant puisse la traiter
    } catch (error) {
      console.error("Erreur dans fetchWithRedirect :", error);
      throw error; // Propagation de l'erreur pour une gestion spécifique
    }
  };
  
  export default fetchWithRedirect;
  