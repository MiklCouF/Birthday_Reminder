import Login from "./Login"
import Inscription from "./Inscription"

function CardLoginSubscribe() {
    const [SwitchSubscribe, setSwitchSubscribe] = useState(true);
    const renderSubscribeLogin = () => {
        switch(SwitchSubscribe){
            case 'viewLogin':
                return
        }

    }

    return (
        <>
            <div className="inscription-login">
                <Login />
                <Inscription />
            </div>
        </>
    )
}

export default CardLoginSubscribe