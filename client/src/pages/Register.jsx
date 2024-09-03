import { NavLink, useNavigate } from "react-router-dom";
import { useRef, useState } from "react";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

function Register() {
  const passwordRef = useRef();
  const passwordConfirmationRef = useRef();
  const [cguChecked, setCguChecked] = useState(false);
  const navigate = useNavigate();
  const [ErrorForm, setErrorForm] = useState("");

  function handleSubmit(event) {
    event.preventDefault();
    const password1 = passwordRef.current.value;
     const password2 = passwordConfirmationRef.current.value;

    if (password1 === password2 && cguChecked) {
    // if (password1) {
      const formData = new FormData(event.target);
      const data = Object.fromEntries(formData);

      fetch(`${import.meta.env.VITE_API_URL}/api/user/`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
        // credentials: 'include',
      }).then((res) => {
        if (res.ok) {
          toast.success("Création de compte réussie");
          setTimeout(() => {
            navigate("/user");
          }, 4000);
        }
      });
    } else {
      setErrorForm(
        "Les deux mots de passe ne sont pas identiques ou les CGU ne sont pas cochées",
      );
    }
  }

  return (
    <main class="height-main-login">
      <div className="add-data-core">
        <h2>Inscription</h2>

        <form onSubmit={handleSubmit}>
          <div className="card-core">
            <span>
              <label htmlFor="firstname">Prénom:</label>
              <input
                type="text"
                id="firstname"
                name="firstname"
                placeholder="Martin"
                required
              />
            </span>
            <span>
              <label htmlFor="email">Courriel</label>
              <input
                type="email"
                id="email"
                name="email"
                placeholder="dupond@exemple.fr"
                required
              />
            </span>
            <span>
              <label htmlFor="dateSubscribe">Date de naissance</label>
              <input type="date" id="dateSubscribe" name="dateSubscribe" />
            </span>
            <span>
              <label htmlFor="password">Mot de passe :</label>
              <input
                type="password"
                id="password"
                name="password"
                pattern="(?=.*[A-Z])(?=.*[a-z])(?=.*[0-9])(?=.*[!@#$%^&*]).{8,}"
                title="Le mot de passe doit contenir au moins 8 caractères, dont au moins une majuscule, une minuscule, un chiffre et un caractère spécial"
                required
                ref={passwordRef}
              />
            </span>
            <span>
              <label htmlFor="register-password-confirmation">
                Confirmation mot de passe :
              </label>
              <input
                type="password"
                id="register-password-confirmation"
                placeholder="Confirmation mot de passe"
                required
                ref={passwordConfirmationRef}
              />
            </span>

            <p className="error-form-register">{ErrorForm}</p>
            <div className="cgu-container">
              <input
                type="checkbox"
                id="cgu"
                value="cgu"
                checked={cguChecked}
                onChange={(item) => setCguChecked(item.target.checked)}
              />

              <label htmlFor="cgu">
                J'accepte les{" "}
                <NavLink to="/rgpd" className="cgu-link">
                mentions légales
                </NavLink>{" "}
                <br />
                et reconnais avoir été informé
                <br />
                que mes données personnelles seront utilisées.
              </label>
            </div>

            <button type="submit" value="Inscription">
              Inscription
            </button>
          </div>
        </form>
        <p>
          Avez-vous déjà un compte ?
          <br />
          <br />
          <NavLink to="/" className="url">
            Se connecter
          </NavLink>
        </p>
      </div>
      <ToastContainer position="bottom-right" />
    </main>
  );
}

export default Register;
