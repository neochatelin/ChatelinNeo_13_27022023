import { useNavigate } from "react-router-dom";
import "../style/Header.scss"
import { useDispatch, useSelector } from "react-redux";
import { disconect } from "../redux/auth";


function Herder() {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const user = useSelector((state)=>state.user.fetchInfo);

    const diconectButton = ()=>{
        dispatch(disconect())
        navigate("/login")
    }

    const displayButton = ()=>{
        if (localStorage.getItem('token') || sessionStorage.getItem('token')) {
            if (!user.isLoaded) {
                return <div></div>
            }else{
                return (
                <>
                    <button onClick={()=>navigate("/profile")}>
                        <i className="fa fa-user-circle" aria-hidden="true"></i>
                        <p> {user.info.firstName}</p>
                    </button>
                    <button onClick={()=>diconectButton()}>
                        <i className="fa fa-sign-out" aria-hidden="true"></i>
                        <p> Sign out</p>
                    </button>
                </>
                )
            }
        }else{
            return (
                <>
                    <button onClick={()=>navigate("/login")}>
                        <i className="fa fa-user-circle" aria-hidden="true"></i>
                        <p> Sign In</p>
                    </button>
                </>
                )
        }
    }
    
    return(
        <header>
            <a href="/">
                <img src="./img/argentBankLogo.png" alt="logo agent bank" />
            </a>
            <div>
                {displayButton()}
            </div>
        </header>
    )
}

export default Herder;