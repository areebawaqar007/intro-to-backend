import mongoose, { Schema } from "mongoose";
const userSchema = new Schema(
    {
        username: {
            type: String,
            required: true,
            unique: true,
            lowercase: true,
            trim: true,
            minLength: 1,
            maxLength:13
            
        },

        password: {
            type: String,
            required: true,
            minLength: 6,
            maxLength: 16,
        
            
        },

        email: {
            type: String,
            required: true,
            unique: true,
            lowercase: true,
            trim: true,

            
        }

    },
    {
        timestamps: true
    }
)

export const User = mongoose.model("User", userSchema)

// It creates and exports a User model from the schema,
//     which you use to interact with the database(create, read, update, delete users).