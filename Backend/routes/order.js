import express from 'express';
import { authMiddleware } from '../middlewares/auth.js';
import { listOrder, placeOrder, updateStatus, userOrders, verifyOrder } from '../controllers/order.js';

const OrderRouter = express.Router();


OrderRouter.post('/place', authMiddleware, placeOrder);
OrderRouter.post('/verify', verifyOrder);
OrderRouter.get('/userorders', authMiddleware, userOrders);
OrderRouter.get('/list', listOrder);
OrderRouter.post('/status', updateStatus);


export default OrderRouter;