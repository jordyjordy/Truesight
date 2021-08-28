import logo from "../../Logo-big.png"
import "../../style/Login.css"
import { Link } from "react-router-dom"
import React, { useState } from "react";
import {login as requestLogin} from "../../utils/account"
import { useHistory } from "react-router";
export function Login() {

    const history = useHistory()
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("")
    const login = async function(event:React.FormEvent){
        event.preventDefault()
        if(await requestLogin(email,password)) {
            console.log(' succes?!')
            history.push('/main')
        }
    }

    const changeEmail = function(event:React.FormEvent<HTMLInputElement>) {
        console.log('changing email')
        setEmail(event.currentTarget.value)
    }

    const changePassword = function(event:React.FormEvent<HTMLInputElement>) {
        console.log('changing password')
        setPassword(event.currentTarget.value)
    }

    return (
        <div className="login center-container">
            <img src={logo} className="main-logo"  alt="logo"/>
            <div className="login-container">
                <form className="login-form" onSubmit={login}>
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
                    <div className="login-buttons">
                        <div>
                        <Link to={{
                            pathname: "/register"
                        }}>Create an Account</Link><br/>
                        <Link to={{
                            pathname: "/requestpassword"
                        }}>Forgot Password</Link>
                        </div>
                        <input type='submit' className="login-button" value="Login"/>
                    </div>
                </form>
            </div>
        </div>
    )
}
 