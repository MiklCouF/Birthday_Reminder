function SettingsCard() {
  return (
    <div className="add-data-core-user">
      <div className="card-header">
        <h3>Settings</h3>
      </div>
      <div className="card-body">
        <div className="form-group">
          <label htmlFor="theme">Theme</label>
          <select id="theme" className="form-control">
            <option value="light">Light</option>
            <option value="dark">Dark</option>
          </select>
        </div>
        <div className="form-group">
          <label htmlFor="language">Language</label>
          <select id="language" className="form-control">
            <option value="english">English</option>
            <option value="spanish">Spanish</option>
          </select>
        </div>
      </div>
      <p>
        groupe mail: recurence de l'envoie de mail . rappel jour meme, veille,
        une semaine avant, 2 semaine avant . Recevoir tous les anniversaire du
        moi : oui , non . choisir la date d'envoi
      </p>
    </div>
  );
}

export default SettingsCard;
