import AddData from "../components/AddData"
import Calendar from "../components/Calendar"
import Inscription from "../components/Inscription"
import Login from "../components/Login"

function Body() {

    return (
        <div className="Full-body">
            <div className="inscription-login">
                <Login />
                <Inscription />
            </div>
            <div className="body-components">
                <AddData />
                <Calendar />
            </div>
        </div>
    )
}

export default Body