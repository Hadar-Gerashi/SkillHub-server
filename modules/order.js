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
    // countCourses: [{
    //     type: Number,
    //     default: 1
    // }],
    totalSum: Number,
    count:Number
    // confirmation: { type: Boolean, default: false }
})

export const orderModel = model("order", orderSchema)