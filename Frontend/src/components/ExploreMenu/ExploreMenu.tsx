import './ExploreMenu.css'
import { menu_list } from '../../assets/frontend_assets/assets'

interface ExploreMenuProps {
    category: string;
    setCategory: (category: string) => void;
}
const ExploreMenu = (props: ExploreMenuProps) => {
    const { category, setCategory } = props;
    return (
        <div className='explore-menu' id='explore-menu'>
            <h1>Explore Our Menu</h1>
            <p className='explore-menu-text'>Swipe, tap, and explore a world of flavors. Whether you're in the mood for a quick bite or a full feast, we've got it all!</p>
            <div className="explore-menu-list">
                {menu_list.map((item, index) => {
                    return (
                        <div onClick={() => setCategory(category === item.menu_name ? 'All' : item.menu_name)} key={index} className='explore-menu-list-item'>
                            <img src={item.menu_image} className={category === item.menu_name ? "active" : ''} alt={item.menu_name} />
                            <p>{item.menu_name}</p>
                        </div>
                    )
                })}
            </ div>
            <hr />
        </div >
    )
}

export default ExploreMenu