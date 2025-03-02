import './Navbar.css'
import { assets } from '../../assets/frontend_assets/assets'
import { useContext, useState } from 'react'
import { Link } from 'react-router'
import { NavbarProps } from '../../Types'
import { StoreContext } from '../../contexts/StoreContext'

const Navbar = (props: NavbarProps) => {
    const { setShowLogin } = props;
    const [menu, setMenu] = useState("home")
    const { getTotalCartAmount } = useContext<any>(StoreContext)
    return (
        <div className="navbar">
            <Link to='/'><div className="logo">Bite Savor</div></Link>
            <ul className="navbar-menu">
                <Link to='/' onClick={() => setMenu("home")} className={menu === "home" ? "active" : ''}>Home</Link>
                <a href='#explore-menu' onClick={() => setMenu("menu")} className={menu === 'menu' ? 'active' : ''}>Menu</a>
                <a href='#app-download' onClick={() => setMenu("mobile-app")} className={menu === "mobile-app" ? "active" : ''}>Mobile App</a>
                <a href='#footer' onClick={() => setMenu("contact-us")} className={menu === "contact-us" ? "active" : ''}>Contact Us</a>
            </ul >
            <div className="navbar-right">
                <img src={assets.search_icon} alt="Search Icon" />
                <div className="navbar-search-icon">
                    <Link to="/cart"><img src={assets.basket_icon} alt="" /></Link>

                    <div className={getTotalCartAmount() === 0 ? "" : "dot"}></div>
                </div>
                <button onClick={() => setShowLogin(true)}>Sign In</button>
            </div>
        </div >
    )
}

export default Navbar