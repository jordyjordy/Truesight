import { Card } from "../../Card";

interface LogProps {
    item: {
        name:string,
        session:number
    },
    clicked:Function
}
export function LogCard(props:LogProps) {

    return (
        <Card clicked={() => props.clicked(props.item)}>
            <div>{props.item.name}</div>
            <div style={{fontSize:'15px'}}>Session: {props.item.session}</div>
        </Card>

    )
}