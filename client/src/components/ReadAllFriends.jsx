import { useEffect } from "react";

function ReadAllFriends() {

    useEffect(() => {
        fetch(`${import.meta.env.VITE_API_URL}/api/friend/month`)
         .then((response) => response.json())
         .then((data) => {
           console.log('Fetched data:', data);
           setfriendList(data);})
         .catch((error) => {
           console.error(
             "Une erreur s'est produite lors de la récupération des données:",
             error
           );
         });
     }, []);
   
     const friendListData = friendList || [];
   
     const friendListReady = Array.isArray(friendListData) ? friendListData.filter(
       (el) =>
         el.id &&
         el.firstname &&
         el.lastname &&
         el.birthday &&
         el.age_this_year
     ) : [];
    return (
        <div className="add-data-core-user">
    <div className="card-core">
      <table className="table-current-month">
        <tbody>
          {friendListReady.length > 0 ? (
            friendListReady.map((el) => (
              <tr key={el.id}>
              <td className="monthMap" >
                {el.firstname} {el.lastname} 
                </td>
                <td>aura</td>
                 <td>
                   {el.age_this_year} ans,
              </td>
              <td className="last-row-table">
              née le {el.birthday}
              </td>
          </tr>
            ))
          ) : (
            <tr>
            <td>
            <p>Vous n'avez pas encore de proche d'enregistrée.</p>
            </td>
            </tr>
          )}
          </tbody>
      </table>
        </div>
     </div>
      );
}
export default ReadAllFriends;
