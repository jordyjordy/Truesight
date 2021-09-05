import { getCampaigns,createCampaign } from "../../utils/campaign";
import { useSelector, useDispatch} from 'react-redux'
import {RootState} from "../../store"
import {addCampaign, setCampaigns} from "../../features/general/campaignsSlice"
import { useEffect } from "react";
import { CampaignCard } from ".";

import "../../style/Partials/Campaigns.css"

interface campaignProps {
    header?:boolean
}
export function Campaigns(props:campaignProps) {
    const campaigns = useSelector((state:RootState) => state.campaigns.campaigns)
    const dispatch = useDispatch()
    useEffect(()=> {
        getCampaigns().then((data) => {
            dispatch(setCampaigns(data))
        })
    },[dispatch])

    function header() {
        if(props.header) {
            return (<div className='section-header blue'>Campaigns</div>)
        }
        return null
    }
    async function crc(){
        const res = await createCampaign()
        console.log(res)
        dispatch(addCampaign(res))
    }
    return (
        <div className='campaigns-container'>
            {header()}
            <div className='campaigns-grid'>
                {campaigns.map(campaign => {
                    return <CampaignCard  key={campaign._id} campaign={campaign}/>
                })}
                <div className="campaign-card campaign-maker" onClick={crc}><div>Make a new campaign</div></div>
            </div>
        </div>
    )
}