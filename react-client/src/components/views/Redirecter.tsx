import { Redirect } from "react-router";
import { isAuthenticated } from "../../utils/authentication";

export function Redirecter() {
    return isAuthenticated()? <Redirect to='/main'/> : <Redirect to='/login'/>
}