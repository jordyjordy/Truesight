import authentication from './authentication'
import {Campaign} from "../features/general/campaignsSlice"

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
    var res:createCampaignResponse = await authentication.post(process.env.REACT_APP_SERVER_IP+"/campaigns/create",{campaign:{name:"new campaign"}})
    return res.data
}

export async function updateCampaign(campaign:Campaign) {
    var res:createCampaignResponse = await authentication.put(process.env.REACT_APP_SERVER_IP+'/campaigns/update',{campaign:campaign})
    console.log(res)
    return res.data
}

export async function getCampaign(id:string) {
    var res: createCampaignResponse = await authentication.get(process.env.REACT_APP_SERVER_IP+'/campaigns?id='+id)
    return res.data
}

export async function deleteCampaign(id:string) {
    var res = await authentication.delete(process.env.REACT_APP_SERVER_IP+'/campaigns/delete?id='+id)
    return res.data
}

export async function getLog(id:string) {
    var res = await authentication.get(process.env.REACT_APP_SERVER_IP+'/logs?id='+id)
    return res.data
}

export async function getLogs(id:string) {
    var res = await authentication.get(process.env.REACT_APP_SERVER_IP + "/campaigns/logs?id="+id)
    return res.data
}

export async function createLog(campaignid:string) {
    var res = await authentication.post(process.env.REACT_APP_SERVER_IP+'/logs/create',{log:{name:"new log",session:0,campaign:campaignid}})
    return res.data
}