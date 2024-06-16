function Login() {

    return (
        <>
            <h2>Connexion</h2>
            <div className="login-core">
                <p>Courriel</p>
                <input type="text" id="username" name="username" placeholder="Utilisateur" />

                <p>Mot de passe </p>
                <input type="password" id="pass" name="password" minlength="8" required placeholder="Mot de passe" />
                <br />
                <input className="connect" type="submit" id="login" value="Se connecter" />
            </div>
            <a onClick={subscribe}>Pas encore de compte ? S'inscrire</a>
        </>
    )
}

export default Login