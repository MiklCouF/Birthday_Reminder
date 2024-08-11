import { NavLink, useNavigate  } from "react-router-dom";
import { useState } from "react";
import { emailValidation, passwordValidation } from "../services/validation";

function login() {

  const [isEmail, setIsEmail] = useState(true);
  const [isPassword, setIsPassword] = useState(true);
  const navigate = useNavigate();
  const [errorForm, setErrorForm] = useState("");
  const [errorFormNone, setErrorFormNone] = useState(
    "error-form-register-none"
  );

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

    console.log('%c⧭', 'color: #33cc99', "cote front login, submit data", data);
    const response = await fetch(`${import.meta.env.VITE_API_URL}/api/login`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
      // credentials: 'include',
    });

    if (!response.ok) {
      setIsEmail(() => false);
      setIsPassword(() => false);
      setErrorFormNone("error-form-register");
      setErrorForm("Identifiant ou mot de passe incorrect");
    } else {
        navigate("user");
    }
  };

  return (
    <main>
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
            pattern="(?=.*[A-Z])(?=.*[a-z])(?=.*[0-9])(?=.*[!@#$%^&*]).{8,}"
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
          <NavLink to="/register" className="url">
            S'inscrire
          </NavLink>
        </p>
      </div>
    </main>
  );
}

export default login;
