import { useEffect, useState } from "react";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import cancel from "../assets/cancel.png";
import edit from "../assets/edit.svg";
import valid from "../assets/check_green.svg";

function ReadAllFriends({ setShouldRerender, shouldRerender }) {
  // État pour stocker la liste des amis
  const [friendList, setfriendList] = useState([]);
  // État pour stocker l'ID de l'ami en cours d'édition
  const [editingFriendId, setEditingFriendId] = useState(null);
  // État pour stocker les données de l'ami en cours d'édition
  const [editedFriend, setEditedFriend] = useState({});

  // Fonction pour gérer le clic sur le bouton d'édition
  const handleEditClick = (friend) => {
    const { age_this_year, ...friendWithoutAge } = friend;
    // Définir l'ID de l'ami en cours d'édition
    setEditingFriendId(friend.id);
    // Copier les données de l'ami dans l'état editedFriend sans age_this_year
    setEditedFriend(friendWithoutAge);
  };

  // Fonction pour gérer les changements dans les champs de saisie
  const handleInputChange = (e) => {
    // Extraire le nom et la valeur du champ de saisie
    const { name, value } = e.target;
    // Mettre à jour la propriété correspondante dans l'état editedFriend
    setEditedFriend((prevEditedFriend) => {
      // Créer une copie de l'objet editedFriend précédent
      const updatedFriend = { ...prevEditedFriend };
      // Mettre à jour la propriété correspondante avec la nouvelle valeur
      updatedFriend[name] = value;
      // Retourner l'objet mis à jour pour mettre à jour l'état
      return updatedFriend;
    });
  };

  // Fonction pour soumettre les modifications de l'ami
  async function editSubmit(id) {
    fetch(`${import.meta.env.VITE_API_URL}/api/friend/${id}`, {
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
    fetch(`${import.meta.env.VITE_API_URL}/api/friend/${id}`, {
      method: "DELETE",
      credentials: "include", // Inclure les cookies
    })
      .then((response) => {
        if (response.ok) {
          toast.success("La personne a bien été retirée de la base de données");
          setShouldRerender(!shouldRerender);
        } else {
          toast.error("Erreur, la personne n'a pas été retirée");
        }
      })
      .catch((err) => {
        console.log(err);
        toast.warn(
          "Une erreur s'est produite lors de la tentative de suppression"
        );
      });
  }

  useEffect(
    function importAllFriend() {
      fetch(`${import.meta.env.VITE_API_URL}/api/friend/`, {
        method: "GET",
        credentials: "include", // Inclure les cookies
      })
        .then((response) => response.json())
        .then((data) => {
          console.log("Fetched data:", data);
          setfriendList(data);
        })
        .catch((error) => {
          console.error(
            "Une erreur s'est produite lors de la récupération des données:",
            error
          );
        });
    },
    [shouldRerender]
  );

  const friendListData = friendList || [];

  const friendListReady = Array.isArray(friendListData)
    ? friendListData.filter(
        (el) =>
          el.id &&
          el.firstname &&
          el.lastname &&
          el.formatted_birthday &&
          el.age_this_year
      )
    : [];

  return (
    <div className="add-data-core-user">
      <h2>Liste de tous les proches</h2>
      <div className="p-read-all-friends">
        <div className="inline">
          <img className="edit-icon" src={edit} />
          <p>Édition</p>
        </div>
        <div className="inline">
          <p>Supression</p>
          <img className="cancel-icon" src={cancel} />
        </div>
      </div>
      <div className="card-core">
        <input
          className="search-bar"
          type="text"
          name="firstname"
          // value={editedFriend.firstname}
          // onChange={handleInputChange}
        />
        <table className="table-current-month">
          <tbody>
            {friendListReady.length > 0 ? (
              friendListReady.map((el) => (
                <tr key={el.id}>
                  <td>
                    <img
                      className="edit-icon"
                      src={edit}
                      alt="Edit"
                      onClick={() => handleEditClick(el)} // Passer l'ID à la fonction
                    />
                  </td>
                  <td className="monthMap">
                    {editingFriendId === el.id ? (
                      <>
                        <input
                          type="text"
                          name="firstname"
                          value={editedFriend.firstname}
                          onChange={handleInputChange}
                        />
                        <input
                          type="text"
                          name="lastname"
                          value={editedFriend.lastname}
                          onChange={handleInputChange}
                        />
                      </>
                    ) : (
                      <>
                        <td className="">{el.firstname}</td>
                        <td className="">{el.lastname}</td>
                      </>
                    )}
                  </td>
                  <td className="padding-left-15">née le</td>
                  <td className="text-align-right">
                    {editingFriendId === el.id ? (
                      <input
                        type="date"
                        name="birthday"
                        value={editedFriend.birthday}
                        onChange={handleInputChange}
                      />
                    ) : (
                      el.formatted_birthday
                    )}
                  </td>
                  <td className="text-align-right">{el.age_this_year} ans</td>
                  <td>
                    {editingFriendId === el.id ? (
                      <img
                        className="valid-icon"
                        src={valid}
                        onClick={() => editSubmit(el.id)}
                        alt="Edit"
                      />
                    ) : (
                      <img
                        className="cancel-icon"
                        src={cancel}
                        onClick={() => deleteSubmit(el.id)} // Passer l'ID à la fonction
                        alt="Delete"
                      />
                    )}
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td>
                  <p>Vous n'avez pas encore de proche d'enregistrée.</p>
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default ReadAllFriends;
