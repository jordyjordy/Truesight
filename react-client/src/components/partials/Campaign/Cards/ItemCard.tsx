import { Card } from "../../Card";

interface ItemProps {
    item: {
        name:string,
        type:string
    },
    clicked:Function
}
export function ItemCard(props:ItemProps) {

    return (
        <Card clicked={() => props.clicked(props.item)}>
            <div>{props.item.name}</div>
            <div style={{fontSize:'15px'}}>Session: {props.item.type}</div>
        </Card>

    )
}