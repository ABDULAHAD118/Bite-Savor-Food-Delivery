import { ChangeEvent, useEffect, useState } from 'react';
import './Order.css'
import axios from 'axios';
import { toast } from 'react-toastify';
import { assets } from '../../assets/assets';
import Spinner from '../../components/Spinner/Spinner';

interface Order {
    _id: string;
    items: {
        name: string;
        quantity: number;
    }[];
    address: {
        firstName: string;
        lastName: string;
        street: string;
        city: string;
        state: string;
        country: string;
        zipcode: string;
        phone: string;
    };
    amount: number;
    status: string;
    createdAt: string;
}

const Order = (props: any) => {
    const { url } = props;
    const [pending, setPending] = useState(false);
    const [orders, setOrders] = useState<Order[]>([]);

    const fetchAllOrders = async () => {
        try {
            setPending(true);
            const response = await axios.get(`${url}/api/order/list`);
            if (response.data.success) {
                setPending(false);
                response.data.orders.sort((a: Order, b: Order) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime())
                setOrders(response.data.orders);
            }
        } catch (err: any) {
            toast.error(err.response.data.message);
        }
    }
    const statusHandler = async (event: ChangeEvent<HTMLSelectElement>, orderId: string) => {
        try {
            const response = await axios.post(`${url}/api/order/status`, { orderId: orderId, status: event.target.value })
            if (response.data.success) {
                await fetchAllOrders();
                toast.success(response.data.message);
            }
        } catch (error: any) {
            toast.error(error.response.data.message);
        }

    }

    useEffect(() => {
        fetchAllOrders();
    }, []);

    if (pending) {
        return <div className='spin'>
            <Spinner width={50} height={50} borderWidth={5} />
        </div>
    }
    return (
        <div className='order add'>
            <h3>Order Page</h3>
            <div className="order-list">
                {orders.length === 0 ? <div className='empty'>No Orders</div> :
                    orders.map((order, index) => {
                        return (
                            <div key={index} className='order-item'>
                                <img src={assets.parcel_icon} alt={assets.parcel_icon} />
                                <div>
                                    <p className="order-item-food">
                                        {
                                            order.items.map((item: any, index: number) => {
                                                if (index === order.items.length - 1) {
                                                    return item.name + 'x' + item.quantity;
                                                }
                                                else {
                                                    return item.name + 'x' + item.quantity + ',';
                                                }
                                            })
                                        }
                                    </p>
                                    <p className="order-item-name">{order.address.firstName + " " + order.address.lastName}</p>
                                    <div className="order-item-address">
                                        <p>{order.address.street + "," + order.address.lastName}</p>
                                        <p>{order.address.city + ", " + order.address.state + ", " + order.address.country + ", " + order.address.zipcode}</p>
                                    </div>
                                    <p className="order-item-phone">{order.address.phone}</p>
                                </div>
                                <p>Items:{order.items.length}</p>
                                <p>${order.amount}</p>
                                <select className='cursor' onChange={(event) => statusHandler(event, order._id)} value={order.status}>
                                    <option className='cursor' value="Food Processing">Food Processing</option>
                                    <option className='cursor' value="Out For Delivery">Out For Delivery</option>
                                    <option className='cursor' value="Delivered">Delivered</option>
                                </select>
                            </div>
                        )
                    })
                }
            </div>
        </div >
    )
}

export default Order