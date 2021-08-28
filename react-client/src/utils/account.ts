import axios from 'axios'

type loginResponse = {
    email:string, token:string, longtoken:string, err:{}
}

export async function login(email:string, password:string) {
    try {
    var res:loginResponse = await axios.post(process.env.REACT_APP_SERVER_IP + "/user/login",{email:email,password:password})
    localStorage.setItem("token",res.token)
    localStorage.setItem("longtoken",res.longtoken)
    return true
    } catch(err) {
        console.log(err)
        return false
    }
}