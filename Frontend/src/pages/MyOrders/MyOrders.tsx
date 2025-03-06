import { useContext, useEffect, useState } from 'react'
import './MyOrders.css'
import { StoreContext } from '../../contexts/StoreContext';
import axios from 'axios';
import { assets } from '../../assets/assets';
import Spinner from '../../components/Spinner/Spinner';

const MyOrders = () => {
    interface Order {
        items: {
            name: string,
            quantity: number
        }[];
        status: string;
        amount: number;
    }

    const [data, setData] = useState<Order[]>([]);
    const { URL, token } = useContext<any>(StoreContext);
    const [pending, setPending] = useState(false);
    const fetchMyOrders = async () => {
        setPending(true);
        const response = await axios.get(`${URL}/api/order/userorders`, { headers: { token } });
        if (response.data.success) {
            setPending(false);
            setData(response.data.orders);
        }
    }
    useEffect(() => {
        if (token) {
            fetchMyOrders();
        }
    }, [token])
    return (
        <div className='my-orders'>
            <h2>My Orders</h2>
            {pending ? <Spinner width={50} height={50} borderWidth={5} /> :
                <div className="container">
                    {data.map((order, index) => {
                        return (
                            <div key={index} className="my-orders-order">
                                <img src={assets.parcel_icon} alt={assets.parcel_icon} />
                                <p>
                                    {order.items.map((item, index) => {
                                        if (index === order.items.length - 1) {
                                            return item.name + ' x ' + item.quantity
                                        }
                                        else {
                                            return item.name + ' x ' + item.quantity + ",";
                                        }
                                    })
                                    }
                                </p>
                                <p>${order.amount}.00</p>
                                <p>Items:{order.items.length}</p>
                                <p>
                                    <span>&#x25cf;</span>
                                    <b>{order.status}</b>
                                </p>
                                <button onClick={fetchMyOrders}>Track Order</button>
                            </div>
                        )
                    })}
                </div>
            }
        </div>
    )
}

export default MyOrders