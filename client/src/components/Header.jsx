import { useEffect } from "react";
import { NavLink } from "react-router-dom";
import SearchComponent from "./SearchComponent";

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

  const verify = () => {
    fetch(`${import.meta.env.VITE_API_URL}/api/auth`, {
      method: "GET",
      credentials: "include",
    });
  };
  return (
    <>
      <header>
        <div className="header-div">
          <div className="skewed-header"></div>
          <SearchComponent />
          {/* <button onClick={verify}>test verify</button> */}
          <NavLink to="/" className="url">
            <img
              height="30px"
              width="30px"
              src="src/assets/Logo_header.svg"
              alt="Gateau d'anniversaire"
              className="logo-header"
            />
          </NavLink>
          <h4>{`${dayOfWeek} ${day} ${currentMonth}`}</h4>
          <NavLink to="/login" className="url">
            <img
              src="src/assets/user_icon.svg"
              alt="utilisateur"
              className="logo-header"
            />
          </NavLink>
        </div>
      </header>
    </>
  );
}
export default Header;
