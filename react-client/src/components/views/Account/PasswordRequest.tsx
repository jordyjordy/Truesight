import logo from "../../../Logo-big.png"
import "../../../style/Account/PasswordRequest.css";
import React, { useState } from "react";
import {requestReset as requestPasswordReset} from "../../../utils/account"
import { useHistory } from "react-router";
export function PasswordRequest() {

    const history = useHistory()
    const [email, setEmail] = useState("");
    const requestReset = async function(event:React.FormEvent){
        event.preventDefault()
        if(await requestPasswordReset(email)) {
            alert("If a user exists, you will receive an email shortly")
            history.push('/login')
        }
    }

    const changeEmail = function(event:React.FormEvent<HTMLInputElement>) {
        setEmail(event.currentTarget.value)
    }

    return (
        <div className="passreq center-container">
            <img src={logo} className="main-logo"  alt="logo"/>
            <div className="passreq-container">
                <form className="passreq-form" onSubmit={requestReset}>
                    <label htmlFor="email">
                        <p className="input-label">email</p>
                        <input type="text" id="email" value={email} onChange={changeEmail}>  
                        </input>
                    </label>
                    <div className="passreq-buttons">
                        <input type='submit' className="passreq-button" value="Request Password Reset"/>
                    </div>
                </form>
            </div>
        </div>
    )
}
 