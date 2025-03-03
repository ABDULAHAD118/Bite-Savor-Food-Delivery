import mongoose from "mongoose";


const connectDb = async (url) => {
    await mongoose.connect(url).then(() => {
        console.log('Database connected')
    })
}

export { connectDb }