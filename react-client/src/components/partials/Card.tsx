import "../../style/Partials/Card.css"


export function Card(props:any) {


    return (
        <div className="card" onClick={props.clicked}>{props.children}</div>
    )
}