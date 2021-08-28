import logo from "../../Logo-big.png"
import "../../style/Register.css"
import React, { useState } from "react";
import {register as requestRegister} from "../../utils/account"
import { useHistory } from "react-router";
export function Register () {

    const history = useHistory()
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("")
    const [confirmPass,setConfirmPass] = useState("")
    const register = async function(event:React.FormEvent){
        event.preventDefault()
        if(password !== confirmPass) {
            alert("Your passwords don't match!")
            return
        }
        if(validateEmail(email)) {
            const res = await requestRegister(email, password)
            if(res === "success") {
                history.push('/')
            } else {
                alert("Something went wrong, please try again later")
            }
        } else {
            alert("Please enter a valid email adress")
        }
    }

    const changeEmail = function(event:React.FormEvent<HTMLInputElement>) {
        setEmail(event.currentTarget.value)
    }

    const changePassword = function(event:React.FormEvent<HTMLInputElement>) {
        setPassword(event.currentTarget.value)
    }

    const changeConfirmPassword = function(event:React.FormEvent<HTMLInputElement>) {
        setConfirmPass(event.currentTarget.value)
    }
    const validateEmail = function(email:string) {
        const re = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
        return re.test(String(email).toLowerCase());
      }
    return (
        <div className="register center-container">
            <img src={logo} className="main-logo"  alt="logo"/>
            <div className="register-container">
                <form className="register-form" onSubmit={register}>
                    <label htmlFor="email">
                        <p className="input-label">email</p>
                    <input type="text" id="email" value={email} onChange={changeEmail}>

                    </input>
                    </label>
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
                    <div className="register-buttons">
                        <input type='submit' className="register-button" value="Register"/>
                    </div>
                </form>
            </div>
        </div>
    )
}
 