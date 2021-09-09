import { Card } from "../../Card";

interface NoteProps {
    item: {
        name:string,
        session:string,
        type:string
    },
    clicked:Function
}
export function NoteCard(props:NoteProps) {

    return (
        <Card clicked={() => props.clicked(props.item)}>
                    <div>{props.item.name}</div>
                    <div style={{fontSize:'15px'}}>Session: {props.item.session} </div>
                    <div style={{fontSize:'15px'}}>Type: {props.item.type} </div>
        </Card>

    )
}