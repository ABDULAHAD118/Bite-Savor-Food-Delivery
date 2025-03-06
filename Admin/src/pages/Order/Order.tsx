import { ChangeEvent, useEffect, useState } from 'react';
import './Order.css'
import axios from 'axios';
import { toast } from 'react-toastify';
import { assets } from '../../assets/assets';

const Order = (props: any) => {
    const { url } = props;
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
    }

    const [orders, setOrders] = useState<Order[]>([]);

    const fetchAllOrders = async () => {
        const response = await axios.get(`${url}/api/order/list`);
        if (response.data.success) {
            setOrders(response.data.orders);
        }
        else {
            toast.error(response.data.message);
        }
    }
    const statusHandler = async (event: ChangeEvent<HTMLSelectElement>, orderId: string) => {
        const response = await axios.post(`${url}/api/order/status`, { orderId: orderId, status: event.target.value })
        if (response.data.success) {
            toast.success(response.data.message);
            await fetchAllOrders();
        }
        else {
            toast.error(response.data.message);
        }

    }

    useEffect(() => {
        fetchAllOrders();
    }, []);
    return (
        <div className='order add'>
            <h3>Order Page</h3>
            <div className="order-list">
                {
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
                                <select onChange={(event) => statusHandler(event, order._id)} value={order.status}>
                                    <option value="Food Processing">Food Processing</option>
                                    <option value="Out For Delivery">Out For Delivery</option>
                                    <option value="Delivered">Delivered</option>
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