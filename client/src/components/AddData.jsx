import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useState } from "react";
import fetchWithRedirect from "../utils/fetchWithRedirect";
import { useUserData } from "../context/UserDataContext.jsx";
import AutocompleteLastnames from "./AutocompleteLastnames";

function AddData({ user }) {
  const [isChecked, setIsChecked] = useState(0);
  const { fetchFriends } = useUserData();

  async function handleSubmit(event) {
    event.preventDefault();

    const formData = new FormData(event.target);
    const data = Object.fromEntries(formData);
    console.log(data);
    console.log("formdata", formData);
    fetchWithRedirect(`${import.meta.env.VITE_API_URL}/api/friend/`, {
      method: "POST",
      credentials: "include",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    })
      .then((res) => {
        if (res.ok) {
          fetchFriends();
          toast.success("La personne a bien été ajoutée");
        } else {
          toast.error("Erreur, la personne n'a pas été ajoutée");
        }
      })
      .catch(() => {
        toast.warn("Une erreur s'est produite lors de la tentative d'ajout");
      });
  }
  // async function sendmail(event) {
  //   event.preventDefault();
  //   console.log("sendmail du front");

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

  return (
    <>
      <div className="card-wrapper">
        <div className="card-core">
          <h2 className="h2-add">Ajout d'un proche</h2>
          <form autoComplete="off" onSubmit={handleSubmit}>
            <input type="hidden" name="userId" value={user.id} />
            <label htmlFor="firstname">
              <p className="label">Prénom:</p>
              <input
                type="text"
                className="input"
                id="firstname"
                name="firstname"
                placeholder="Martin"
                required
              />
            </label>
            <label htmlFor="lastname">
              <p className="label">Nom de famille:</p>
              <AutocompleteLastnames />
            </label>
            <label htmlFor="birthday">
              <p className="label">Date de naissance</p>
              <input
                type="date"
                className="input"
                id="dateSubscribe"
                name="birthday"
                required
              />
            </label>

            <div className="toggle-container">
              <p>Recevoir un premier rappel 15 jours avant</p>
              <div className="switch-container">
                <label className="switch">
                  <input
                    type="checkbox"
                    className="input"
                    checked={isChecked === 1}
                    onChange={() => setIsChecked(isChecked === 1 ? 0 : 1)}
                    value={isChecked}
                    id="reminder_15"
                    name="reminder_15"
                  />
                  <p className="slider"></p>
                </label>
                <p className="toggle-label">{isChecked ? "Oui" : "Non"}</p>
              </div>
            </div>
            <button
              type="submit"
              value="Ajouter"
              id="subscribe"
              className="button-primary"
            >
              Ajouter
            </button>
          </form>
        </div>
      </div>
    </>
  );
}

export default AddData;
