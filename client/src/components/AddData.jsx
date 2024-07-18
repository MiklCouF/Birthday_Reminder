function AddData() {
  return (

<div className="add-data-core">
<p>Ajouter un la date d'anniversaire d'un proche</p>
<div className="card-core">
  <p>Prénom:</p>
  <input
    type="text"
    id="firstname"
    name="firstname"
    placeholder="Martin"
  />

<p>Nom:</p>
  <input
    type="text"
    id="lastname"
    name="lastname"
    placeholder="Dubois"
  />

  <p>Date de naissance</p>
  <input type="date" id="dateSubscribe" name="dateSubscribe" />

  <input
    className="subscribe"
    type="submit"
    id="subscribe"
    value="Ajouter"
  />
</div>
</div>
  );
}

export default AddData;
