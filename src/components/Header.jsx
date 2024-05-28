// import Login from "./Login";
import logo_header from "../assets/img/Logo_header.svg"

function Header({ setConnect }) {

    // fetch("https://nominis.cef.fr/json/saintdujour.php")
    //     .then(response => response.json())
    //     .then(data => console.log(response))
    //     .catch(error => console.error(error));
    function changeLoginScreen() {
        setConnect(state => !state);
    }

    return (

        <header>
            <img src={logo_header} alt="Gateau d'anniversaire" className="logo-header" />
            <button onClick={changeLoginScreen}><h2>Header</h2></button>
            <h4>fin</h4>
        </header>

    )
}
export default Header