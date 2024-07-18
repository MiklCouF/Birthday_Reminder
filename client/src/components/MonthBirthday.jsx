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
      el.age_this_year &&
      el.birth_day_of_week_this_year &&
      el.birth_day
  ) : [];

  // const formatDate = (dateString) => {
  //   const date = new Date(dateString);
  //   const day = String(date.getDate()).padStart(2, '0');
  //   const month = String(date.getMonth() + 1).padStart(2, '0'); // Months are zero-indexed
  //   const year = date.getFullYear();
  //   return `${day}/${month}/${year}`;
  // };

  return (
    <div className="add-data-core">
      <h2>{month}</h2>
<div className="card-core">
  <table className="table-current-month">
      {monthBirthdayReady.length > 0 ? (
        monthBirthdayReady.map((el) => (
          <tr>
          <td className="monthMap" key={el.id}>
            {el.firstname} {el.lastname} 
            </td>
            <td><p>aura</p></td>
             <td>
               {el.age_this_year} ans,
          </td>
          <td>
           le {el.birth_day_of_week_this_year} {el.birth_day} {month}
          </td>
      </tr>
        ))
      ) : (
        <p>Pas d'anniversaire ce mois-ci.</p>
      )}
      
  </table>
    </div>
 </div>
  );
}

export default MonthBirthday;
