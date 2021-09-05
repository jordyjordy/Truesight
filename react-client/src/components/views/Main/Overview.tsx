import {Characters, Campaigns} from '../../partials/'
import "../../../style/Main/Overview.css"
export function Overview() {
    return (
        <div className='overview-container'>
            <Characters header={true} columns={1}/>
            <Campaigns header={true} />
        </div>
    )
}