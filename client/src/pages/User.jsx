import { useState } from "react";
import AddData from "../components/AddData";
import MonthBirthday from "../components/MonthBirthday";
import ReadAllFriends from "../components/ReadAllFriends";
import { ToastContainer } from "react-toastify";
import SettingsCard from "../components/SettingsCard";
import { useOutletContext } from "react-router-dom";
import { useUserData } from "../context/UserDataContext";

function User() {
  const { openModal } = useOutletContext();
  // re-rendre un composant lors de l'ajout d'un friend
  const [shouldRerender, setShouldRerender] = useState(false);

  const { friendData, fetchFriends, isLoading } = useUserData();
  if (isLoading) return <span className="loader"></span>;
  if (!friendData) {
    fetchFriends();
  }

  // async function fetchtest() {
  //   console.log("fetchtest");
  //   fetch(`${import.meta.env.VITE_API_URL}/api/send-email`, {
  //     method: "GET", // Utilisation d'une requête GET pour envoyer l'email
  //     // credentials: "include", // Inclure les cookies dans la requête
  //   })
  //     .then((response) => response.text()) // On récupère la réponse texte
  //     .then((data) => {
  //       alert(data); // Affiche la réponse (par exemple "Email envoyé avec succès")
  //     })
  //     .catch((error) => {
  //       console.error("Erreur lors de l'envoi de l'email:", error);
  //       alert("Une erreur est survenue.");
  //     });
  // }
  // async function fetchtest15() {
  //   console.log("fetchtest15");
  //   fetch(`${import.meta.env.VITE_API_URL}/api/test`, {
  //     method: "GET", // Utilisation d'une requête GET pour envoyer l'email
  //     // credentials: "include", // Inclure les cookies dans la requête
  //   })
  //     .then((response) => response.text()) // On récupère la réponse texte
  //     .then((data) => {
  //       alert(data); // Affiche la réponse (par exemple "Email envoyé avec succès")
  //     })
  //     .catch((error) => {
  //       console.error("Erreur lors de l'envoi de l'email:", error);
  //       alert("Une erreur est survenue.");
  //     });
  // }
  const userString = localStorage.getItem("user");
  const user = JSON.parse(userString);

  return (
    <main className="main-user">
      <h3>Bienvenue, {user.firstname}!</h3>
      <div className="main-container-user">
        <div className="container-top-user">
          <AddData
            user={user}
            setShouldRerender={setShouldRerender}
            shouldRerender={shouldRerender}
            className="component-user-page"
          />
          {/* <div>
          <button class="buttontempo" onClick={fetchtest}>
            test mail
          </button>
          <button class="buttontempo" onClick={fetchtest15}>
            test 15jr
          </button>
        </div> */}

          <MonthBirthday
            className="component-user-page"
            shouldRerender={shouldRerender}
            openModal={openModal}
          />
        </div>
        <div className="container-bottom-user">
          <ReadAllFriends
            setShouldRerender={setShouldRerender}
            shouldRerender={shouldRerender}
            className="component-user-page"
            openModal={openModal}
          />
        </div>
      </div>
      <SettingsCard className="component-user-page" />

      <ToastContainer position="bottom-center" />
    </main>
  );
}

export default User;
