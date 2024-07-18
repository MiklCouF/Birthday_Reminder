function login() {
  return (
    <>
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
      <p>Pas encore de compte ? S'inscrire</p>
      {/* <a>Pas encore de compte ? S'inscrire</a> */}
    </>
  );
}

export default login;
