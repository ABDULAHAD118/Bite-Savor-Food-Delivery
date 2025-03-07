import 'dotenv/config.js'
import express from 'express'
import cors from 'cors'
import { connectDb } from './config/db.js';
import foodRouter from './routes/food.js';
import UserRouter from './routes/user.js';
import CartRouter from './routes/cart.js';
import OrderRouter from './routes/order.js';


//Express App
const app = express();
const port = process.env.PORT || 4000;
const url = process.env.MONGO_URI;



//Middlewares
app.use(express.json());
app.use(cors());


try {
    await connectDb(url);
    console.log('Database connected successfully');
} catch (error) {
    console.error('Database connection error:', error);
}


//Routes
app.use('/api/food', foodRouter);
app.use('/api/user', UserRouter);
app.use('/api/cart', CartRouter);
app.use('/api/order', OrderRouter);
app.get('/', async (req, res) => {
    res.send("Api Working")
})

//Server
app.listen(port, () => {
    console.log(`Server is running on  http://localhost:${port}`)
})