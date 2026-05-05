import { User } from "../models/user.model.js";
  
const registerUser = async (req, res) => {
    try {
        
        // Get data from request body
        const { username, email, password } = req.body;
        if (!username || !email || !password) {
            return res.status(400).json({message: "All fields are imp"})
        }

        const existing = await User.findOne({ email: email.toLowerCase() });
        if (existing) {
            return res.status(400).json({ message: "user already exists" });
        }

        // create user
        const user = await User.create({
            username,
            email: email.toLowerCase(),
            password,
            loggedIn: false
        });

    res.status(201).json({
  message: "user registered",
  user: {
    id: user._id,
    email: user.email,
    username: user.username
  }
});
    } catch (error) {
        res.status(500).json({message: "Internal SErver error",error:error.message})

        
    }
}

export {
    registerUser
}

// ⭐ Flow Summary
// Get data → validate → check user → create user → send response → handle errors