import express from 'express';
import { authMiddleware } from '../middlewares/auth.js';
import { placeOrder, userOrders, verifyOrder } from '../controllers/order.js';

const OrderRouter = express.Router();


OrderRouter.post('/place', authMiddleware, placeOrder);
OrderRouter.post('/verify', verifyOrder);
OrderRouter.post('/userorders', authMiddleware, userOrders);


export default OrderRouter;