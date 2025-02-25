import { Schema, model } from "mongoose"

// const responseSchema=Schema({
//     name:String,
//     img:String,
//     score:Number,
//     content:String
// })



export const courseSchema = Schema({
    name: String,
    describe: String,
    openingDate: Date,
    long: Number,
    img: String,
    price: Number,
    motivation: String,
    categories: {
        type: [String],
        enum: ['EDUCATION',
        'PROGRAMMING',
        'DESIGN',
        'BUSINESS',
        'MUSIC',
        'FITNESS',
        'DEVELOPMENT',
        'MEDIA',
        'SPORT',
        'GAMING',
        'PHOTOGRAPHY',   
        'TRAVEL',
        'CONDTORIA',
        'DIET',
    'RIDING'],
    },
    locations: [String],
    // responses:[responseSchema]
})

export const courseModel = model("courses", courseSchema)