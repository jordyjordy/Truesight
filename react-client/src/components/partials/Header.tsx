import { useEffect, useState } from "react"
import { Link, useHistory } from "react-router-dom"
import logo from "../../Logo-small.png"
import "../../style/Header.css"
export function Header() {
    const history = useHistory()
    const [yPos, setYPos] = useState(window.pageYOffset)
    function logout() {
        localStorage.removeItem("token")
        localStorage.removeItem("longtoken")
        history.push('/')
    }

    useEffect(() => {
        window.addEventListener("scroll",(event) => {
            console.log('scrolling')
            console.log(yPos)
            setYPos(window.pageYOffset)
        })
    })
    return (
        <header>
            <div className="header">
            <div className="logo-container">
                <img className="logo-image" src={logo} alt="small-logo" />
                <span className="logo-text">Truesight</span>
            </div>
            
            <div className='header-links'>
                <Link className='header-link' to='/main/'>Home
                </Link>
                <Link className='header-link' to='/main/characters'>Characters
                </Link>
                <Link className='header-link' to='/main/campaigns'>Campaigns
                </Link>
                <Link className='header-link' to='/main/settings'>Settings
                </Link>
                <span className='header-link' onClick={logout}>Logout
                </span>
            </div>
            </div>
        </header>
    )
}