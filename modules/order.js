import { Schema, model, Types } from "mongoose"

import { courseSchema } from "./course.js"

export const orderSchema = Schema({
    date: { type: Date, default: new Date() },
    userId: {
        type: Types.ObjectId,
        ref: "courses"
    },
    courses: [
       courseSchema
      ],

    totalSum: Number,
    count:Number
   
})

export const orderModel = model("order", orderSchema)