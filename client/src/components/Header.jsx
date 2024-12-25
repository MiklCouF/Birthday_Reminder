import { useEffect } from "react";
import { NavLink } from "react-router-dom";
import { useUser } from "../context/UserProvider";

function Header({ setMonth }) {
  const today = new Date();
  const monthsOfYear = [
    "janvier",
    "février",
    "mars",
    "avril",
    "mai",
    "juin",
    "juillet",
    "août",
    "septembre",
    "octobre",
    "novembre",
    "décembre",
  ];
  const daysOfWeek = [
    "Dimanche",
    "Lundi",
    "Mardi",
    "Mercredi",
    "Jeudi",
    "Vendredi",
    "Samedi",
  ];
  const dayOfWeek = daysOfWeek[today.getDay()];
  const day = today.getDate();
  const currentMonth = monthsOfYear[today.getMonth()];

  useEffect(() => {
    setMonth(currentMonth);
  }, [currentMonth, setMonth]);

  const { user } = useUser();
  const userConnected = user ? user.firstname : "vous n'êtes pas connecté";
  return (
    <>
      <header>
        <NavLink to="/" className="url">
          <img
            src="src/assets/Logo_header.svg"
            alt="Gateau d'anniversaire"
            className="logo-header"
          />
        </NavLink>
        <h2>{`${dayOfWeek} ${day} ${currentMonth}`}</h2>
        <NavLink to="/user" className="url">
        <p>{userConnected}</p>
          <img
            src="src/assets/user_icon.svg"
            alt="utilisateur"
            className="logo-header"
          />
        </NavLink>
      </header>
      <img 
      className="img-fanion" 
      src="src/assets/guirlande4.png"
      />
    </>
  );
}
export default Header;
