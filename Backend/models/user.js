import { model, Schema } from 'mongoose';

const userSchema = new Schema({
    email: {
        type: String,
        required: true,
        unique: true,
    },
    password: {
        type: String,
        required: true,
    },
    name: {
        type: String,
        required: true,
    },
    cartData: {
        type: Object,
        default: {}
    }
}, {
    timestamps: true,
    minimize: false
})

const User = model('User', userSchema);

export default User;