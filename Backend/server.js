import 'dotenv/config.js'
import express from 'express'
import cors from 'cors'
import { connectDb } from './config/db.js';
import foodRouter from './routes/food.js';

//Express App
const app = express();
const port = 4000;
const url = process.env.MONGO_URI;
//Middlewares
app.use(express.json);
app.use(cors());

//db Connection
await connectDb(url);

//Routes
app.use('/api/food', foodRouter);
app.get('/', async (req, res) => {
    return res.send("Api Working")
})

//Server
app.listen(port, () => {
    console.log(`Server is running on port http://localhost:${port}`)
})