import { NavLink } from "react-router-dom";

function login() {
  return (
    <main>
      <div className="add-data-core">
        <h4>Connexion</h4>
        <div className="card-core">
          <label htmlFor="username">Courriel</label>
          <input
            type="text"
            id="username"
            name="username"
            placeholder="adresse@courriel.com"
          />

          <label htmlFor="pass">Mot de passe </label>
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
