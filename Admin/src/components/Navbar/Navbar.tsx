import { assets } from '../../assets/assets'
import './Navbar.css'
const Navbar = () => {
    return (
        <div className='navbar'>
            <img src={assets.logo} alt={assets.logo} className="logo" />
            <img src={assets.profile_image} className='profile' alt={assets.profile_image} />

        </div>
    )
}

export default Navbar