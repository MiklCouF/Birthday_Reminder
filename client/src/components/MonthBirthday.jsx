import { useEffect, useState } from "react";
import { useOutletContext } from "react-router-dom";
import { useUserData } from "../context/UserDataContext";

function MonthBirthday({ openModal }) {
  const { month } = useOutletContext();
  const { monthFriendData, isLoading } = useUserData();
  if (isLoading) return <span className="loader"></span>;

  const [monthBirthday, setMonthBirthday] = useState({ data: [] });

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

  const handleEdit = (el) => {
    console.log("log el", el);
    openModal(el);
  };

  return (
    <div className="card-wrapper margin-x-auto">
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
                  <tr
                    key={el.id}
                    className={dateColor}
                    onClick={() => handleEdit(el)}
                  >
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
