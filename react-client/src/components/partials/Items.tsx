import "../../style/Partials/Items.css"

interface itemProps{

}

export function Items(props:itemProps) {


    return (
        <div className='item-container'>
            <div className="section-header indigo">
                Item Stash
            </div>
            

            <div className="item-el new-item"></div>
        </div>
    )
}