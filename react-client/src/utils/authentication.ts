import axios, { AxiosRequestConfig, AxiosResponse } from 'axios'

axios.interceptors.response.use(
    response => {
        return response
    },
    async error => {
        console.log(error)
        if (error.response.status === 401) {
            const longtoken = localStorage.getItem("longtoken")
            if (longtoken) {
                try {
                    var res = await axios.get(process.env.REACT_APP_SERVER_IP + '/user/authenticate', { headers: { 'longtoken': longtoken } })
                    localStorage.setItem("token", res.data)
                } catch (err) {
                    localStorage.removeItem('token')
                    localStorage.removeItem('longtoken')
                    throw new Error('disconnected')
                }
            } else {
                localStorage.removeItem('token')
                throw new Error('disconnected')
            }
            throw new Error('reconnected')

        } else if (error.response.status === 403) {
            throw new Error('forbidden')
        }
        throw error
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
    try{
        return axios.get(url,config)
    } catch(err:any) {
        console.log(err)
        if(err.message === "reconnected") {
            return axios.get(url,config)
        } 
        throw err
    }
}

export const post = async function(url:string, data?: any, config?: AxiosRequestConfig | undefined,auth:boolean=true): Promise<AxiosResponse<any>> {
    if(!auth) {
        return axios.post(url,data,config)
    }
    config = insertToken(config)
    try{
        return axios.post(url,data,config)
    } catch(err:any) {
        console.log(err)
        if(err.message === "reconnected") {
            return axios.post(url,data,config)
        } 
        throw err
    }
}

export const put = async function(url:string, data?: any, config? :AxiosRequestConfig|undefined, auth:boolean=true): Promise<AxiosResponse<any>> {
    if(!auth) {
        return axios.put(url,data,config)
    }
    config = insertToken(config)
    try{
        return axios.put(url,data,config)
    } catch(err:any) {
        console.log(err)
        if(err.message === "reconnected") {
            return axios.put(url,data,config)
        }
        throw err
    }
}

export const del = async function(url:string, config? :AxiosRequestConfig|undefined, auth:boolean=true): Promise<AxiosResponse<any>> {
    if(!auth) {
        axios.delete(url,config)
    }
    config = insertToken(config)
    try {
        return axios.delete(url,config)
    } catch(err:any) {
        if(err.message === "reconnected") {
            return axios.delete(url,config)
        }
        throw err
    }
}

function insertToken(config?:AxiosRequestConfig) {
    if(config) {
        if(config.headers) {
            config.headers.token = localStorage.getItem("token")
        } else {
            config.headers = {token:localStorage.getItem("token")}
        }
    } else {
        config = {headers: {token:localStorage.getItem("token")}}
    }
    return config
}

const exportedObject = {get:get, post:post, put:put, delete:del}
export default exportedObject