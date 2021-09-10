import { useEffect, useState } from "react"
import {  useParams } from "react-router"
import { Log } from "../../../features/general/logSlice"
import { editCampaign } from "../../../features/general/mainCampaignSlice"
import { useAppDispatch, useAppSelector } from "../../../hooks"
import { getCampaign } from "../../../utils/campaign"


export function Notes() {
    const dispatch = useAppDispatch()
    let params:{campaignid:string} = useParams()
    const [searchParams,setSearchParams] = useState("")
    const [edit,setEdit] = useState(false)
    // const history = useHistory()
    var log = useAppSelector((state) => state.currentLog.log)
    var campaign = useAppSelector((state) => state.mainCampaign.campaign)
    const [tempLog,setTempLog] = useState({_id: log._id, name:log.name, session:log.session,text:log.text})
    
    useEffect(() => {
            getCampaign(params.campaignid).then((res) => {
                dispatch(editCampaign(res))
                // let tempstate:any = history.location.state
                // getLogs(params.campaignid).then((res) => {
                //     dispatch(populateLogs(res))
                //     if(res.length === 0) {
                //         dispatch(setLog({_id:"", name:"", session:NaN, text:""}))
                //         setTempLog({_id:'',name:'',session:0, text:''})
                //     } else {
                //         loadLog(tempstate && tempstate.itemid?tempstate.itemid:res[0]._id)
                //     }
                // }).catch((err) => {

                // }) 
            })
    // eslint-disable-next-line react-hooks/exhaustive-deps
    },[dispatch,params.campaignid])

    function updateSearchParams(event:React.FormEvent<HTMLInputElement>) {
        setSearchParams(event.currentTarget.value)
    }

    async function newLog() {
        // var log = await createLog(params.campaignid)
        // dispatch(addLog(log))
    }

    function loadLog(id:string) {
        // if(!edit || window.confirm("Opening another log will undo the changes made to the previous log, are you sure?")) {
        //     setEdit(false)
        //     getLog(id).then((res:Log)=> {
        //         dispatch(setLog(res))
        //         setTempLog(res)
        //     })
        // }
    }

    function changeLogText(event:React.FormEvent<HTMLTextAreaElement>) {
        setTempLog({...tempLog,text:event.currentTarget.value})

    }
    function changeLogSession(event: React.FormEvent<HTMLInputElement>) {
        const num = Number.isNaN(parseInt(event.currentTarget.value))?0:parseInt(event.currentTarget.value)
        setTempLog({...tempLog,session:num})
    }

    function changeLogName(event: React.FormEvent<HTMLInputElement>) {
        setTempLog({...tempLog,name:event.currentTarget.value})
    }

    async function save() {
        // setEdit(false)
        // var res = await updateLog({...tempLog,_id:log._id})
        // dispatch(setLog(res))
        // console.log('updating internal log')
        // dispatch(editLog(res))
    }

    async function deleteLog(log:Log) {
        // if(window.confirm("Are you sure you want to delete this log?")) {
        //     await delLog(log._id)
        //     const index = campaign.logs.findIndex((el) => el._id === log._id)
        //     if(index > 0) {
        //         loadLog(campaign.logs[index-1]._id)
        //     } else if (index > campaign.logs.length-1) {
        //         loadLog(campaign.logs[index+1]._id)
        //     } else {
        //         setTempLog({_id:"",name:"",session:0,text:""})
        //     }
        //     dispatch(removeLog(log._id))
        //     setEdit(false)
        // }
    }

    return (
    <div className='logs-screen'>
        <div className="logs-container">
            <div className='logs-search'>
                <input type='text' value={searchParams} onChange={updateSearchParams}/>
                <input type="button" value="New Log" onClick={newLog} />
            </div>
            <div className='logs-list'>
                {campaign.logs.map((el) => <div className='log-el' key={el._id||el} onClick={async ()=>loadLog(el._id)} ><h3>{el.name}</h3>Session {el.session}</div>)}
            </div>

        </div>
        <div className="logs-detail">
            <div className="title">
                {/*If we dont have a log, we dont show the name and buttons*/}
                {log._id !== ""?
                    /*If we are editing, we show inputs and textareas, otherwise we show regular text*/
                    !edit
                        ? <div>
                            <div>
                                <h3>{log.name}</h3>
                            Session {log.session}
                            </div>
                            <div>
                            <button onClick={() => setEdit(!edit)}>edit</button>
                            <button onClick={() => deleteLog(log)}>Delete</button>
                            </div>
                        </div> 
                        :<div>
                            <div>
                                Name: <input type="text" className="name-input" value={tempLog.name} onChange={changeLogName}/> <br/>
                                Session: <input type="number" value={tempLog.session} onChange={changeLogSession}/>
                            </div>
                            <div>
                                <button onClick={() => save()}>Save</button>
                                <button onClick={() => deleteLog(log)}>Delete</button>
                            </div>
                        </div>
                    :
                        <div></div>}
            </div>
            <div className="content">
                {edit
                ?<textarea value={tempLog.text} onChange={changeLogText}/>
                :<div className="log-text">{tempLog.text}</div>}
            </div>
        </div>
    </div>)

}