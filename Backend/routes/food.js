import express from 'express'
import { addFoodItem } from '../controllers/food.js';
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

export default foodRouter;