import { Card } from "../../Card";

interface CharacterProps {
    item: {
        name:string,
        cclass:{name:string}
    },
    clicked:Function
}
export function CharacterCard(props:CharacterProps) {

    return (
        <Card clicked={() => props.clicked(props.item)}>
            <div>{props.item.name}</div>
            <div style={{fontSize:'15px'}}>Session: {props.item.cclass.name}</div>
        </Card>

    )
}