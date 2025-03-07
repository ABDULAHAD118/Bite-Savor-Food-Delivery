import express from 'express'
import { addFoodItem, foodList, removeFood } from '../controllers/food.js';
import { uploadImageMiddleware } from '../middlewares/uploadImage.js';


const foodRouter = express.Router();


foodRouter.post('/add', uploadImageMiddleware, addFoodItem);
foodRouter.get('/list', foodList);
foodRouter.post('/remove', removeFood);

export default foodRouter;