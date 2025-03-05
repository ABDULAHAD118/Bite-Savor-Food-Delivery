import mongoose from "mongoose";
import User from "../models/user.js";
import foodModel from "../models/foodModel.js";



const addToCart = async (req, res) => {
    const foodItem = req.body.itemId;
    try {
        const userData = await User.findById({ _id: req.body.userId });
        let cartData = await userData.cartData;
        if (!foodItem) {
            return res.status(400).json({ success: false, message: 'Item Id is required' });
        }
        if (!mongoose.Types.ObjectId.isValid(foodItem)) {
            return res.status(400).json({ success: false, message: 'Invalid Item Id' });
        }
        const findFood = await foodModel.findById({ _id: foodItem });
        if (!findFood) {
            return res.status(400).json({ success: false, message: 'Invalid Food Item' });
        }
        if (!cartData[foodItem]) {
            cartData[foodItem] = 1;
        }
        else {
            cartData[foodItem] += 1;
        }
        await User.findByIdAndUpdate(req.body.userId, { cartData });
        res.status(200).json({ success: true, message: 'Item added to cart' });
    } catch (error) {
        console.log(error);
        res.status(500).json({ success: false, message: 'Internal Server Error' });
    }
}

const removeFromCart = async (req, res) => {
    const foodItem = req.body.itemId;
    try {
        const userData = await User.findById({ _id: req.body.userId });
        let cartData = await userData.cartData;
        if (!foodItem) {
            return res.status(400).json({ success: false, message: 'Item Id is required' });
        }
        if (!mongoose.Types.ObjectId.isValid(foodItem)) {
            return res.status(400).json({ success: false, message: 'Invalid Item Id' });
        }
        const findFood = await foodModel.findById({ _id: foodItem });
        if (!findFood) {
            return res.status(400).json({ success: false, message: 'Invalid Food Item' });
        }
        if (cartData[foodItem] > 0) {
            cartData[foodItem] -= 1;
        }
        else {
            return res.status(400).json({ success: false, message: 'Item not in cart' });
        }
        await User.findByIdAndUpdate(req.body.userId, { cartData });
        res.status(200).json({ success: true, message: 'Item removed from cart' });
    } catch (error) {
        console.log(error);
        res.status(500).json({ success: false, message: 'Internal Server Error' });
    }

}

const getCart = async (req, res) => {
    try {
        const userData = await User.findById({ _id: req.body.userId });
        let cartData = await userData.cartData;
        res.status(200).json({ success: true, cartData });
    } catch (error) {
        console.log(error);
        res.status(500).json({ success: false, message: 'Internal Server Error' });
    }

}

export { addToCart, removeFromCart, getCart }