import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

function AddData({ user, setShouldRerender, shouldRerender }) {
  async function handleSubmit(event) {
    event.preventDefault();

    const formData = new FormData(event.target);
    const data = Object.fromEntries(formData);

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
