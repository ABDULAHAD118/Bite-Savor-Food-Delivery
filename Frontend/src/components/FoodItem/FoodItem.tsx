import { useContext } from 'react';
import { assets } from '../../assets/frontend_assets/assets';
import './FoodItem.css'
import { FoodItemProps } from '../../Types';
import { StoreContext } from '../../contexts/StoreContext';


const FoodItem = (props: FoodItemProps) => {
    const { cartItem, addToCart, removeFromCart, URL } = useContext<any>(StoreContext);
    const { id, name, description, price, image } = props;
    return (
        <div className='food-item' key={id} >
            <div className="food-item-image-container">
                <img src={`${URL}/images/` + image} className='food-item-image' alt={name} />
                {!cartItem[id] ? <img src={assets.add_icon_white} className='add' onClick={() => addToCart(id)} alt='' /> :
                    <div className="food-item-counter">
                        <img src={assets.remove_icon_red} onClick={() => removeFromCart(id)} alt='' />
                        <p>{cartItem[id]}</p>
                        <img src={assets.add_icon_green} onClick={() => addToCart(id)} alt='' />
                    </div>

                }
            </div>
            <div className="food-item-info">
                <div className="food-item-name-rating">
                    <p>{name}</p>
                    <img src={assets.rating_starts} alt="" />
                </div>
                <p className="food-item-desc">{description}</p>
                <p className="food-item-price">${price}</p>
            </div>
        </div>
    )
}

export default FoodItem