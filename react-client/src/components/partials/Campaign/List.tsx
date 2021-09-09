import "../../../style/Partials/Campaign/List.css"

interface ListProps{
    onHeaderClick:Function,
    onCardClick:Function,
    card:(props:{item:any,clicked:Function})=>JSX.Element,
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
                return (<props.card key={el._id ||el} item={el} clicked={() => props.onCardClick(props.referenceUrl,el._id)}/>)
                } else {
                    return null
                }
            })}
        </div>  
    )
}