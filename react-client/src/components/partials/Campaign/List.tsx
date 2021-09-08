import { Card } from "../Card";
import "../../../style/Partials/Campaign/List.css"

interface ListProps{
    onHeaderClick:Function,
    onCardClick:Function,
    renderCard:Function,
    headerColor?:string,
    headerText:string,
    listItems:any[],
    itemlimit?:number,
    referenceUrl?:string
}

export function List(props:ListProps) {

    return (
        <div className="list">
            <div className={"section-header"} style={{backgroundColor:props.headerColor!}} onClick={() => props.onHeaderClick()} >{props.headerText}</div> 
            {props.listItems.map((el:any, index:number) => {
                if(props.itemlimit === undefined || index < props.itemlimit) { 
                return <Card key={el._id ||el} clicked={() => props.onCardClick(props.referenceUrl,el._id)}>{props.renderCard(el)}</Card>
                } else {
                    return null
                }
            })}
        </div>  
    )
}