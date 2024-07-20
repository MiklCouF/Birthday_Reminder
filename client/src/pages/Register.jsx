function Register() {
  return (
    <main>
      <h2>Inscription</h2>
      <div className="card-core">
        <p>Prénom:</p>
        <input
          type="text"
          id="firstname"
          name="firstname"
          placeholder="Martin"
        />

        <p>Courriel</p>
        <input
          type="email"
          id="username"
          name="email"
          placeholder="dupond@exemple.fr"
        />

        <p>Date de naissance</p>
        <input type="date" id="dateSubscribe" name="dateSubscribe" />

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
          className="subscribe"
          type="submit"
          id="subscribe"
          value="S'inscrire"
        />
      <p>
        Tu as déjà un compte ?{" "}
        <NavLink to="/connexion" className="url">
          Connecte-toi
        </NavLink>
        </p>
      </div>
    </main>
  );
}

export default Register;
