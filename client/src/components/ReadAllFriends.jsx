import { useEffect, useState } from "react";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import cancel from "../assets/cancel.png";
import edit from "../assets/edit.svg";
import valid from "../assets/check_green.svg";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPen, faTrash } from "@fortawesome/free-solid-svg-icons";

function ReadAllFriends({ setShouldRerender, shouldRerender, openModal }) {
  // État pour stocker la liste des amis
  const [friendList, setfriendList] = useState([]);
  // État pour stocker l'ID de l'ami en cours d'édition
  const [editingFriendId, setEditingFriendId] = useState(null);
  // État pour stocker les données de l'ami en cours d'édition
  const [editedFriend, setEditedFriend] = useState({});

  // // Fonction pour gérer le clic sur le bouton d'édition
  // const handleEditClick = (friend) => {
  //   const { age_this_year, ...friendWithoutAge } = friend;
  //   // Définir l'ID de l'ami en cours d'édition
  //   setEditingFriendId(friend.id);
  //   // Copier les données de l'ami dans l'état editedFriend sans age_this_year
  //   setEditedFriend(friendWithoutAge);
  // };

  // // Fonction pour gérer les changements dans les champs de saisie
  // const handleInputChange = (e) => {
  //   // Extraire le nom et la valeur du champ de saisie
  //   const { name, value } = e.target;
  //   // Mettre à jour la propriété correspondante dans l'état editedFriend
  //   setEditedFriend((prevEditedFriend) => {
  //     // Créer une copie de l'objet editedFriend précédent
  //     const updatedFriend = { ...prevEditedFriend };
  //     // Mettre à jour la propriété correspondante avec la nouvelle valeur
  //     updatedFriend[name] = value;
  //     // Retourner l'objet mis à jour pour mettre à jour l'état
  //     return updatedFriend;
  //   });
  // };

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

  const handleEdit = (el) => {
    console.log("log el", el);
    const formEdit = friendList.find((friend) => friend.id === el.id);
    openModal(formEdit);
  };

  return (
    <div className="add-data-core-user">
      <h2>Liste de tous les proches</h2>
      <div className="card-core">
        <div className="p-read-all-friends"></div>
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
                <tr
                  key={el.id}
                  id={`friend-${el.id}`}
                  onClick={() => handleEdit(el)}
                >
                  <td className="monthMap">
                    {el.firstname} {el.lastname}
                  </td>
                  <td className="padding-left-15">née le</td>
                  <td className="text-align-right">{el.formatted_birthday}</td>
                  <td className="text-align-right">{el.age_this_year} ans</td>
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
