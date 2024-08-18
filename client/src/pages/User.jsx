// import { useContext } from "react";
import { useState } from "react";
import AddData from "../components/AddData";
import MonthBirthday from "../components/MonthBirthday";
import ReadAllFriends from "../components/ReadAllFriends";
// temporaire, finira dans le header :
import { useUser } from '../context/UserProvider';

function User() {
  // re-rendre un composant lors de l'ajout d'un friend
  const [shouldRerender, setShouldRerender] = useState(false);

  const handleFormSubmit = () => {
    // Inverser l'état pour déclencher le re-rendu de Component2
    setShouldRerender(!shouldRerender);
  };

  // temporaire, finira dans le header :
  const { user } = useUser();

    // console.log('%c⧭', 'color: #8c0038', "user entier", user);

    // console.log('%c⧭', 'color: #99614d', "firstname de user", user.firstname);
    if (!user) {
      return <div>Vous n'êtes pas connecté</div>; // Ou rediriger vers une autre page
    }
    return (
      <main className="main-user">
        <h1>Bienvenue, {user.firstname}!</h1>
        <div className="component-user-page">
<AddData user={user} onFormSubmit={handleFormSubmit}/>
<MonthBirthday user={user} shouldRerender={shouldRerender}/>
<ReadAllFriends  shouldRerender={shouldRerender}/>

        </div>
      </main>
    );
  }
  
  export default User;
  