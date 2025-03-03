import foodModel from "../models/foodModel.js";
import fs from "fs";



//add food item
const addFoodItem = async (req, res) => {
    try {

        let image_filename = `${req.file.filename}`;
        const food = await foodModel.create({
            name: req.body.name,
            description: req.body.description,
            price: req.body.price,
            image: image_filename,
            category: req.body.category
        })
        if (food) {
            res.status(201).json({ success: true, message: "Food item added successfully" })
        }
        else {
            res.status(500).json({ success: false, message: "Internal server error" })
        }
    } catch (err) {
        console.log(err)
        res.status(500).json({ success: false, message: "Internal server error" })
    }

}



export { addFoodItem }