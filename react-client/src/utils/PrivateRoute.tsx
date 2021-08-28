import React from "react"
import {Redirect, Route} from "react-router-dom"
import {isAuthenticated} from "../utils/authentication"
export function PrivateRoute({children, path, ...rest}:{children:any,path:string, rest?:any[]}) {
    return (
        <Route {...rest} render={() => {
            return isAuthenticated()
            ? children
            : <Redirect to='/'/>
        }} />
    )
}