import { useContext } from 'react'
import { StoreContext } from '../../contexts/StoreContext'
import './FoodDisplay.css'
import FoodItem from '../FoodItem/FoodItem';
import Spinner from '../Spinner/Spinner';


const FoodDisplay = (props: any) => {
    const { category } = props;
    const { food_list, pending } = useContext<any>(StoreContext);
    return (
        <div className='food-display' id='food-display'>
            <h2>Top Dishes Near You</h2>
            {pending ? <Spinner width={50} height={50} borderWidth={5} /> : <div className="food-display-list">
                {food_list.map((food: any, index: number) => {
                    if (category === 'All' || category === food.category) {
                        return <FoodItem key={index} id={food._id} name={food.name} description={food.description} price={food.price} image={food.image} />
                    }
                })}
            </div>}
        </div>
    )
}

export default FoodDisplay