import { Schema, model } from "mongoose"
import Joi from 'joi'

export const userSchema = Schema({
    name: String,
    email: { type: String, require: true },
    password: { type: String, unique: true },
    date: {
        type: Date,
        default: () => new Date()
    },
    role: {
        type: String,
        enum: ['ADMIN', 'USER'],
        default: 'USER'
    }
})


export const userModel = model("user", userSchema)
export function validateUser(user) {
    const JoiSchema = Joi.object({
        name: Joi.string()
            .min(2)
            .max(30)
            .required(),

        email: Joi.string()
            .email()
            .min(7)
            .pattern(/^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/)
            .optional(),

        password: Joi.string()
            .min(7)
            .required(),


        date: Joi.date()
            .default(() => new Date()),

        role: Joi.string()
            .default("USER")
            .valid("USER", "ADMIN")
            .optional(),
    }).options({ abortEarly: false });

    return JoiSchema.validate(user);
}




export function validateUpdateUser(user) {
    const JoiSchema = Joi.object({
        name: Joi.string()
            .min(2)
            .max(30)
            .optional(),

        email: Joi.string()
            .email()
            .min(7)
            .pattern(/^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/)
            .optional(),



    }).options({ abortEarly: false });

    return JoiSchema.validate(user);
}




export function validateLogInUser(user) {
    const JoiSchema = Joi.object({
        email: Joi.string()
            .email()
            .min(7)
            .pattern(/^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/)
            .optional(),

        password: Joi.string()
            .min(7)
            .required()
       


    }).options({ abortEarly: false });

    return JoiSchema.validate(user);
}






