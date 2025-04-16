import { useEffect, useState } from "react";
import { useUserData } from "../context/UserDataContext";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import cancel from "../assets/cancel.png";
import edit from "../assets/edit.svg";
import valid from "../assets/check_green.svg";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPen, faTrash } from "@fortawesome/free-solid-svg-icons";

function ReadAllFriends({ setShouldRerender, shouldRerender, openModal }) {
  // État pour stocker l'ID de l'ami en cours d'édition
  const [editingFriendId, setEditingFriendId] = useState(null);
  // État pour stocker les données de l'ami en cours d'édition
  const [editedFriend, setEditedFriend] = useState({});

  const [friendList, setFriendList] = useState([]);
  const { friendData, isLoading } = useUserData();

  useEffect(() => {
    if (Array.isArray(friendData)) {
      setFriendList(friendData);
    }
  }, [friendData]);

  if (isLoading) return <span className="loader"></span>;

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
      <span class="loader"></span>
      <span class="loader-delete">Deleting</span>
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
