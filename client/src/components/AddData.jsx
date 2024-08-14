function AddData({ user }) {

  function handleSubmit(event) {
    event.preventDefault();

       const formData = new FormData(event.target);
       const data = Object.fromEntries(formData);

      fetch(`${import.meta.env.VITE_API_URL}/api/friend/`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      }).then((res) => {
        if (res.ok) {
          console.warn("Victoire !");        }
      })
      .catch((error) => {
        console.error(
          "Une erreur s'est produite lors de la récupération des données:",
          error
        );
      });
    }
// TODO dans le fetch > .then ((re) > 
// TODO mettre une action qui refresh le composant "MonthBirthday" qui montre les anniversaires du moi
// TODO et aussi un message de réussite de l'enregistrement

  return (

<div className="add-data-core">
<p>Ajouter la date d'anniversaire d'un proche</p>
<div className="card-core">
<form onSubmit={handleSubmit}>
<input type="hidden" name="userId" value={user.id} />
  <p>Prénom:</p>
  <input
    type="text"
    id="firstname"
    name="firstname"
    placeholder="Martin"
    required
  />

<p>Nom:</p>
  <input
    type="text"
    id="lastname"
    name="lastname"
    placeholder="Dubois"
    required
  />

  <p>Date de naissance</p>
  <input 
  type="date" 
  id="dateSubscribe" 
  name="birthday" 
  required
  />
  
  <button type="submit" 
  value="Ajouter" 
  id="subscribe"

  className="subscribe">
          Ajouter
        </button>

  </form>
</div>
</div>
  );
}

export default AddData;
