import { useLocation, matchPath, match } from "react-router";
import { Link } from "react-router-dom";
import { useAppSelector } from "../../hooks";
import "../../style/Partials/BreadCrumb.css"


export function BreadCrumb(props:any) {

    const campaign = useAppSelector((state) => state.mainCampaign.campaign)
    const importantRoutes = [
        {path:"/main/", name:"Home"},
        {path:"/main/campaign/:id", name:campaign.name},
        {path:"/main/campaign/:id/logs", name:'logs'},
        {path:"/main/campaign/:id/handouts", name:'handouts'},
        {path:"/main/campaign/:id/notes", name:'notes'},
        {path:"/main/campaign/:id/characters", name:'characters'},
        {path:"/main/campaign/:id/spells", name:'spells'},
        {path:"/main/campaign/:id/items", name:'items'},
    ]
    const {pathname} = useLocation() 
    var crumbs:{url:string,name:string}[] = []
    importantRoutes.forEach((route) => {
        const match:match|null =matchPath(pathname, {
            path:route.path,
            exact:false,
            strict:false 
         
        })
        if(match !== null) {
            const {url} = match
            crumbs.push({url:url,name:route.name})
        }
    })
    return (
        <div className="breadcrumb-clear">
        <div className="breadcrumb">
            {crumbs.map((el,index) => {
                if(index < crumbs.length-1) {
                 return (
                <span key={el.url} className="breadcrumb-link"><Link className="breadcrumb-link" to={el.url}>{el.name}</Link> / </span> 
                )
                } 
                return (<span key={el.url} className='breadcrumb-link dead'>{el.name}</span>)
        })}
        </div>
        </div>
    )
}