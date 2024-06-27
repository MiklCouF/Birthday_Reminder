// import Login from "./Login";
import logoHeader from "../assets/Logo_header.svg";

function Header(setConnect) {
  // fetch("https://nominis.cef.fr/json/saintdujour.php")
  //     .then(response => response.json())
  //     .then(data => console.log(response))
  //     .catch(error => console.error(error));

  // function changeLoginScreen() {
  //     setConnect(false);
  // }

  const changeLoginScreen = () => {
    setConnect((prevPage) => (prevPage === "page1" ? "page2" : "page1"));
  };

  const today = new Date();
  // const day = today.getDate();
  // const month = today.getMonth() + 1;
  // const year = today.getFullYear();
  // const formattedDate = day + '/' + month + '/' + year;
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
    "juilconst",
    "août",
    "septembre",
    "octobre",
    "novembre",
    "décembre",
  ];
  const dayOfWeek = daysOfWeek[today.getDay()];
  const day = today.getDate();
  const month = monthsOfYear[today.getMonth()];

  return (
    <header>
      <img
        src={logoHeader}
        alt="Gateau d'anniversaire"
        className="logo-header"
      />
      <h1>{`${dayOfWeek} ${day} ${month}`}</h1>
      <button type="button" onClick={changeLoginScreen}>
        <h2 className="tempo">Visiter</h2>
      </button>
    </header>
  );
}
export default Header;
