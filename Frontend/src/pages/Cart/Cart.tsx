import { useContext } from 'react'
import './Cart.css'
import { StoreContext } from '../../contexts/StoreContext'
import { assets } from '../../assets/assets'
import { useNavigate } from 'react-router'

const Cart = () => {
    const { cartItem, food_list, removeFromCart, getTotalCartAmount } = useContext<any>(StoreContext)
    const navigate = useNavigate();
    return (
        <div className='cart'>
            <div className="cart-items">
                <div className="cart-items-title">
                    <p>Item</p>
                    <p>Title</p>
                    <p>Price</p>
                    <p>Quantity</p>
                    <p>Total</p>
                    <p>Remove</p>
                </div>
            </div>
            <br />
            <hr />
            {Object.keys(cartItem).length === 0 ? <div className='empty'>Cart is Empty</div>
                : <>
                    {food_list.map((food: any, index: number) => {
                        if (cartItem[food._id] > 0) {
                            return (
                                <>
                                    <div key={index} className="cart-items-title cart-items-item">
                                        <img src={food.image} alt="" />
                                        <p>{food.name}</p>
                                        <p>Rs.{food.price}</p>
                                        <p>{cartItem[food._id]}</p>
                                        <p>Rs.{food.price * cartItem[food._id]}</p>
                                        <p onClick={() => removeFromCart(food._id)} className='cross'><img src={assets.cross_icon} alt="" /></p>
                                    </div>
                                    <hr />
                                </>
                            );
                        }
                    })
                    }
                    <div className="cart-bottom">
                        <div className="cart-total">
                            <h2 >Cart Totals</h2>
                            <div>
                                <div className="cart-total-details">
                                    <p>Subtotal</p>
                                    <p>Rs.{getTotalCartAmount()}</p>
                                </div>
                                <hr />

                                <div className="cart-total-details">
                                    <p>Delivery Fee</p>
                                    <p>Rs.{getTotalCartAmount() === 0 ? 0 : 250}</p>
                                </div>
                                <hr />
                                <div className="cart-total-details">
                                    <p>Total</p>
                                    <p>Rs.{getTotalCartAmount() === 0 ? 0 : getTotalCartAmount() + 250}</p>
                                </div>
                            </div>
                            <button onClick={() => navigate('/order')}>Proceed to Checkout</button>
                        </div>
                        <div className="cart-promocode">
                            <div>
                                <p>If you have a Promo Code ,Enter it Here</p>
                                <div className="cart-promocode-input">
                                    <input type="text" placeholder='Enter Promo Code' />
                                    <button>Apply</button>
                                </div>
                            </div>
                        </div>
                    </div>
                </>
            }
        </div >
    )
}
export default Cart