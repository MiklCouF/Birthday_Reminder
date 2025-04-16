import { useEffect } from "react";
import { NavLink } from "react-router-dom";
import SearchComponent from "./SearchComponent";

function Header({ setMonth }) {
  const userConnected = "Temporaire";
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
          <div className="search-bar">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              height="20px"
              viewBox="0 -960 960 960"
              width="20px"
              fill="#5F6368"
            >
              <path d="M720-180 530.46-388.16q-30 24.77-69 38.77-39 14-80.69 14-102.55 0-173.58-71.01-71.03-71.01-71.03-173.54 0-102.52 71.01-173.6 71.01-71.07 173.54-71.07 102.52 0 173.6 71.03 71.07 71.03 71.07 173.58 0 42.85-14.38 81.85-14.39 39-38.39 67.84l200 200-42.15 42.16ZM380.77-395.38q77.31 0 130.96-53.66 53.66-53.65 53.66-130.96t-53.66-130.96q-53.65-53.66-130.96-53.66t-130.96 53.66Q196.15-657.31 196.15-580t53.66 130.96q53.65 53.66 130.96 53.66Z" />
            </svg>
            <input
              className="search-bar"
              type="text"
              name="firstname"
              placeholder="Rechercher ..."
              // value={editedFriend.firstname}
              // onChange={handleInputChange}
            />
          </div>
          <SearchComponent />
          <button onClick={verify}>test verify</button>
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
            <p>{userConnected}</p>
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
