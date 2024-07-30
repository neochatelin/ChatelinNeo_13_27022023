import { Navigate } from "react-router-dom";

const PrivateRoute = (props)=> {
    const token = localStorage.getItem('token')||sessionStorage.getItem('token');
    return token?<props.component/>:<Navigate to="/sign-in" replace/>;
}

export default PrivateRoute;