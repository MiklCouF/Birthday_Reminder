import { useEffect } from "react";
import { NavLink } from "react-router-dom";
import logoHeader from "../assets/Logo_header.svg";
import fanion from "../assets/guirlande4.png";

function Header({ setMonth }) {
// function Header({ setchangePage, setMonth }) {

  // const changeLoginScreen = () => {
    // setchangePage((prevPage) => (prevPage === "page1" ? "page2" : "page1"));
  // };

  const today = new Date();
  const daysOfWeek = [
    "Dimanche",
    "Lundi",
    "Mardi",
    "Mercredi",
    "Jeudi",
    "Vendredi",
    "Samedi",
  ];
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
  const dayOfWeek = daysOfWeek[today.getDay()];
  const day = today.getDate();
  const currentMonth = monthsOfYear[today.getMonth()];
  
 useEffect(() => {
  setMonth(currentMonth);
}, [currentMonth, setMonth]);

  return (
    <>
    <header>
    <NavLink to="/" className="url">
      <img
        src={logoHeader}
        alt="Gateau d'anniversaire"
        className="logo-header"
        />
        </NavLink>
      <h2>{`${dayOfWeek} ${day} ${currentMonth}`}</h2>
      <NavLink to="/user" className="url">
         <h2>Visiter</h2>
        </NavLink>
    </header>
      <img className="img-fanion" src={fanion} />
    </>
  );
}
export default Header;
