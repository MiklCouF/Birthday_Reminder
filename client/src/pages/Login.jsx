import { NavLink } from "react-router-dom";


function login() {
  return (
    <main>
      <h2>Connexion</h2>
      <div className="card-core">
        <p>Courriel</p>
        <input
          type="text"
          id="username"
          name="username"
          placeholder="Utilisateur"
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
            <NavLink to="/register" className="url">
              Inscris-toi
            </NavLink>
            </p>
    </main>
  );
}

export default login;
