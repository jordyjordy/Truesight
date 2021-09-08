import { useEffect } from "react"
import { useDispatch, useSelector } from "react-redux"
import { useHistory, useParams } from "react-router"
import {editCampaign} from "../../../features/general/mainCampaignSlice"
import { RootState } from "../../../store"
import { getCampaign } from "../../../utils/campaign"
import { List } from "../../partials/Campaign"
import "../../../style/Main/CampaignScreen.css"
export function CampaignScreen(props:any) {
    const params:{id:string} = useParams()
    const history = useHistory()
    const campaign = useSelector((state:RootState) => state.mainCampaign.campaign)
    const dispatch = useDispatch()
    useEffect(() => {
        getCampaign(params.id).then((res) => {
            dispatch(editCampaign(res))
        }) 
    },[dispatch,params.id])

    function onOpenDetailPage(url:string,itemid?:string) {
        console.log(itemid)
        history.push(url + params.id, {itemid:itemid})
    }
    return (<div className="campaign-container">
        <div className="x-1 y-1 grid-item long">
            <List headerColor="purple" headerText="Characters"
                onHeaderClick={() => onOpenDetailPage('characters')} onCardClick={onOpenDetailPage}
                listItems={campaign.characters} referenceUrl={'characters'}
                renderCard={(character:any) => (
                <div>
                    <div>{character.name}</div>
                    <div style={{fontSize:'15px'}}>Session: {character.cclass.name}</div>
                </div>)}
                />
        </div>
        <div className="x-2 y-1 grid-item">
            <List headerColor="#1B558B" headerText="Item stash"
                onHeaderClick={() => onOpenDetailPage('items')} onCardClick={onOpenDetailPage}
                listItems={campaign.items} itemlimit={4} referenceUrl={'items'}
                renderCard={(item:any) => (
                <div>
                    <div>{item.name}</div>
                    <div style={{fontSize:'15px'}}>Session: {item.type}</div>
                </div>)}
                />
        </div>
        <div className="x-2 y-2 grid-item">
            <List headerColor="#14816D" headerText="Spell pool"
                onHeaderClick={() => onOpenDetailPage('spells')} onCardClick={onOpenDetailPage}
                listItems={campaign.spells} itemlimit={4} referenceUrl={'spells'}
                renderCard={(spell:any) => (
                <div>
                    <div>{spell.name}</div>
                    <div style={{fontSize:'15px'}}>Session: {spell.type}</div>
                </div>)}
                />
        </div>    
        <div className="x-3 y-1 grid-item">
            <List headerColor="#794017" headerText="Logbook"
                onHeaderClick={() => onOpenDetailPage('logs')} onCardClick={onOpenDetailPage}
                listItems={campaign.logs.slice().reverse()} itemlimit={4} referenceUrl={'logs'}
                renderCard={(log:any) => (
                <div>
                    <div>{log.name}</div>
                    <div style={{fontSize:'15px'}}>Session: {log.session}</div>
                </div>)}
                />
        </div>
        <div className="x-3 y-2 grid-item">
            <List headerColor="#444444" headerText="Handouts"
                onHeaderClick={() => onOpenDetailPage('handouts')} onCardClick={onOpenDetailPage}
                listItems={campaign.handouts} itemlimit={4} referenceUrl={'handouts'}
                renderCard={(handout:any) => (
                <div>
                    <div>{handout.name}</div>
                </div>)}
                />
        </div>
        <div className="x-4 y-1 long grid-item">
            <List headerColor="#B92C00" headerText="Notes"
                onHeaderClick={() => onOpenDetailPage('notes')} onCardClick={onOpenDetailPage}
                listItems={campaign.notes} itemlimit={8} referenceUrl={'notes'}
                renderCard={(note:any) => (
                <div>
                    <div>{note.name}</div>
                    <div style={{fontSize:'15px'}}>Session: {note.session} </div>
                    <div style={{fontSize:'15px'}}>Type: {note.type} </div>
                </div>)}
                />
        </div>   
    </div>)
}