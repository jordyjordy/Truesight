import axios, { AxiosRequestConfig, AxiosResponse } from 'axios'

axios.interceptors.response.use(
    response => {
        return response
    },
    async error => {
        if (error.response.status === 401) {
            const longtoken = localStorage.getItem("longtoken")
            if (longtoken &&error.config.headers.attempt <= 1) {
                try {
                    var res = await axios.get(process.env.REACT_APP_SERVER_IP + '/user/authenticate', { headers: { 'longtoken': longtoken } })
                    localStorage.setItem("token", res.data)
                    var config:AxiosRequestConfig = error.config
                    config.headers.token = res.data
                    console.log('retrying connection ' + config.headers.attempt)
                    config.headers.attempt = config.headers.attempt?2:1
                    return new Promise((resolve) => {
                        resolve(axios(config))
                    })
                } catch (err) {
                    localStorage.removeItem('token')
                    localStorage.removeItem('longtoken')
                    return Promise.reject(err)
                }
            }
            localStorage.removeItem('token')
            return Promise.reject(error)
        }
        return Promise.reject(error)
    }
)

export function isAuthenticated() {
    if(localStorage.getItem("token")) {
        return true
    }
    return false
}

export const get = async function(url:string, config?: AxiosRequestConfig | undefined,auth:boolean=true): Promise<AxiosResponse<any>> {
    if(!auth) {
        return axios.get(url,config)
    }
    config = insertToken(config)
    return axios.get(url,config)
}

export const post = async function(url:string, data?: any, config?: AxiosRequestConfig | undefined,auth:boolean=true): Promise<AxiosResponse<any>> {
    if(!auth) {
        return axios.post(url,data,config)
    }
    config = insertToken(config)
    return axios.post(url,data,config)
    
}

export const put = async function(url:string, data?: any, config? :AxiosRequestConfig|undefined, auth:boolean=true): Promise<AxiosResponse<any>> {
    if(!auth) {
        return axios.put(url,data,config)
    }
    config = insertToken(config)
    return axios.put(url,data,config)
}

export const del = async function(url:string, config? :AxiosRequestConfig|undefined, auth:boolean=true): Promise<AxiosResponse<any>> {
    if(!auth) {
        axios.delete(url,config)
    }
    config = insertToken(config)
    return axios.delete(url,config)
}

function insertToken(config?:AxiosRequestConfig) {
    if(config) {
        if(config.headers) {
            config.headers.token = localStorage.getItem("token")
            config.headers.attempt = 1
        } else {
            config.headers = {token:localStorage.getItem("token"), attempt:1}

        }
    } else {
        config = {headers: {token:localStorage.getItem("token"), attempt:1}}
    }
    return config
}

const exportedObject = {get:get, post:post, put:put, delete:del}
export default exportedObject