function Login() {
    return (
        <>
            <input type="text" id="username" name="username" placeholder="Utilisateur" />
            <input type="password" id="pass" name="password" minlength="8" required placeholder="Mot de passe" />
            <input className="connect" type="submit" value="Se connecter" />
        </>
    )
}

export default Login