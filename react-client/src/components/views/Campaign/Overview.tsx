import { useEffect } from "react"
import { useDispatch, useSelector } from "react-redux"
import { useHistory, useParams, useRouteMatch } from "react-router"
import {editCampaign} from "../../../features/general/mainCampaignSlice"
import { RootState } from "../../../store"
import { getCampaign } from "../../../utils/campaign"
import { List } from "../../partials/Campaign"
import { CharacterCard, LogCard, NoteCard, ItemCard, HandoutCard, SpellCard } from "../../partials/Campaign/Cards"
import "../../../style/Main/CampaignScreen.css"

export function Overview(props:any) {
    const params:{id:string} = useParams()
    let {url} = useRouteMatch()
    const history = useHistory()
    const campaign = useSelector((state:RootState) => state.mainCampaign.campaign)
    const dispatch = useDispatch()
    useEffect(() => {
        getCampaign(params.id).then((res) => {
            dispatch(editCampaign(res))
        }) 
    },[dispatch,params.id])

    function onOpenDetailPage(newurl:string,itemid?:string) {
        history.push(url+newurl, {itemid:itemid})
    }
    return (
    <div className="campaign-container">
        <div className="x-1 y-1 grid-item long">
            <List headerColor="purple" headerText="Characters"
                onHeaderClick={() => onOpenDetailPage('/characters')} onCardClick={onOpenDetailPage}
                listItems={campaign.characters} referenceUrl={'/characters'}
                card={CharacterCard}
                />
        </div>
        
        <div className="x-3 y-1 grid-item">
            <List headerColor="#794017" headerText="Logbook"
                onHeaderClick={() => onOpenDetailPage('/logs')} onCardClick={onOpenDetailPage}
                listItems={campaign.logs.slice().reverse()} itemlimit={4} referenceUrl={'/logs'}
                card={LogCard}
                />
        </div>
        <div className="x-4 y-1 long grid-item">
            <List headerColor="#B92C00" headerText="Notes"
                onHeaderClick={() => onOpenDetailPage('/notes')} onCardClick={onOpenDetailPage}
                listItems={campaign.notes} itemlimit={8} referenceUrl={'/notes'}
                card={NoteCard}
                />
        </div> 
        <div className="x-3 y-2 grid-item">
            <List headerColor="#444444" headerText="Handouts"
                onHeaderClick={() => onOpenDetailPage('/handouts')} onCardClick={onOpenDetailPage}
                listItems={campaign.handouts} itemlimit={4} referenceUrl={'/handouts'}
                card={HandoutCard}
                />
        </div>
        <div className="x-2 y-1 grid-item">
            <List headerColor="#1B558B" headerText="Item stash"
                onHeaderClick={() => onOpenDetailPage('/items')} onCardClick={onOpenDetailPage}
                listItems={campaign.items} itemlimit={4} referenceUrl={'/items'}
                card={ItemCard}
                />
        </div>
        <div className="x-2 y-2 grid-item">
            <List headerColor="#14816D" headerText="Spell pool"
                onHeaderClick={() => onOpenDetailPage('/spells')} onCardClick={onOpenDetailPage}
                listItems={campaign.spells} itemlimit={4} referenceUrl={'/spells'}
                card={SpellCard}
                />
        </div>      
    </div>)
}