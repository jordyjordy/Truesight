import React from "react"

import "../../../style/Partials/Campaign/Logbook.css"

interface logbookProps{
    logs:any[]
    onOpenLogs:Function
}



export function Logbook(props:logbookProps) {
    function openLogs(event:React.MouseEvent) {
        props.onOpenLogs();
    }

    return (
        <div className="logbook-container">
            <div className='section-header brown' onClick={openLogs} >Logbook</div>
            {props.logs.map(el => <div className='log-el' onClick={() => openLogs}>{el.name}</div>)}
        </div>
    )
}