import Login from "./Login";
import Register from "./Register";

function CardLoginSubscribe() {
  // navlink pour register et ternaire pour login ou register
  return (
    <>
      <div className="add-data-core">
        {/* <div className="inscription-login"> */}
        <Login />
      </div>
      {/* </div> */}
      <div className="add-data-core">
        {/* <div className="inscription-login"> */}
        <Register />
      </div>
      {/* </div> */}
    </>
  );
}

export default CardLoginSubscribe;
