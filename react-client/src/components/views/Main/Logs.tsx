import { useParams } from "react-router";
import {Log,setLog,editName,editSession,editText} from "../../../features/general/logSlice";
import { editCampaign, addLog, populateLogs } from "../../../features/general/mainCampaignSlice";
import { RootState } from "../../../store";
import { useSelector } from "react-redux";
import React, { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { getCampaign, getLogs } from "../../../utils/campaign";
import { getLog,createLog, } from "../../../utils/campaign";

export function Logs() {
    const dispatch = useDispatch()
    let params:{campaignid:string} = useParams()
    const [searchParams,setSearchParams] = useState("")
    var log = useSelector((state:RootState) => state.currentLog.log)
    var campaign = useSelector((state:RootState) => state.mainCampaign.campaign)
    useEffect(() => {
            getCampaign(params.campaignid).then((res) => {
                dispatch(editCampaign(res))
                getLogs(params.campaignid).then((res) => {
                    console.log(res)
                    dispatch(populateLogs(res))
                })
            })
    },[dispatch,params.campaignid])

    function updateSearchParams(event:React.FormEvent<HTMLInputElement>) {
        setSearchParams(event.currentTarget.value)
    }

    async function newLog() {
        var log = await createLog(params.campaignid)
        dispatch(addLog(log))
    }

    return (<div className='logs-screen'>
        <div className="logs-container">
            <div className='logs-search'>
                <input type='text' value={searchParams} onChange={updateSearchParams}/>
                <input type="button" value="New Log" onClick={newLog} />
            </div>
            <div className='logs-list'>
                {campaign.logs.map((el) => <div key={el._id||el}>{el.name}HIIIIIIIIIIIIIIIIIIIIIII{el.session}</div>)}
            </div>

        </div>
        <div className="logs-detail">

        </div>
    </div>)

}