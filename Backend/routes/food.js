import express from 'express'
import { addFoodItem, foodList, removeFood } from '../controllers/food.js';
import multer from 'multer';


const foodRouter = express.Router();

//Image Storage Engine

const storage = multer.diskStorage({
    destination: "uploads",
    filename: function (req, file, cb) {
        return cb(null, `${Date.now()}-${file.originalname}`)
    }
})

const upload = multer({ storage })

foodRouter.post('/add', upload.single("image"), addFoodItem);
foodRouter.get('/list', foodList);
foodRouter.post('/remove', removeFood);

export default foodRouter;