import './Header.css'
const Header = () => {
    return (
        <div className='header'>
            <div className="header-contents">
                <h2>Order Your Favourite Food</h2>
                <p>Choose from a diverse menu featuring a delectable array of dishes crafted with the finest ingredient and culinary expertise.</p>
                <a href='#explore-menu' className='btn' >View Menu</a>
            </div>
        </div>
    )
}

export default Header