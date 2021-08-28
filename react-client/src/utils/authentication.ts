

export function isAuthenticated() {
    if(localStorage.getItem("token")) {
        console.log(localStorage.getItem("token"))
        return true
    }
    return false
}