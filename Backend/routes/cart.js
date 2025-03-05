import express from 'express';
import { addToCart, getCart, removeFromCart } from '../controllers/cart.js';
import { authMiddleware } from '../middlewares/auth.js';

const CartRouter = express.Router();

CartRouter.get('/get', authMiddleware, getCart);
CartRouter.post('/add', authMiddleware, addToCart);
CartRouter.post('/remove', authMiddleware, removeFromCart);


export default CartRouter;
