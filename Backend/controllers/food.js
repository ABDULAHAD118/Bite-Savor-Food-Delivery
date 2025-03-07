import foodModel from "../models/foodModel.js";
import fs from "fs";



//add food item
const addFoodItem = async (req, res) => {
    try {
        const food = await foodModel.create({
            name: req.body.name,
            description: req.body.description,
            price: req.body.price,
            image: req.imageURL,
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

const foodList = async (req, res) => {
    try {
        const food = await foodModel.find()
        res.status(200).json({ success: true, food })
    } catch (err) {
        console.log(err)
        res.status(500).json({ success: false, message: "Internal server error" })
    }
}

const removeFood = async (req, res) => {
    try {
        const food = await foodModel.findById(req.body.id)
        if (food) {
            fs.unlink(`uploads/${food.image}`, () => { })
            await foodModel.findByIdAndDelete(req.body.id)
            res.status(200).json({ success: true, message: "Food item removed successfully" })
        }
        else {
            res.status(404).json({ success: false, message: "Food item not found" })
        }
    } catch (err) {
        console.log(err)
        res.status(500).json({ success: false, message: "Internal server error" })
    }
}



export { addFoodItem, foodList, removeFood }