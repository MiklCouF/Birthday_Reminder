// import { Connect } from "vite";
import AddData from "../components/AddData";
import Calendar from "../components/Calendar";
import CardLoginSubscribe from "../components/CardLoginSubscribe";
import MonthBirthday from "../components/MonthBirthday"


function Body({ changePage }) {
  // State for animate card login/subscribe
  //    const [isFlipped, setIsFlipped] = useState(false);
  //    const handleFlip = () => {
  //        setIsFlipped(!isFlipped);
  //    };

  //    const [Connect, setConnect] = useState(true);

  // faire un onclick sur le titre dans le footer pour changer le state de coonect
  return changePage === "page1" ? (
    <div className="Full-body">
      <AddData />
      <MonthBirthday />
      <Calendar />
    </div>
  ) : (
    <div className="Full-body">
      <CardLoginSubscribe />
    </div>
  );
}

export default Body;
