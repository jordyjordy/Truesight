import authentication from './authentication'
import {Campaign} from "../features/general/campaignsSlice"
import { Log } from '../features/general/logSlice'

interface campaignResponse {
    data:Campaign[]
}
interface createCampaignResponse {
    data:Campaign
}
export async function getCampaigns() {
    var res:campaignResponse = await authentication.get(process.env.REACT_APP_SERVER_IP +"/campaigns/list")
    return res.data
}

export async function createCampaign() {
    var res:createCampaignResponse = await authentication.post(process.env.REACT_APP_SERVER_IP+"/campaigns/",{campaign:{name:"new campaign"}})
    return res.data
}

export async function updateCampaign(campaign:Campaign) {
    var res:createCampaignResponse = await authentication.put(process.env.REACT_APP_SERVER_IP+'/campaigns/',{campaign:campaign})
    return res.data
}

export async function getCampaign(id:string) {
    var res: createCampaignResponse = await authentication.get(process.env.REACT_APP_SERVER_IP+'/campaigns?id='+id)
    return res.data
}

export async function deleteCampaign(id:string) {
    var res = await authentication.delete(process.env.REACT_APP_SERVER_IP+'/campaigns/',{params:{id:id}})
    return res.data
}

export async function getLog(id:string) {
    var res = await authentication.get(process.env.REACT_APP_SERVER_IP+'/campaigns/logs?id='+id)
    return res.data
}

export async function getLogs(id:string) {
    var res = await authentication.get(process.env.REACT_APP_SERVER_IP + "/campaigns/logs/list?id="+id)
    return res.data
}

export async function createLog(campaignid:string) {
    var res = await authentication.post(process.env.REACT_APP_SERVER_IP+'/campaigns/logs',{log:{name:"new log",session:0,campaign:campaignid}})
    return res.data
}

export async function updateLog(log:Log) {
    var res = await authentication.put(process.env.REACT_APP_SERVER_IP+'/campaigns/logs',{log:log})
    return res.data
}

export async function deleteLog(id:string) {
    await authentication.delete(process.env.REACT_APP_SERVER_IP+"/campaigns/logs?id="+id)
    return true
}