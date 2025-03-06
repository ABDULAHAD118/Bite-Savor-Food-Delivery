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
                currency: 'usd',
                product_data: {
                    name: item.name,
                },
                unit_amount: item.price * 100,
            },
            quantity: item.quantity,
        }));
        line_items.push({
            price_data: {
                currency: 'usd',
                product_data: {
                    name: 'Delivery Charges',
                },
                unit_amount: 2 * 100,
            },
            quantity: 1,
        });
        const session = await stripe.checkout.sessions.create({
            // payment_method_types: ['card'],
            line_items,
            mode: 'payment',
            success_url: `${process.env.CLIENT_URL}/verify?success=true&orderId=${newOrder._id}`,
            cancel_url: `${process.env.CLIENT_URL}/verify?success=false&orderId=${newOrder._id}`,
        });

        res.status(200).send({ success: true, session_url: session.url });

    } catch (error) {
        console.error('Error placing order:', error);
        res.status(500).send({ success: false, message: 'Error placing order' });
    }
}


export { placeOrder };
