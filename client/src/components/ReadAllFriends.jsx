import { useEffect, useState, useMemo } from "react";
import { useUserData } from "../context/UserDataContext";
import cancel from "../assets/cancel.png";
import edit from "../assets/edit.svg";
import valid from "../assets/check_green.svg";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPen, faTrash } from "@fortawesome/free-solid-svg-icons";

function ReadAllFriends({ openModal }) {
  const [friendList, setFriendList] = useState([]);
  const { friendData, isLoading } = useUserData();
  const [sortConfig, setSortConfig] = useState({
    key: null,
    direction: "ascending",
  });

  useEffect(() => {
    if (Array.isArray(friendData)) {
      setFriendList(friendData);
    }
  }, [friendData]);

  if (isLoading) return <span className="loader"></span>;

  // Filtre et prépare la liste
  const friendListReady = (friendList || []).filter(
    (el) =>
      el.id &&
      el.firstname &&
      el.lastname &&
      el.formatted_birthday &&
      el.age_this_year
  );

  // Demande de tri par colonne
  const requestSort = (key) => {
    let direction = "ascending";
    if (sortConfig.key === key && sortConfig.direction === "ascending") {
      direction = "descending";
    }
    setSortConfig({ key, direction });
  };

  // Flèche de tri (⇅ par défaut, ▲ ou ▼ si tri actif)
  const getArrow = (key) => {
    if (sortConfig.key === key) {
      return sortConfig.direction === "ascending" ? " ▲" : " ▼";
    }
    return " ⇅";
  };

  // Liste triée (mémoisée)
  const sortedFriends = useMemo(() => {
    const items = [...friendListReady];
    if (!sortConfig.key) return items;

    items.sort((a, b) => {
      let aVal, bVal;
      switch (sortConfig.key) {
        case "firstname":
          aVal = a.firstname.toLowerCase();
          bVal = b.firstname.toLowerCase();
          break;
        case "lastname":
          aVal = a.lastname.toLowerCase();
          bVal = b.lastname.toLowerCase();
          break;
        case "birthday":
          // Tri sur le mois de naissance (format "DD-MM-YYYY"), cible le mois uniquement
          const [, aMonth] = a.formatted_birthday.split("-");
          const [, bMonth] = b.formatted_birthday.split("-");
          aVal = parseInt(aMonth, 10);
          bVal = parseInt(bMonth, 10);
          break;
        case "age":
          aVal = a.age_this_year;
          bVal = b.age_this_year;
          break;
        default:
          return 0;
      }
      if (aVal < bVal) return sortConfig.direction === "ascending" ? -1 : 1;
      if (aVal > bVal) return sortConfig.direction === "ascending" ? 1 : -1;
      return 0;
    });
    console.log("Sorted items:", items);
    return items;
  }, [friendListReady, sortConfig]);

  const handleEdit = (el) => {
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
              <th onClick={() => requestSort("firstname")}>
                Prénom{getArrow("firstname")}
              </th>
              <th onClick={() => requestSort("lastname")}>
                Nom{getArrow("lastname")}
              </th>
              <th
                style={{ minWidth: "150px", cursor: "pointer" }}
                onClick={() => requestSort("birthday")}
              >
                Date de naissance{getArrow("birthday")}
              </th>
              <th onClick={() => requestSort("age")}>Âge{getArrow("age")}</th>
            </tr>
          </thead>
          <tbody>
            {friendListReady.length > 0 ? (
              sortedFriends.map((el) => (
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
