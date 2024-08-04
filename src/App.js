import {Routes, Route} from "react-router-dom";
import Home from './pages/Home';
import SignIn from './pages/SignIn';
import PrivateRoute from "./privateRout/PrivateRoute";
import User from "./pages/User";
import { useDispatch } from "react-redux";
import { useEffect, useState } from "react";
import { fetchInfo } from "./redux/userSlice";

function App() {
  const [isConnected, setIsConnected] = useState(false);

  let dispatch = useDispatch();

  useEffect(()=>{
    console.log({"isConnected": isConnected});
    if ((localStorage.getItem('token') || sessionStorage.getItem('token')) && isConnected === false) {
      dispatch(fetchInfo())
      setIsConnected(true)
    }
    if (!(localStorage.getItem('token') || sessionStorage.getItem('token'))) {
      setIsConnected(false)
    }
  }, [dispatch, isConnected])

  return (
    <div className="App">
      <Routes>
        <Route path='/' element={<Home/>}/>
        <Route path='/login' element={<SignIn/>}/>
        <Route path='/profile' element={<PrivateRoute component={User} />}/>
      </Routes>
    </div>
  );
}

export default App;
