import { useEffect, useState } from "react";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import cancel from "../assets/cancel.png";
import edit from "../assets/edit.svg";

function ReadAllFriends({ setShouldRerender, shouldRerender }) {
  const [friendList, setfriendList] = useState([]);

  console.log("%c⧭", "color: #733d00", "ici c'est ReadAllFriends", shouldRerender);

  // **************************************************************************************
  // function pour éditer un friend
  // **************************************************************************************
async function editSubmit(id) {
  console.log("%c⧭", "color: #ffa640", "friendId", id);
  // Effectue la requête fetch pour éditer le friend
  fetch(`${import.meta.env.VITE_API_URL}/api/friend/${id}`, {
    method: "PUT",
    credentials: "include", // Inclure les cookies
  })
    .then((response) => {
      if (response.ok) {
        toast.success("La personne a bien été éditée");
      } else {
        toast.error("Erreur, la personne n'a pas été éditée");
      }
    })
  }


  // **************************************************************************************
  // function pour supprimer un friend
  // **************************************************************************************

  async function deleteSubmit(id) {
    // preventDefault(id);

    console.log("%c⧭", "color: #ffa640", "friendId", id);
    // Effectue la requête fetch pour supprimer le friend
    fetch(`${import.meta.env.VITE_API_URL}/api/friend/${id}`, {
      method: "DELETE",
      credentials: "include", // Inclure les cookies
    })
      .then((response) => {
        if (response.ok) {
          toast.success("La personne a bien été retirée de la base de données");
        } else {
          toast.error("Erreur, la personne n'a pas été retirée");
        }
      })

      .catch((err) => {
        console.log(err);
        toast.warn(
          "Une erreur s'est produite lors de la tentative de suppression",
        );
      });
    setShouldRerender(!shouldRerender);
    return null;
  }
  // **************************************************************************************

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
            error,
          );
        });
    },
    [shouldRerender],
  );

  const friendListData = friendList || [];

  const friendListReady = Array.isArray(friendListData)
    ? friendListData.filter(
        (el) =>
          el.id &&
          el.firstname &&
          el.lastname &&
          el.formatted_birthday &&
          el.age_this_year,
      )
    : [];
  return (
    <div className="add-data-core-user">
      <div className="card-core">
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
                    onClick={() => editSubmit(el.id)} // Passer l'ID à la fonction
                    />
                  </td>
                  <td className="monthMap">
                    {el.firstname} {el.lastname}
                  </td>
                  <td className="padding-left-15">née le</td>
                  <td className="text-align-right">{el.formatted_birthday}</td>
                  <td className="text-align-right">
                    ( {el.age_this_year} ans )
                  </td>
                  <td>
                    <img
                      className="cancel-icon"
                      src={cancel}
                      onClick={() => deleteSubmit(el.id)} // Passer l'ID à la fonction
                      alt="Delete"
                    />
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
