import { Schema, model } from "mongoose"

export const userSchema = Schema({
    name: String,
    email: { type: String, require: true },
    password: { type: String, unique: true},
    tz: String,
    date: {
        type: Date,
        default: new Date() // ברירת מחדל היא הזמן הנוכחי
    },
    role: {
        type: String,
        enum: ['ADMIN', 'USER'],
        default: 'USER'
    }
})

export const userModel = model("user", userSchema)