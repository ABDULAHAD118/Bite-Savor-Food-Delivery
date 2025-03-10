import { useContext } from 'react'
import { StoreContext } from '../../contexts/StoreContext'
import './FoodDisplay.css'
import FoodItem from '../FoodItem/FoodItem';
import Spinner from '../Spinner/Spinner';
import { food_list } from '../../Types';


const FoodDisplay = (props: any) => {
    const { category } = props;
    const { food_list, pending } = useContext<any>(StoreContext);
    return (
        <div className='food-display' id='food-display'>
            <h2>Top Dishes Near You</h2>
            {pending ? (
                <Spinner width={50} height={50} borderWidth={5} />
            ) : food_list.length === 0 ? (
                <h3>No food items found</h3>
            ) : (
                (() => {
                    const filteredFood = food_list.filter((food: { category: string }) => category === 'All' || food.category === category);

                    return filteredFood.length === 0 ? (
                        <div className='empty'>No items found for the selected category</div>
                    ) : (
                        <div className="food-display-list">
                            {filteredFood.map((food: food_list) => (
                                <FoodItem
                                    key={food._id}
                                    id={food._id}
                                    name={food.name}
                                    description={food.description}
                                    price={food.price}
                                    image={food.image}
                                />
                            ))}
                        </div>
                    );
                })()
            )}

        </div>
    )
}

export default FoodDisplay