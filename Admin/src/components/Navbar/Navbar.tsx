import { assets } from '../../assets/assets'
import './Navbar.css'
const Navbar = () => {
    return (
        <div className='navbar'>
            <div className="logo">Bite Savor</div>
            <img src={assets.profile_image} className='profile' alt={assets.profile_image} />

        </div>
    )
}

export default Navbar