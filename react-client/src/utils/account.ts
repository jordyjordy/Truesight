import authentication from "./authentication"

type loginResponse = {
    data:{
        email:string, token:string, longtoken:string, err:{}
    } 
}

export async function login(email:string, password:string) {
    try{
    var res:loginResponse = await authentication.post(process.env.REACT_APP_SERVER_IP + "/user/login",{email:email,password:password},{},false)
    localStorage.setItem("token",res.data.token)
    localStorage.setItem("longtoken",res.data.longtoken)
    return true
    } catch(err) {
        return false
    }
}

export async function register(email:string, password:string):Promise<boolean> {
    try{
        await authentication.post(process.env.REACT_APP_SERVER_IP + "/user/register",{email:email, password:password},{},false)
        return true
    } catch(err) {
        return false
    }
}

export async function requestReset(email:string):Promise<boolean> {
    try {
        await authentication.post(process.env.REACT_APP_SERVER_IP + "/user/requestpasswordreset",{email:email},{},false)
        return true
    } catch(err) {
        return false
    }
}

export async function resetPassword(token:string,password:string):Promise<boolean> {
    try {
        await authentication.post(process.env.REACT_APP_SERVER_IP + "/user/passwordreset",{token:token,password:password},{},false)
        return true
    } catch(err) {
        return false
    }
}