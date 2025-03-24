import { NavLink, useNavigate } from "react-router-dom";
import { useState } from "react";
import { emailValidation, passwordValidation } from "../services/validation";
import { useUser } from "../context/UserProvider";

function login() {
  const { setUser } = useUser();
  const [isEmail, setIsEmail] = useState(true);
  const [isPassword, setIsPassword] = useState(true);
  const navigate = useNavigate();
  const [errorForm, setErrorForm] = useState("");
  const [errorFormNone, setErrorFormNone] = useState(
    "error-form-register-none"
  );

  function getCookie(name) {
    //"document.cookie" contient tous les cookies du domaine actuel sous la forme d'une seule chaîne de caractères, avec chaque cookie séparé par un point-virgule (;)
    // ajoute un point-virgule au début de la chaîne des cookies pour faciliter la recherche de cookies.
    const value = `; ${document.cookie}`;
    // divise la chaîne des cookies en deux parties : avant et après le cookie recherché (name)
    const parts = value.split(`; ${name}=`);
    //  Si le cookie existe (parts.length === 2), la fonction extrait la valeur après le signe = et avant le prochain point-virgule ou la fin de la chaîne.
    if (parts.length === 2) return parts.pop().split(";").shift();
    // a fonction retourne la valeur du cookie, ou undefined si le cookie n'existe pas.
  }

  const handleSubmit = async (event) => {
    try {
      event.preventDefault();

      const email = event.target.usernameemail.value;
      const isEmailValid = emailValidation(email);

      const password = event.target.password.value;
      const isPasswordValid = passwordValidation(password);

      setIsEmail(() => isEmailValid);
      setIsPassword(() => isPasswordValid);

      if (!isEmailValid || !isPasswordValid) {
        setErrorFormNone("error-form-register");
        setErrorForm("Identifiant ou mot de passe incorrect");
      } else {
        await handleFetch({ email, password });
      }
    } catch (error) {
      console.error(error.message);
    }
  };

  const handleFetch = async (data) => {
    const response = await fetch(`${import.meta.env.VITE_API_URL}/api/login`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
      credentials: "include",
    });

    if (!response.ok) {
      setIsEmail(() => false);
      setIsPassword(() => false);
      setErrorFormNone("error-form-register");
      setErrorForm("Identifiant ou mot de passe incorrect");
    } else {
      const firstname = getCookie("firstname");
      const id = getCookie("id");

      console.log(
        "%c⧭",
        "color: #cc0088",
        "direct le cookie",
        getCookie("firstname")
      );
      console.log(
        "%c⧭",
        "color: #1d3f73",
        "firstname recu du cookie",
        firstname
      );
      setUser({ firstname, id });
      navigate("user");
    }
  };

  return (
    <main className="height-main-login">
      <div className="add-data-core">
        <h4>Connexion</h4>
        <form className="card-core" onSubmit={handleSubmit}>
          <label htmlFor="usernameemail">Courriel</label>
          <input
            type="email"
            id="usernameemail"
            name="usernameemail"
            placeholder="adresse@courriel.com"
            onFocus={() => !isEmail && setIsEmail(true)}
            required
          />

          <label htmlFor="pass">Mot de passe </label>
          <input
            type="password"
            id="pass"
            name="password"
            minLength="8"
            placeholder="Mot de passe"
            onFocus={() => !isPassword && setIsPassword(true)}
            pattern="(?=.*[A-Z])(?=.*[a-z])(?=.*[0-9])(?=.*[?!@#$%^&*]).{8,}"
            required
          />
          <br />
          <p className={errorFormNone}>{errorForm}</p>
          <button
            className="connect"
            type="submit"
            id="login"
            value="Se connecter"
          >
            Se connecter
          </button>
        </form>
        <p>
          Vous n'avez pas de compte ? <br />
          <br />
          <NavLink to="/register" className="url-subscribe">
            S'inscrire
          </NavLink>
        </p>
      </div>
    </main>
  );
}

export default login;
