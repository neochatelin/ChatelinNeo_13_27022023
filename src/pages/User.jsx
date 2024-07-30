import "../style/User.scss"

import Footer from "../component/Footer";
import Header from "../component/Header";
import { useEffect, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { editInfo, fetchInfo, updateName } from "../redux/userSlice";

function User() {
    let [isEditing, setIsEditing] = useState(false);
    let [firstName, setFirstName] = useState('');
    let [lastName, setLastName] = useState('');

    let firstNameError = useRef(null);
    let lastNameError = useRef(null);
    const dispatch = useDispatch()
    const infoSelector = useSelector((state)=>state.user.fetchInfo);
    const editInfoSelector = useSelector((state)=>state.user.editInfo);
    const token = localStorage.getItem('token')||sessionStorage.getItem('token');

    const editButton = ()=>{
        let canISend = true;
        firstNameError.current.innerText = ''
        lastNameError.current.innerText = ''
        if (!firstName.match(/[^0-9]+[A-z]{2,}/g)) {
            firstNameError.current.innerText = "le prenom n'est pas valide."
            canISend = false;
        }
        if (!lastName.match(/[^0-9]+[A-z]{2,}/g)) {
            lastNameError.current.innerText = "le nom n'est pas valide."
            canISend = false;
        }
        if (canISend) {
            dispatch(editInfo({token, firstName, lastName}))
        }
    }

    useEffect(()=>{
    if(editInfoSelector.status === "succeeded"){
        setIsEditing(false)
        dispatch(updateName({firstName, lastName}))
        setFirstName("")
        setLastName("")
    }}, [setIsEditing, editInfoSelector, firstName, lastName, dispatch])

    if (infoSelector.isLoaded === false) {
        dispatch(fetchInfo());
        return(
            <div className="user">
                <Header/>
                <main>
                    <h1 id="loader">Fetching info</h1>
                </main>
                <Footer/>
            </div>
        )
    }else{
        return(
            <div className="user">
                <Header/>
                <main>
                    <div className="header">
                        {isEditing?<>
                            <h1>Welcome back</h1><br />
                            <div id="editing">
                                <div>
                                    <div>
                                        <input type="text" placeholder={infoSelector.info.firstName}  value={firstName} onChange={(e)=>{setFirstName(e.target.value)}}/>
                                        <p ref={firstNameError}></p>
                                    </div>
                                    <div>
                                        <input type="text" placeholder={infoSelector.info.lastName} value={lastName} onChange={(e)=>{setLastName(e.target.value)}}/>
                                        <p ref={lastNameError}></p>
                                    </div>
                                </div>
                                <div>
                                    <button className="edit-button" onClick={()=>{editButton()}}>Save</button>
                                    <button className="edit-button" onClick={()=>{setIsEditing(false)}}>Cancel</button>
                                </div>
                            </div>
                        </>:<>
                            <h1>Welcome back<br />{infoSelector.info.firstName+' '+infoSelector.info.lastName}!</h1>
                            <button className="edit-button" onClick={()=>{setIsEditing(true)}}>Edit Name</button>
                        </>}
                        
                    </div>
                    <section className="account">
                        <div className="account-content-wrapper">
                        <h3 className="account-title">Argent Bank Checking (x8349)</h3>
                        <p className="account-amount">$2,082.79</p>
                        <p className="account-amount-description">Available Balance</p>
                        </div>
                        <div className="account-content-wrapper cta">
                        <button className="transaction-button">View transactions</button>
                        </div>
                    </section>
                    <section className="account">
                        <div className="account-content-wrapper">
                        <h3 className="account-title">Argent Bank Savings (x6712)</h3>
                        <p className="account-amount">$10,928.42</p>
                        <p className="account-amount-description">Available Balance</p>
                        </div>
                        <div className="account-content-wrapper cta">
                        <button className="transaction-button">View transactions</button>
                        </div>
                    </section>
                    <section className="account">
                        <div className="account-content-wrapper">
                        <h3 className="account-title">Argent Bank Credit Card (x8349)</h3>
                        <p className="account-amount">$184.30</p>
                        <p className="account-amount-description">Current Balance</p>
                        </div>
                        <div className="account-content-wrapper cta">
                        <button className="transaction-button">View transactions</button>
                        </div>
                    </section>
                </main>
                <Footer/>
            </div>
        
        )
    }
}

export default User;