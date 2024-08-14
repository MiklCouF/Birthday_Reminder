// import { useContext } from "react";
import AddData from "../components/AddData";
import MonthBirthday from "../components/MonthBirthday";
// temporaire, finira dans le header :
import { useUser } from '../context/UserProvider';

function User() {

// temporaire, finira dans le header :
  const { user } = useUser();

    // console.log('%c⧭', 'color: #8c0038', "user entier", user);

    // console.log('%c⧭', 'color: #99614d', "firstname de user", user.firstname);
    if (!user) {
      return <div>Chargement...</div>; // Ou rediriger vers une autre page
    }
    return (
      <main className="main-user">
        <h1>Bienvenue, {user.firstname}!</h1>
        <div className="component-user-page">
<AddData />
<MonthBirthday />

        </div>
      </main>
    );
  }
  
  export default User;
  