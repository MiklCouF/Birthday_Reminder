// import { useContext } from "react";
import AddData from "../components/AddData";
import MonthBirthday from "../components/MonthBirthday";
// temporaire, finira dans le header :
import { useUser } from './UserContext';

function User() {
  
// temporaire, finira dans le header :
  const { user } = useUser();

    return (
      <main className="main-user">
        <h1>Bienvenue, {user?.firstname}!</h1>
        <h2>cd</h2>
        <div className="component-user-page">
<AddData />
<MonthBirthday />

        </div>
      </main>
    );
  }
  
  export default User;
  