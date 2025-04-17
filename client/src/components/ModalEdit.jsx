import { useState, useEffect } from "react";
import { toast } from "react-toastify";
import fetchWithRedirect from "../utils/fetchWithRedirect";
import { useUserData } from "../context/UserDataContext.jsx";

const ModalEdit = ({ isOpen, onClose, data }) => {
  if (!isOpen) return null;

  const [formData, setFormData] = useState({
    firstname: "",
    lastname: "",
    birthday: "",
    reminder_15: false,
    id: null,
  });
  const [showModal, setShowModal] = useState(false);

  const { fetchFriends } = useUserData();

  async function getFriend(id) {
    try {
      const response = await fetchWithRedirect(
        `${import.meta.env.VITE_API_URL}/api/friend/${id}`,
        {
          method: "GET",
          credentials: "include",
        }
      );
      if (response.ok) {
        const friendData = await response.json();
        friendData.reminder_15 = friendData.reminder_15?.data?.[0] === 1;
        setFormData(friendData);
      } else {
        console.error("Erreur de récupération :", response.status);
      }
    } catch (err) {
      console.error("Erreur réseau :", err);
    }
  }

  useEffect(() => {
    if (isOpen && data?.id) {
      getFriend(data.id);
    }
  }, [isOpen, data]);

  const handleInputChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!formData.firstname) {
      alert("Le prénom est requis");
      return;
    }

    editSubmit(formData);
    onClose();
  };

  async function editSubmit(formData) {
    fetchWithRedirect(
      `${import.meta.env.VITE_API_URL}/api/friend/${formData.id}`,
      {
        method: "PUT",
        credentials: "include",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      }
    ).then((response) => {
      if (response.ok) {
        toast.success("La personne a bien été éditée");
        fetchFriends();
        onClose();
      } else {
        toast.error("Erreur, la personne n'a pas été éditée");
      }
    });
  }

  async function deleteSubmit(id) {
    fetchWithRedirect(`${import.meta.env.VITE_API_URL}/api/friend/${id}`, {
      method: "DELETE",
      credentials: "include",
    })
      .then((response) => {
        if (response.ok) {
          toast.success("La personne a bien été retirée de la base de données");
          fetchFriends();
          onClose();
        } else {
          toast.error("Erreur, la personne n'a pas été retirée");
        }
      })
      .catch((err) => {
        console.log("Erreur réseau", err);
        toast.warn("Une erreur s'est produite lors de la suppression");
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
              value={formData.firstname || ""}
              onChange={handleInputChange}
            />

            <label htmlFor="lastname">Nom:</label>
            <input
              type="text"
              name="lastname"
              value={formData.lastname || ""}
              onChange={handleInputChange}
            />

            <label htmlFor="birthday">Date de naissance:</label>
            <input
              type="date"
              name="birthday"
              value={formData.birthday ? formData.birthday.split("T")[0] : ""}
              onChange={handleInputChange}
            />

            <label htmlFor="reminder_15">
              Rappel 15 jours avant:
              <input
                type="checkbox"
                name="reminder_15"
                checked={formData.reminder_15 || false}
                onChange={handleInputChange}
              />
            </label>

            <input type="hidden" name="id" value={formData.id || ""} />

            <button type="submit">Enregistrer</button>
            <button type="button" onClick={() => setShowModal(true)}>
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
                  deleteSubmit(formData.id);
                  setShowModal(false);
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
