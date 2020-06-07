import axios from 'axios'
config = require('../config/server')
module.exports.login = (username, password) => {
    url = config.serverip + "/user/login";
    console.log(url)
    axios.post(url)
}