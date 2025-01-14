import { Schema, model } from "mongoose"

export const userSchema = Schema({
    name: String,
    email: { type: String, require: true },
    password: String,
    tz: String,
    date: {
        type: Date,
        default: new Date() // ברירת מחדל היא הזמן הנוכחי
    },
    role: {
        type: String,
        enum: ['ADMIN', 'USER']
    }
})

export const userModel = model("user", userSchema)