// import { useContext } from "react";
import { useState } from "react";
import AddData from "../components/AddData";
import MonthBirthday from "../components/MonthBirthday";
import ReadAllFriends from "../components/ReadAllFriends";
import { ToastContainer } from "react-toastify";
import { useUser } from "../context/UserProvider";

function User() {
  // re-rendre un composant lors de l'ajout d'un friend
  const [shouldRerender, setShouldRerender] = useState(false);
  console.log(
    "%c⧭",
    "color: #00a3cc",
    "c'est le component user ici",
    shouldRerender,
  );

  const { user } = useUser();
  if (!user) {
    return <div className="error-connexion">Vous n'êtes pas connecté</div>; 
  }
  return (
    <main className="main-user">
      <h3>Bienvenue, {user.firstname}!</h3>
      <div className="component-user-page">
        <AddData
          user={user}
          setShouldRerender={setShouldRerender}
          shouldRerender={shouldRerender}
        />
        <MonthBirthday
          shouldRerender={shouldRerender}
        />
        <ReadAllFriends
          setShouldRerender={setShouldRerender}
          shouldRerender={shouldRerender}
        />
      </div>
      <ToastContainer position="bottom-center" />
    </main>
  );
}

export default User;
