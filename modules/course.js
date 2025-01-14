import { Schema, model } from "mongoose"



export const courseSchema = Schema({
    name: String,
    describe: String,
    openingDate: Date,
    long: Number,
    img: String,
    price: Number,
    level: {
        type: String,
        enum: ['EASY', 'MEDIUM', 'HARD'], 
        default:"EASY"
    },
    locations: [String]
})

export const courseModel = model("courses", courseSchema)