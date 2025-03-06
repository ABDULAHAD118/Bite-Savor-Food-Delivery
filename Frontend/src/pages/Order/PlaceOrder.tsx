import { ChangeEvent, FormEvent, useContext, useEffect, useState } from 'react'
import './PlaceOrder.css'
import { StoreContext } from '../../contexts/StoreContext'
import axios from 'axios';
import { toast } from 'react-toastify';
import { useNavigate } from 'react-router';
import { NavbarProps } from '../../Types';
import Spinner from '../../components/Spinner/Spinner';

const PlaceOrder = (props: NavbarProps) => {
    const { setShowLogin } = props;
    const [pending, setPending] = useState(false);
    const { getTotalCartAmount, token, food_list, cartItem, URL } = useContext<any>(StoreContext);
    const navigate = useNavigate();
    const [data, setData] = useState({
        firstName: '',
        lastName: '',
        email: '',
        street: '',
        city: '',
        state: '',
        zipcode: '',
        country: '',
        phone: '',
    })

    const onChangeHandler = (e: ChangeEvent<HTMLInputElement>) => {
        setData({ ...data, [e.target.name]: e.target.value })
    }

    const placeOrder = async (event: FormEvent<HTMLFormElement>) => {
        event.preventDefault()
        setPending(true);
        let orderItems: any = [];
        food_list.map((item: any) => {
            if (cartItem[item._id] > 0) {
                let itemInfo = item;
                itemInfo["quantity"] = cartItem[item._id];
                orderItems.push(itemInfo);
            }
        })
        let orderData = {
            items: orderItems,
            address: data,
            amount: getTotalCartAmount() + 2
        }
        const response = await axios.post(URL + "/api/order/place", orderData, { headers: { token } });
        if (response.data.success) {
            setPending(false);
            const { session_url } = response.data;
            window.location.replace(session_url);
        }
        else {
            toast.error(response.data.message);
        }

    }

    useEffect(() => {
        if (!token) {
            setShowLogin(true)
            navigate('/cart')
        }
        else if (getTotalCartAmount() === 0) {
            navigate('/cart')
        }

    }, [token])
    return (
        <form onSubmit={placeOrder} className='place-order'>
            <div className="place-order-left">
                <div className="title">Delivery Information</div>
                <div className="multi-fields">
                    <input required name='firstName' onChange={onChangeHandler} value={data.firstName} type="text" placeholder='First Name' />
                    <input required name='lastName' onChange={onChangeHandler} value={data.lastName} type="text" placeholder='Last Name' />
                </div>
                <input required name='email' onChange={onChangeHandler} value={data.email} type="email" placeholder='Email Address' />
                <input required name='street' onChange={onChangeHandler} value={data.street} type="text" placeholder='Street' />
                <div className="multi-fields">
                    <input required name='city' onChange={onChangeHandler} value={data.city} type="text" placeholder='City' />
                    <input required name='state' onChange={onChangeHandler} value={data.state} type="text" placeholder='State' />
                </div>
                <div className="multi-fields">
                    <input required name='zipcode' onChange={onChangeHandler} value={data.zipcode} type="text" placeholder='Zip Code' />
                    <input required name='country' onChange={onChangeHandler} value={data.country} type="text" placeholder='Country' />
                </div>
                <input required name='phone' onChange={onChangeHandler} value={data.phone} type="number" placeholder='Phone' />
            </div>
            <div className="place-order-right">
                <div className="cart-total">
                    <h2 >Cart Totals</h2>
                    <div>
                        <div className="cart-total-details">
                            <p>Subtotal</p>
                            <p>${getTotalCartAmount()}</p>
                        </div>
                        <hr />

                        <div className="cart-total-details">
                            <p>Delivery Fee</p>
                            <p>${getTotalCartAmount() === 0 ? 0 : 2}</p>
                        </div>
                        <hr />
                        <div className="cart-total-details">
                            <p>Total</p>
                            <p>${getTotalCartAmount() === 0 ? 0 : getTotalCartAmount() + 2}</p>
                        </div>
                    </div>
                    <button type='submit'>{pending ? <Spinner width={20} height={20} borderWidth={2} /> : 'Proceed to Payment'}</button>
                </div>
            </div>
        </form>
    )
}

export default PlaceOrder