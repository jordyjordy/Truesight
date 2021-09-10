import { Switch, Route, useRouteMatch} from "react-router-dom"
import { Header } from "../partials/"
import { Campaigns,  Settings, Overview, CampaignScreen} from "./Main/";
import { BreadCrumb } from "../partials/BreadCrumb";
import "../../style/Main/Main.css"
export function Main() {
    let { path} = useRouteMatch();
    return (
      <div>
      <Header />
      <main className='main'>
      <BreadCrumb/>
        <div className='main-item'>
          <Switch >
            <Route path={path+"/campaign"}>
              <CampaignScreen />
            </Route>
            <Route exact path={path}>
              <Overview />
            </Route>
            <Route exact path={path+"/campaigns"}>
              <Campaigns />
            </Route>
            <Route exact path={path+"/settings"}>
              <Settings />
            </Route>
          </Switch>
        </div>
      </main>
      </div>
    )
}