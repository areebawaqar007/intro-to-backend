import mongoose, { Schema } from "mongoose";
import bcrypt from "bcrypt";
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

// 1. PRE SAVE HOOK (before saving user)
// This only runs when you SAVE a user during register
// or when updating password
// 👉 It does NOT run during login
// userSchema.pre("save", async function (next) {
//     if (!this.isModified("password")) return next();

//     this.password = await bcrypt.hash(this.password, 10);
//     next();
// });

userSchema.pre("save", async function () {
    if (!this.isModified("password")) return;
    this.password = await bcrypt.hash(this.password, 10);
});

// During LOGIN (comparePassword)
userSchema.methods.comparePassword = async function (password) {
    return await bcrypt.compare(password,this.password)
}
// password = the plain text password that user just entered (e.g. login form input "123456")
// this.password = the hashed password stored in the database for that specific user
export const User = mongoose.model("User", userSchema)

// It creates and exports a User model from the schema,
//     which you use to interact with the database(create, read, update, delete users).



// 🔹 What is next?

// 👉 next is a function provided by Mongoose middleware (hooks).

// It tells Mongoose:

// “I’m done with this step, now move to the next step.”

// 🔹 Why do we need it?

// In this code:

// userSchema.pre("save", async function (next) {

// You are inside a pre-save hook (runs before saving data).

// So Mongoose is waiting for you to say:

// continue saving ✔️
// OR stop ❌
// 🔹 What does next() do?
// next();

// 👉 It tells Mongoose:

// “Continue the save operation”

// 🔹 If you don’t call next()
// The code will get stuck
// User will NOT be saved
// Request will hang ❌
// 🔹 Simple flow
// pre-save hook starts
//    ↓
// your code runs
//    ↓
// next()
//    ↓
// MongoDB saves data

// isModified() is a Mongoose document method that checks:

// “Has this field been changed?”

// userSchema.methods

// 👉 methods is a Mongoose feature that lets you add your own functions to a schema.