import React, { useState } from "react"
import { useHistory } from "react-router"
import { useDispatch } from "react-redux"
import { useRouteMatch } from "react-router-dom"
import {Campaign, editCampaign, removeCampaign} from "../../features/general/campaignsSlice"
import "../../style/Partials/CampaignCard.css"
import {updateCampaign as uc, deleteCampaign as dc} from "../../utils/campaign"
interface campaignProps {
    campaign:Campaign
}

export function CampaignCard(props:campaignProps) {
    const dispatch = useDispatch()
    const history = useHistory()
    const [edit, setEdit] = useState(false)
    let {path} = useRouteMatch()
    const [tempName, setTempName] = useState(props.campaign.name)
    async function updateCampaign(e:React.MouseEvent<HTMLElement>) {
        e.stopPropagation()
        if(edit) {
            var campaign = {...props.campaign}
            campaign.name = tempName
            var res = await uc(campaign)
            dispatch(editCampaign(res))
            setEdit(false)
        } else {
            setTempName(props.campaign.name)
            setEdit(true)
        }   

    }
    function showCampaign(e:React.MouseEvent<HTMLElement>) {
        e.stopPropagation()
        if(!edit) {
            history.push(path +'/campaign'+props.campaign._id)
        }
    }

    function deleteCampaign(e:React.MouseEvent<HTMLElement>) {
        e.stopPropagation()
        dc(props.campaign._id)
        dispatch(removeCampaign(props.campaign))
    }

    function editCampaignName(event:React.FormEvent<HTMLInputElement>) {
        event.preventDefault()
        event.stopPropagation()
        setTempName(event.currentTarget.value)
    }
    return (<div className='campaign-card' onClick={showCampaign}>
        <div className='campaign-card-header'>
            <div>{edit?<input value={tempName} onClick={(e) => {e.stopPropagation()}} onChange={editCampaignName}/>: props.campaign.name}</div>
            {props.campaign.isDM?(
            <div className='campaign-card-buttons' onClick={updateCampaign}>
                <img className='edit-image' src='/images/edit.svg' alt="edit-button"/>
                {edit && <button onClick={deleteCampaign}>Delete</button>}
            </div>):null}
            </div>
        </div>)
}