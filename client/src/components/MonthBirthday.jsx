import { useEffect, useState } from "react";
import { useOutletContext } from "react-router-dom";

function MonthBirthday({ shouldRerender }) {
  const { month } = useOutletContext();
  const [monthBirthday, setMonthBirthday] = useState({ data: [] });

  console.log("%c⧭", "color: #aa00ff", "ici c'est montBirthday");
  useEffect(() => {
    fetch(`${import.meta.env.VITE_API_URL}/api/friend/month`, {
      method: "GET",
      credentials: "include", // Inclure les cookies
    })
      .then((response) => response.json())
      .then((data) => {
        console.log("Fetched data:", data);
        setMonthBirthday(data);
      })
      .catch((error) => {
        console.error(
          "Une erreur s'est produite lors de la récupération des données:",
          error,
        );
      });
  }, [shouldRerender]);

  const monthBirthdayData = monthBirthday || [];

  const monthBirthdayReady = Array.isArray(monthBirthdayData)
    ? monthBirthdayData.filter(
        (el) =>
          el.id &&
          el.firstname &&
          el.lastname &&
          el.age_this_year &&
          el.birth_day_of_week_this_year &&
          el.birth_day,
      )
    : [];

  return (
    <div className="add-data-core-user">
      <h2 className="current-month-props">
        {month.charAt(0).toUpperCase() + month.slice(1)}
      </h2>
      <div className="card-core">
        <table className="table-current-month">
          <tbody>
            {monthBirthdayReady.length > 0 ? (
              monthBirthdayReady.map((el) => (
                <tr key={el.id}>
                  <td className="monthMap">
                    {el.firstname} {el.lastname}
                  </td>
                  <td className="padding-left-15">aura</td>
                  <td>{el.age_this_year} ans,</td>
                  <td>le</td>
                  <td className="text-align-right">
                    {el.birth_day_of_week_this_year}
                  </td>
                  <td className="text-align-right">{el.birth_day}</td>
                  <td>{month}</td>
                </tr>
              ))
            ) : (
              <tr>
                <td>
                  <p>Pas d'anniversaire ce mois-ci.</p>
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default MonthBirthday;
