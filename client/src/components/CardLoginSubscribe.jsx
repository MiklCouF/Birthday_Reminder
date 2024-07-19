import Login from "../pages/Login";
import Register from "../pages/Register";

function CardLoginSubscribe() {
  // navlink pour register et ternaire pour login ou register
  return (
    <>
      <div className="add-data-core">
        <Login />
      </div>
      <div className="add-data-core">
        <Register />
      </div>
    </>
  );
}

export default CardLoginSubscribe;
