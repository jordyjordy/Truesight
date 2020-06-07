import axios from 'axios'
const config = require('../config/server')
export default {
    login: async function (user, pass) {
        const url = config.serverip + "/user/login";
        console.log(url)
        try{
        const result = await axios.post(url,{email:user, password:pass})
        console.log(result)
        return result
        } catch(err) {
            return "error"
        }
        
    }
}