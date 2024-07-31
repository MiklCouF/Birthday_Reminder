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
  const [ErrorFormNone, setErrorFormNone] = useState(
    "error-form-register-none"
  );

  function handleSubmit(event) {
    event.preventDefault();
    const password1 = passwordRef.current.value;
    const password2 = passwordConfirmationRef.current.value;

    if (password1 === password2 && cguChecked) {
      const formData = new FormData(event.target);
      const data = Object.fromEntries(formData);

      fetch(`${import.meta.env.VITE_API_URL}/api/user/`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      }).then((res) => {
        if (res.ok) {
          toast.success(
            "Création de compte réussie"
          );
          setTimeout(() => {
            navigate("/connexion");
          }, 4000);
        }
      });
    } else {
      setErrorFormNone("error-form-register");
      setErrorForm(
        "Les deux mots de passe ne sont pas identiques ou les CGU ne sont pas cochées"
      );
    }
  }

  return (
    <main>
      <div className="add-data-core">
      <h2>Inscription</h2>

      <form onSubmit={handleSubmit}>
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
          id="email"
          name="email"
          placeholder="dupond@exemple.fr"
        />

        <p>Date de naissance</p>
        <input type="date" id="dateSubscribe" name="dateSubscribe" />

        <p>Mot de passe </p>
        <input
          type="password"
          id="password"
          name="password"
          placeholder="Mot de passe"
          aria-label="Mot de passe"
          pattern="^(?=.?[A-Z])(?=.?[a-z])(?=.?[0-9])(?=.?[#?!@$%^&*-]).{8,}$"
          required
          ref={passwordRef}
        />
                <p>Confirmation mot de passe </p>
          <input
            type="password"
            id="register-password-confirmation"
            placeholder="Confirmation mot de passe"
            aria-label="Confirmation mot de passe"
            required
            ref={passwordConfirmationRef}
          />
        <p className={ErrorFormNone}>{ErrorForm}</p>
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
            <NavLink to="/cgu" className="cgu-link">
              Conditions Générales d'Utilisation
            </NavLink>{" "}
            <br/>
            et reconnais avoir été informé 
            <br/>
            que mes données personnelles seront
            utilisées.
          </label>
        </div>
        <button type="submit" value="Inscription">
          Inscription
        </button>
      </div>
      </form>
      <p>
        Tu as déjà un compte ?{" "}
        <br />
        <br />
        <NavLink to="/" className="url">
          Connecte-toi
        </NavLink>
        </p>
      </div>
      <ToastContainer position="bottom-right" />
    </main>
  );
}

export default Register;
