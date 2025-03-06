import express from 'express';
import { authMiddleware } from '../middlewares/auth.js';
import { placeOrder } from '../controllers/order.js';

const OrderRouter = express.Router();


OrderRouter.post('/place', authMiddleware, placeOrder);


export default OrderRouter;