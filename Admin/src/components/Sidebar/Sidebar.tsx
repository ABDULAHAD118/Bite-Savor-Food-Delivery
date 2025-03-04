import { NavLink } from 'react-router'
import { assets } from '../../assets/assets'
import './Sidebar.css'
const Sidebar = () => {
    return (
        <div className='sidebar'>
            <div className="sidebar-options">
                <NavLink to='/add' className="sidebar-option">
                    <img src={assets.add_icon} alt={assets.add_icon} />
                    <p>Add Items</p>
                </NavLink>
                <NavLink to='/list' className="sidebar-option">
                    <img src={assets.order_icon} alt={assets.order_icon} />
                    <p>List Items</p>
                </NavLink>
                <NavLink to='/order' className="sidebar-option">
                    <img src={assets.order_icon} alt={assets.order_icon} />
                    <p>Orders</p>
                </NavLink>
            </div>
        </div>
    )
}

export default Sidebar