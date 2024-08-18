import { useEffect, useState } from "react";

function ReadAllFriends({ shouldRerender }) {
    const [friendList, setfriendList] = useState({data: []});

    useEffect(() => {
        fetch(`${import.meta.env.VITE_API_URL}/api/friend/`,{
            method: 'GET',
            credentials: 'include', // Inclure les cookies
          })
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
     }, [[shouldRerender]]);
   
     const friendListData = friendList || [];
   
     const friendListReady = Array.isArray(friendListData) ? friendListData.filter(
       (el) =>
         el.id &&
         el.firstname &&
         el.lastname &&
         el.formatted_birthday &&
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
              <td className="padding-left-15">
              née le
              </td>
              <td className="text-align-right">
              {el.formatted_birthday}
              </td>
                 <td className="text-align-right">
                   ( {el.age_this_year} ans )
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
