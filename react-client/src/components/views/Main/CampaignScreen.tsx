import { useEffect } from "react"
import { useDispatch, useSelector } from "react-redux"
import { Route, Switch, useHistory, useParams, useRouteMatch } from "react-router"
import {editCampaign} from "../../../features/general/mainCampaignSlice"
import { RootState } from "../../../store"
import { getCampaign } from "../../../utils/campaign"
import { List } from "../../partials/Campaign"
import "../../../style/Main/CampaignScreen.css"
import { Overview, Logbook } from "../Campaign"

export function CampaignScreen(props:any) {
    let {path} = useRouteMatch()
    return (
        <Switch>
            <Route exact path={path}>
                <Overview/>
            </Route>
            <Route path={path + "/logs"}>
                <Logbook />
            </Route>
        </Switch>

    )
}