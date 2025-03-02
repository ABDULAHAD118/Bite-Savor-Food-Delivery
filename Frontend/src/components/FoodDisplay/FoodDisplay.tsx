import { useContext } from 'react'
import { StoreContext } from '../../contexts/StoreContext'
import './FoodDisplay.css'
import { StoreContextType } from '../../Types';
import FoodItem from '../FoodItem/FoodItem';


const FoodDisplay = (props: any) => {
    const { category } = props;
    const { food_list }: StoreContextType = useContext(StoreContext) as any;
    return (
        <div className='food-display' id='food-display'>
            <h2>Top Dishes Near You</h2>
            <div className="food-display-list">
                {food_list.map((food, index) => {
                    if (category === 'All' || category === food.category) {
                        return <FoodItem key={index} id={food._id} name={food.name} description={food.description} price={food.price} image={food.image} />
                    }
                })}
            </div>
        </div>
    )
}

export default FoodDisplay