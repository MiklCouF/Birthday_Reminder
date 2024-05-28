// import { Connect } from "vite";
import AddData from "../components/AddData"
import Calendar from "../components/Calendar"
import Inscription from "../components/Inscription"
import Login from "../components/Login"

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
            <div className="inscription-login">
                <Login />
                <Inscription />
            </div>
        </div>
    );
}

export default Body