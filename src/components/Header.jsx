function Header() {

    return (

        <header className="header">
            <input type="text" id="username" name="username" />
            <input type="password" id="pass" name="password" minlength="8" required />
            <input className="connect" type="submit" value="Se connecter" />
            <h2>Header</h2>
        </header>

    )
}
export default Header