import { Card } from "../../Card";

interface HandoutProps {
    item: {
        name:string,
    },
    clicked:Function
}
export function HandoutCard(props:HandoutProps) {

    return (
        <Card clicked={() => props.clicked(props.item)}>
                    <div>{props.item.name}</div>
        </Card>

    )
}