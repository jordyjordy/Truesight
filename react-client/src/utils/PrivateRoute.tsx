import {Redirect, Route} from "react-router-dom"
import {isAuthenticated} from "../utils/authentication"
export function PrivateRoute({children, path, exact, ...rest}:{children:any,path:string,exact?:any, rest?:any}) {
    return (
        <Route {...rest} {...exact} render={() => {
            return isAuthenticated()
            ? children
            : <Redirect to='/login'/>
        }} />
    )
}