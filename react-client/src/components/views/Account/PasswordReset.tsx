import logo from "../../../Logo-big.png"
import "../../../style/Account/PasswordReset.css"
import React, { useState } from "react";
import {resetPassword} from "../../../utils/account"
import { useHistory } from "react-router";
import { useLocation, Redirect} from "react-router-dom";


export function PasswordReset() {

    const history = useHistory()
    const [password, setPassword] = useState("")
    const [confirmPass,setConfirmPass] = useState("")
    const query = new URLSearchParams(useLocation().search)
    if(!query.get('token')) {
        return <Redirect to='/login'/>
    }
    const resetPass = async function(event:React.FormEvent){
        event.preventDefault()
        if(password !== confirmPass) {
            alert("Your passwords don't match!")
            return
        }
        const res = await resetPassword(query.get('token')!,password)
        if(res) {
            history.push('/login')
        } else {
            alert("Something went wrong, please try again later")
        }
    }

    const changePassword = function(event:React.FormEvent<HTMLInputElement>) {
        setPassword(event.currentTarget.value)
    }

    const changeConfirmPassword = function(event:React.FormEvent<HTMLInputElement>) {
        setConfirmPass(event.currentTarget.value)
    }

    return (
        <div className="passres center-container">
            <img src={logo} className="main-logo"  alt="logo"/>
            <div className="passres-container">
                <form className="passres-form" onSubmit={resetPass}>
                    <br/>
                    <label htmlFor="pass">
                        <p className="input-label">password</p>
                    <input type="password" id="pass" value={password} onChange={changePassword}>
                    
                    </input>
                    </label>
                    <label htmlFor="confirmpass">
                        <p className="input-label">confirm password</p>
                    <input type="password" id="confirmpass" value={confirmPass} onChange={changeConfirmPassword}>
                    
                    </input>
                    </label>
                    <div className="passres-buttons">
                        <input type='submit' className="passres-button" value="Reset Password"/>
                    </div>
                </form>
            </div>
        </div>
    )
}
 