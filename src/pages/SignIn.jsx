import "../style/SignIn.scss"

import Footer from "../component/Footer";
import Header from "../component/Header";
import { useEffect, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { login } from "../redux/auth";

import { useNavigate  } from "react-router-dom";

function SignIn() {
    let [username, setUsername] = useState('');
    let [passwd, setPasswd] = useState('');
    let [rememberMe, setRememberMe] = useState("false");

    const errorEmail = useRef(null);
    const errorPasswd = useRef(null);
    const errorConnection = useRef(null);


    let navigate = useNavigate();
    const dispatch = useDispatch();
    
    const token = useSelector((state)=>state.auth.token);
    const status = useSelector((state)=>state.auth.status);
    
    let submit = ()=>{
        let fieldError = false;
        if (!username.match(/^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|.(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/g)) {
            errorEmail.current.innerText = "l'email n'est pas valide."
            fieldError = true;
        }else{
            errorEmail.current.innerText = "";
        }
        if (!passwd.match(/^(?=.*?[a-z])(?=.*?[0-9]).{7,}$/g)) {
            errorPasswd.current.innerText = "Le mots de passe doit contenire des chiffre et faire plus de 6 lettre."
            fieldError = true;
        }else{
            errorPasswd.current.innerText = "";
        }
        const payload = {
            username: username,
            password: passwd,
            rememberMe: rememberMe
        }
        if (!fieldError) {
            dispatch(login(payload))
        }else{return;}
    }

    useEffect(()=>{
        if(status === "succeeded"){
            navigate('/profile')
        }else if(status === "failed"){
            errorConnection.current.innerText = "reeseyer plus tard";
        }else if(status === 400){
            errorConnection.current.innerText = "le mot de passe ou l'email est incorrect";
        }
    }, [status, token, rememberMe, navigate])

    return(
        <div className="signIn">
            <Header/>
            <main>
                <section className="sign-in-content">
                    <i className="fa fa-user-circle sign-in-icon"></i>
                    <h1>Sign In</h1>
                    <form>
                        <div className="input-wrapper">
                            <label htmlFor="username">Email</label>
                            <input type="email" id="username" value={username} onChange={(event)=>{setUsername(event.target.value)}}/>
                            <p style={{color: 'red'}} ref={errorEmail}></p>
                        </div>
                        <div className="input-wrapper">
                            <label htmlFor="password">Password</label>
                            <input type="password" id="password" value={passwd} onChange={(event)=>{setPasswd(event.target.value)}}/>
                            <p style={{color: 'red'}} ref={errorPasswd}></p>
                        </div>
                        <div className="input-remember">
                            <input type="checkbox" id="remember-me" onChange={(event)=>{setRememberMe(rememberMe==="false"?"true":"false")}}/>
                            <label htmlFor="remember-me">Remember me</label>
                        </div>
                            <button type="button" className="sign-in-button" onClick={submit}>Sign In</button>
                            <p style={{color: 'red'}} ref={errorConnection}></p>
                    </form>
                </section>
            </main>
            <Footer/>
        </div>
    )
}

export default SignIn;