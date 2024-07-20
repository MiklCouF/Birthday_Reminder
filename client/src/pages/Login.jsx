import { NavLink } from "react-router-dom";


function login() {
  return (
    <main>
      <div className="add-data-core">
      <h2>Connexion</h2>
      <div className="card-core">
        <p>Courriel</p>
        <input
          type="text"
          id="username"
          name="username"
          placeholder="adresse@courriel.com"
        />

        <p>Mot de passe </p>
        <input
          type="password"
          id="pass"
          name="password"
          minLength="8"
          required
          placeholder="Mot de passe"
        />
        <br />
        <input
          className="connect"
          type="submit"
          id="login"
          value="Se connecter"
        />
      </div>
      <p>
            Tu n’as pas de compte ?{" "}
            <br/>
            <br/>
            <NavLink to="/register" className="url">
              Inscris-toi
            </NavLink>
            </p>
            </div>
    </main>
  );
}

export default login;
