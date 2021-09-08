import { Switch, Route, useRouteMatch} from "react-router-dom"
import { Header } from "../partials/"
import { Campaigns, Characters,  Settings, Overview, CampaignScreen, Logbook} from "./Main/";
import "../../style/Main/Main.css"
export function Main() {
    let { path} = useRouteMatch();
    return (
      <div>
      <Header />
      <main className='main'>
        <div className='main-item'>
          <Switch >
            <Route exact path={path}>
              <Overview />
            </Route>
            <Route exact path={path+"/characters"}>
              <Characters />
            </Route>
            <Route exact path={path+"/campaigns"}>
              <Campaigns />
            </Route>
            <Route exact path={path+"/settings"}>
              <Settings />
            </Route>
            <Route path={path+"/campaign:id"}>
              <CampaignScreen />
            </Route>
            <Route path={path+"/logs:campaignid"}>
              <Logbook />
            </Route>
          </Switch>
        </div>
      </main>
      </div>
    )
}