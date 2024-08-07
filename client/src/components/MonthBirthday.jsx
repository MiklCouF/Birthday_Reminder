import { useEffect, useState } from "react";
import { useOutletContext } from "react-router-dom";

function MonthBirthday() {

const { month } = useOutletContext();
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

  return (
    <div className="add-data-core-user">
      <h2 className="current-month-props">{month.charAt(0).toUpperCase() + month.slice(1)}</h2>
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
          <td className="last-row-table">
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


{/* <tr>
<td className="monthMap, last-row-table" key={el.id}>
  {el.firstname} {el.lastname} 
  </td>
<td className="last-row-table">
aura {el.age_this_year} ans,
le {el.birth_day_of_week_this_year} {el.birth_day} {month}
</td>
</tr> */}
