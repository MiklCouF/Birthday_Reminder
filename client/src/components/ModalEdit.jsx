import { useState, useEffect } from "react";
import { toast } from "react-toastify";
import fetchWithRedirect from "../utils/fetchWithRedirect"; // Assurez-vous que le chemin est correct

const ModalEdit = ({ isOpen, onClose, data, onSave }) => {
  if (!isOpen) return null;
  console.log("data", data);
  const [formData, setFormData] = useState(data || {});
  const [showModal, setShowModal] = useState(false);
  const [selectedId, setSelectedId] = useState(null);

  // Fonction pour récupérer l'ami à partir de l'ID
  async function getFriend(id) {
    try {
      const response = await fetchWithRedirect(
        `${import.meta.env.VITE_API_URL}/api/friend/${id}`,
        {
          method: "GET",
          credentials: "include", // Inclure les cookies
        }
      );
      if (response.ok) {
        const friendData = await response.json(); // Parse la réponse JSON
        friendData.reminder_15 = friendData.reminder_15?.data?.[0] === 1;
        console.log(friendData.reminder_15);

        console.table(friendData);
        setFormData(friendData); // Met à jour formData avec les données de l'ami
      } else {
        console.error(
          "Erreur lors de la récupération des données :",
          response.status
        );
      }
    } catch (err) {
      console.error("Erreur réseau :", err);
    }
  }

  // Effectuer le fetch lorsque la modal est ouverte et data contient un ID
  useEffect(() => {
    if (isOpen && data?.id) {
      getFriend(data.id); // Appelle la fonction avec l'ID de data
    }
  }, [isOpen, data]);

  const handleSubmit = (formdata) => {
    formdata.preventDefault(); // Empêche le rechargement de la page
    // Valider les données ici si nécessaire
    // Exemple de validation simple
    if (!formData.firstname) {
      alert("Le nom est requis");
      return;
    }
    // const formData = new FormData(e.target);
    // const values = Object.fromEntries(formData.entries());

    onSubmit(formData); // Sauvegarde les modifications
    onClose(); // Ferme la modal
  };

  async function onSubmit(formData) {
    console.log("formData onsubmit", formData);
  }

  // Fonction pour soumettre les modifications de l'ami
  async function editSubmit(id) {
    fetchWithRedirect(`${import.meta.env.VITE_API_URL}/api/friend/${id}`, {
      method: "PUT",
      credentials: "include", // Inclure les cookies
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(editedFriend),
    }).then((response) => {
      if (response.ok) {
        toast.success("La personne a bien été éditée");
        setEditingFriendId(null);
        setShouldRerender(!shouldRerender);
      } else {
        toast.error("Erreur, la personne n'a pas été éditée");
      }
    });
  }

  async function deleteSubmit(id) {
    fetchWithRedirect(`${import.meta.env.VITE_API_URL}/api/friend/${id}`, {
      method: "DELETE",
      credentials: "include", // Inclure les cookies
    })
      .then((response) => {
        if (response.ok) {
          // TODO retirer directement de la liste sans rerendre
          // setFriends(friends.filter((friend) => friend.id !== id));
          // setEditingFriendId(null);
          // setShouldRerender(!shouldRerender);

          toast.success("La personne a bien été retirée de la base de données");
          setShouldRerender(!shouldRerender);
        } else {
          // TODO Mettre en place le toast
          toast.error("Erreur, la personne n'a pas été retirée");
        }
      })
      .catch((err) => {
        console.log("oups", err);
        toast.warn(
          "Une erreur s'est produite lors de la tentative de suppression"
        );
      });
  }
  return (
    <>
      <div className="modal-backdrop">
        <div className="modal-content">
          <button className="modal-close" onClick={onClose}>
            x
          </button>
          <h2>Modifier les informations</h2>
          <form className="modal-content-main" onSubmit={handleSubmit}>
            <label htmlFor="firstname">Prénom:</label>
            <input
              type="text"
              name="firstname"
              defaultValue={formData.firstname}
            />
            <label htmlFor="lastname">Nom:</label>
            <input
              type="text"
              name="lastname"
              defaultValue={formData.lastname}
            />
            <label htmlFor="formatted_birthday">
              Date de naissance:
              <input
                type="date"
                name="birthday"
                defaultValue={
                  formData.birthday ? formData.birthday.split("T")[0] : ""
                }
              />
            </label>
            <label htmlFor="reminder_15">
              Rappel 15 jours avant:
              <input
                type="checkbox"
                name="reminder_15"
                defaultChecked={formData.reminder_15}
              />
            </label>
            <input type="hidden" name="id" defaultValue={formData.id} />
            <button type="submit">Enregistrer</button>
            <button
              type="button"
              onClick={() => {
                // setSelectedId(formData.id); // stocke l’id du contact
                setShowModal(true); // affiche la modal
              }}
            >
              Supprimer
            </button>
          </form>
        </div>
      </div>
      {showModal && (
        <div className="modal-backdrop">
          <div className="modal-content">
            <p>Êtes-vous sûr de vouloir supprimer ce contact ?</p>
            <div className="modal-buttons">
              <button onClick={() => setShowModal(false)}>Annuler</button>
              <button
                onClick={() => {
                  deleteSubmit(formData.id); // supprime
                  setShowModal(false); // ferme la modal
                }}
              >
                Confirmer
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default ModalEdit;
