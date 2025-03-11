import Order from '../models/order.js';
import User from '../models/user.js';
import Stripe from 'stripe';

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY);

const placeOrder = async (req, res) => {
    try {
        const newOrder = await Order.create({
            userId: req.body.userId,
            items: req.body.items,
            amount: req.body.amount,
            address: req.body.address,
        });
        await User.findByIdAndUpdate(req.body.userId, {
            cartData: {}
        });
        const line_items = req.body.items.map(item => ({
            price_data: {
                currency: 'pkr',
                product_data: {
                    name: item.name,
                },
                unit_amount: item.price * 100,
            },
            quantity: item.quantity,
        }));
        line_items.push({
            price_data: {
                currency: 'pkr',
                product_data: {
                    name: 'Delivery Charges',
                },
                unit_amount: 250 * 100, // Convert USD to PKR
            },
            quantity: 1,
        });
        const session = await stripe.checkout.sessions.create({
            payment_method_types: ['card'],
            line_items,
            mode: 'payment',
            success_url: `${process.env.CLIENT_URL}/verify?success=true&orderId=${newOrder._id}`,
            cancel_url: `${process.env.CLIENT_URL}/verify?success=false&orderId=${newOrder._id}`,
        });
        res.status(200).send({ success: true, session_url: session.url });

    } catch (error) {
        console.error('Error placing order:', error);
        res.status(500).send({ success: false, message: 'Error placing order', error });
    }
}

const verifyOrder = async (req, res) => {
    const { orderId, success } = req.body;
    try {
        if (success == 'true') {
            await Order.findByIdAndUpdate(orderId, { payment: true });
            res.status(200).send({ success: true, message: 'Payment Successful!' });
        }
        else {
            await Order.findByIdAndDelete(orderId);
            res.status(200).send({ success: false, message: 'Payment Failed!' });
        }

    } catch (error) {
        console.error('Error verifying order:', error);
        res.status(500).send({ success: false, message: 'Error verifying order' });
    }

}

const userOrders = async (req, res) => {
    try {
        const orders = await Order.find({ userId: req.body.userId });
        res.status(200).send({ success: true, orders });
    } catch (error) {
        console.error('Error fetching orders:', error);
        res.status(500).send({ success: false, message: 'Error fetching orders' });
    }

}


const listOrder = async (req, res) => {
    try {
        const orders = await Order.find({});
        res.status(200).send({ success: true, orders });
    } catch (error) {
        console.error('Error fetching orders:', error);
        res.status(500).send({ success: false, message: 'Error fetching orders' });
    }
}

const updateStatus = async (req, res) => {
    try {
        await Order.findByIdAndUpdate(req.body.orderId, { status: req.body.status })
        res.status(200).send({ success: true, message: 'Order status updated!' });
    } catch (error) {
        console.error('Error updating order status:', error);
        res.status(500).send({ success: false, message: 'Error updating order status' });
    }

}


export { placeOrder, verifyOrder, userOrders, listOrder, updateStatus };
