import { useEffect, useState } from "react";
import { useOutletContext } from "react-router-dom";
import { useUserData } from "../context/UserDataContext";

function MonthBirthday({ shouldRerender }) {
  const { month } = useOutletContext();
  const { monthFriendData, isLoading } = useUserData();

  const [monthBirthday, setMonthBirthday] = useState({ data: [] });

  // useEffect(() => {
  //   fetch(`${import.meta.env.VITE_API_URL}/api/friend/month`, {
  //     method: "GET",
  //     credentials: "include", // Inclure les cookies
  //   })
  //     .then((response) => response.json())
  //     .then((data) => {
  //       console.log("Fetched data:", data);
  //       setMonthBirthday(data);
  //     })
  //     .catch((error) => {
  //       console.error(
  //         "Une erreur s'est produite lors de la récupération des données:",
  //         error
  //       );
  //     });
  // }, [shouldRerender]);

  const monthBirthdayData = monthFriendData || [];

  const monthBirthdayReady = Array.isArray(monthBirthdayData)
    ? monthBirthdayData.filter(
        (el) =>
          el.id &&
          el.firstname &&
          el.lastname &&
          el.age_this_year &&
          el.birth_day_of_week_this_year &&
          el.birth_day
      )
    : [];

  return (
    <div className="add-data-core-user margin-x-auto">
      <h2>
        Anniversaire en{" "}
        <span>{month.charAt(0).toUpperCase() + month.slice(1)}</span>
      </h2>
      <div className="card-core">
        <table className="table-current-month">
          <tbody>
            {monthBirthdayReady.length > 0 ? (
              monthBirthdayReady.map((el) => {
                const currentDay = new Date().getDate();
                let aura;
                let dateColor;
                if (el.birth_day < currentDay) {
                  aura = "a eu";
                  dateColor = "bg-grey";
                } else if (el.birth_day === currentDay) {
                  aura = "à aujourd'hui";
                  dateColor = "bg-blue";
                } else {
                  aura = "aura";
                  dateColor = "";
                }
                return (
                  <tr key={el.id} className={dateColor}>
                    <td className="monthMap">
                      {el.firstname} {el.lastname}
                    </td>
                    <td className="padding-left-15">{aura}</td>
                    <td>{el.age_this_year} ans,</td>
                    <td>le</td>
                    <td className="text-align-right">
                      {el.birth_day_of_week_this_year}
                    </td>
                    <td className="text-align-right">{el.birth_day}</td>
                    <td>{month}</td>
                  </tr>
                );
              })
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
