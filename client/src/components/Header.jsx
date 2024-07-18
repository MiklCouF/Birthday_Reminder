import logoHeader from "../assets/Logo_header.svg";
import fanion from "../assets/guirlande4.png";

function Header({ setchangePage, setMonth }) {

  const changeLoginScreen = () => {
    setchangePage((prevPage) => (prevPage === "page1" ? "page2" : "page1"));
  };

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
  setMonth(currentMonth);
  return (
    <>
    <header>
      <img
        src={logoHeader}
        alt="Gateau d'anniversaire"
        className="logo-header"
      />
      <h1>{`${dayOfWeek} ${day} ${currentMonth}`}</h1>
      <button type="button" onClick={changeLoginScreen}>
        <h2 className="tempo">Visiter</h2>
      </button>
    </header>
      <img className="img-fanion" src={fanion} />
    </>
  );
}
export default Header;
