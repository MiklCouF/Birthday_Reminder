import { useEffect, useState } from "react";
import { useUserData } from "../context/UserDataContext";
import cancel from "../assets/cancel.png";
import edit from "../assets/edit.svg";
import valid from "../assets/check_green.svg";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPen, faTrash } from "@fortawesome/free-solid-svg-icons";

function ReadAllFriends({ openModal }) {
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
    <div className="card-wrapper">
      <h2>Liste de tous les proches</h2>
      {/* <span className="loader"></span> */}
      {/* <span className="loader-delete">Deleting</span> */}
      <div className="card-core">
        <div className="p-read-all-friends"></div>
        <table className="table-current-month">
          <colgroup>
            <col style={{ width: "25%" }} />
            <col style={{ width: "25%" }} />
            <col style={{ width: "25%" }} />
            <col style={{ width: "25%" }} />
          </colgroup>
          <thead>
            <tr>
              <th>Prénom</th>
              <th>Nom</th>
              <th>Date de naissance</th>
              <th>Âge</th>
            </tr>
          </thead>
          <tbody>
            {friendListReady.length > 0 ? (
              friendListReady.map((el) => (
                <tr
                  key={el.id}
                  id={`friend-${el.id}`}
                  onClick={() => handleEdit(el)}
                >
                  <td className="text-align-left">{el.firstname}</td>
                  <td className="text-align-left">{el.lastname}</td>
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
