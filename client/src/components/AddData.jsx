import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useState } from "react";

function AddData({ user, setShouldRerender, shouldRerender }) {
  const [isChecked, setIsChecked] = useState(0);

  async function handleSubmit(event) {
    event.preventDefault();

    const formData = new FormData(event.target);
    const data = Object.fromEntries(formData);
    console.log(data);
    console.log("formdata", formData);
    fetch(`${import.meta.env.VITE_API_URL}/api/friend/`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    })
      .then((res) => {
        if (res.ok) {
          setShouldRerender(!shouldRerender);
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
    <div className="add-data-core-user">
      <p>Ajouter la date d'anniversaire d'un proche</p>

      <div className="card-core">
        <form onSubmit={handleSubmit}>
          <input type="hidden" name="userId" value={user.id} />
          <p>Prénom:</p>
          <input
            type="text"
            id="firstname"
            name="firstname"
            placeholder="Martin"
            required
          />

          <p>Nom:</p>
          <input
            type="text"
            id="lastname"
            name="lastname"
            placeholder="Dubois"
            required
          />

          <p>Date de naissance</p>
          <input type="date" id="dateSubscribe" name="birthday" required />

          <div className="toggle-container">
            <p>Reçevoir un premier rappel 15jours avant</p>

            <label className="switch">
              <input
                type="checkbox"
                checked={isChecked === 1}
                onChange={() => setIsChecked(isChecked === 1 ? 0 : 1)}
                value={isChecked}
                id="reminder_15"
                name="reminder_15"
              />
              <span className="slider"></span>
            </label>
            <span className="toggle-label">{isChecked ? "Oui" : "Non"}</span>
          </div>
          <button
            type="submit"
            value="Ajouter"
            id="subscribe"
            className="subscribe"
          >
            Ajouter
          </button>
        </form>
      </div>
    </div>
  );
}

export default AddData;
