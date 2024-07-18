import { useEffect, useState } from "react";

function MonthBirthday({ month }) {
const [monthBirthday, setMonthBirthday] = useState({data: []});

  useEffect(() => {
     fetch(`${import.meta.env.VITE_API_URL}/api/friend/month`)
      .then((response) => response.json())
      .then((data) => {
        console.log('Fetched data:', data);
        setMonthBirthday(data);})
      .catch((error) => {
        console.error(
          "Une erreur s'est produite lors de la récupération des données:",
          error
        );
      });
  }, []);

  const monthBirthdayData = monthBirthday || [];

  const monthBirthdayReady = Array.isArray(monthBirthdayData) ? monthBirthdayData.filter(
    (el) =>
      el.id &&
      el.firstname &&
      el.lastname &&
      el.birthday
  ) : [];

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    const day = String(date.getDate()).padStart(2, '0');
    const month = String(date.getMonth() + 1).padStart(2, '0'); // Months are zero-indexed
    const year = date.getFullYear();
    return `${day}/${month}/${year}`;
  };

  return (
    <div className="add-data-core">
      <h2>{month}</h2>
<div className="card-core">
  <p>Prénom:</p>
  <div>
      {monthBirthdayReady.length > 0 ? (
        monthBirthdayReady.map((el) => (
          <p className="monthMap" key={el.id}>
            {el.firstname} {el.lastname} {formatDate(el.birthday)}
          </p>
        ))
      ) : (
        <p>Pas d'anniversaire ce mois-ci.</p>
      )}
    </div>
 </div>
</div>
  );
}

export default MonthBirthday;
