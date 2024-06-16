// import { Connect } from "vite";
import AddData from "../components/AddData"
import Calendar from "../components/Calendar"
import CardLoginSubscribe from "../components/CardLoginSubscribe";

function Body({ Connect }) {

    //    const [Connect, setConnect] = useState(true);
    //const [Coonnect, setCoonnect] = useState(true);

    // faire un onclick sur le titre dans le footer pour changer le state de coonect                
    return Connect ? (
        <div className="Full-body">
            <AddData />
            <Calendar />
        </div>
    ) : (
        <div className="Full-body">
            <CardLoginSubscribe />
        </div>
    );
}

export default Body