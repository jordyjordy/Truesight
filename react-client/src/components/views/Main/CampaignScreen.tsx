// import { useEffect } from "react"
// import { useDispatch, useSelector } from "react-redux"
import { Route, Switch, useRouteMatch } from "react-router"
// import {editCampaign} from "../../../features/general/mainCampaignSlice"
// import { RootState } from "../../../store"
// import { getCampaign } from "../../../utils/campaign"
// import { List } from "../../partials/Campaign"
import "../../../style/Main/CampaignScreen.css"
import { Overview, Logbook, Notes } from "../Campaign"

export function CampaignScreen(props:any) {
    let {path} = useRouteMatch()
    return (
        <div>
            <Switch>
                <Route path={path + "/:campaignid/logs"}>
                    <Logbook />
                </Route>
                <Route path={path + "/:campaignid/notes"}>
                    <Notes/>
                </Route>
                <Route exact path={path + "/:id"}>
                    <Overview/>
                </Route>
            </Switch>
        </div>
    )
}