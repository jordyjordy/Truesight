import { useEffect } from "react"
import { useDispatch, useSelector } from "react-redux"
import { useHistory, useParams } from "react-router"
import {editCampaign} from "../../../features/general/mainCampaignSlice"
import { RootState } from "../../../store"
import { getCampaign } from "../../../utils/campaign"
import {Characters} from "../../partials"
import { Logbook } from "../../partials/Campaign"
import "../../../style/Main/CampaignScreen.css"
export function CampaignScreen(props:any) {
    const params:{id:string} = useParams()
    const history = useHistory()
    const campaign = useSelector((state:RootState) => state.mainCampaign.campaign)
    const dispatch = useDispatch()
    useEffect(() => {
        getCampaign(params.id).then((res) => {
            dispatch(editCampaign(res))
            console.log(res)
        }) 
    },[dispatch,params.id])

    function onOpenLogs() {
        history.push('/main/logs'+params.id)
    }
    return (<div className="campaign-container">
        <div className="x-1 y-1 long grid-item">
            <Characters characters={campaign.characters} header />
        </div>
        <div className="x-3 y-1 grid-item">
            <Logbook logs={campaign.logs} onOpenLogs={onOpenLogs} />
        </div>  
    </div>)
}