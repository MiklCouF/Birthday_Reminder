import { useContext } from "react";
import AddData from "../components/AddData";
import MonthBirthday from "../components/MonthBirthday";


function User() {
  const { user } = useContext(AuthContext);

    return (
      <main className="main-user">
        <h2> Bonjour {user?.firstname || "petit bouchon"}</h2>
        <div className="component-user-page">
<AddData />
<MonthBirthday />

        </div>
      </main>
    );
  }
  
  export default User;
  