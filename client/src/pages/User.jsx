// import { useContext } from "react";
import { useState } from "react";
import AddData from "../components/AddData";
import MonthBirthday from "../components/MonthBirthday";
import ReadAllFriends from "../components/ReadAllFriends";
import { ToastContainer } from "react-toastify";
import { useUser } from "../context/UserProvider";
import SettingsCard from "../components/SettingsCard";

function User() {
  // re-rendre un composant lors de l'ajout d'un friend
  const [shouldRerender, setShouldRerender] = useState(false);
  async function fetchtest() {
    console.log("fetchtest");
    fetch(`${import.meta.env.VITE_API_URL}/api/send-email`, {
      method: "GET", // Utilisation d'une requête GET pour envoyer l'email
      // credentials: "include", // Inclure les cookies dans la requête
    })
      .then((response) => response.text()) // On récupère la réponse texte
      .then((data) => {
        alert(data); // Affiche la réponse (par exemple "Email envoyé avec succès")
      })
      .catch((error) => {
        console.error("Erreur lors de l'envoi de l'email:", error);
        alert("Une erreur est survenue.");
      });
  }
  async function fetchtest15() {
    console.log("fetchtest15");
    fetch(`${import.meta.env.VITE_API_URL}/api/test`, {
      method: "GET", // Utilisation d'une requête GET pour envoyer l'email
      // credentials: "include", // Inclure les cookies dans la requête
    })
      .then((response) => response.text()) // On récupère la réponse texte
      .then((data) => {
        alert(data); // Affiche la réponse (par exemple "Email envoyé avec succès")
      })
      .catch((error) => {
        console.error("Erreur lors de l'envoi de l'email:", error);
        alert("Une erreur est survenue.");
      });
  }

  const { user } = useUser();
  if (!user) {
    return <div className="error-connexion">Vous n'êtes pas connecté</div>;
  }
  return (
    <main className="main-user">
      <h3>Bienvenue, {user.firstname}!</h3>
      <div className="component-user-page">
        <AddData
          user={user}
          setShouldRerender={setShouldRerender}
          shouldRerender={shouldRerender}
        />
        <div>
          <button class="buttontempo" onClick={fetchtest}>
            test mail
          </button>
          <button class="buttontempo" onClick={fetchtest15}>
            test 15jr
          </button>
        </div>

        <MonthBirthday shouldRerender={shouldRerender} />
        <ReadAllFriends
          setShouldRerender={setShouldRerender}
          shouldRerender={shouldRerender}
        />
        <SettingsCard />
      </div>
      <ToastContainer position="bottom-center" />
    </main>
  );
}

export default User;
