/* eslint-disable react/prop-types */ // TODO: Asking what missing

// import { Connect } from "vite";
import AddData from "../components/AddData";
import Calendar from "../components/Calendar";
import CardLoginSubscribe from "../components/CardLoginSubscribe";

function Body({ Connect }) {
  // State for animate card login/subscribe
  //    const [isFlipped, setIsFlipped] = useState(false);
  //    const handleFlip = () => {
  //        setIsFlipped(!isFlipped);
  //    };

  //    const [Connect, setConnect] = useState(true);

  // faire un onclick sur le titre dans le footer pour changer le state de coonect
  return Connect === "page1" ? (
    <div className="Full-body">
      <AddData />
      <Calendar />
    </div>
  ) : (
    <div className="Full-body">
      <CardLoginSubscribe />

      {/* <div class="content">
                    <div class="front">

                        <p>login etait la avant</p>
                    </div>
                    <div class="back">
                        <p>ici était register avant</p>
                    </div>
                </div>
            </div> */}
    </div>
  );
}

export default Body;
