
import User from "../model/userModel.js";

import validator from "validator";
import bcrypt from "bcryptjs";
import { gentoken, gentoken1 } from "../config/token.js";

export const registration = async (req, res) => {
  try {
    const { name, email, password } = req.body;

    // 1️⃣ Check if all fields are present
    if (!name || !email || !password) {
      return res.status(400).json({ message: "All fields are required" });
    }

    // 2️⃣ Validate email
    if (!validator.isEmail(email)) {
      return res.status(400).json({ message: "Enter a valid email" });
    }

    // 3️⃣ Validate password length
    if (password.length < 8) {
      return res.status(400).json({ message: "Password must be at least 8 characters" });
    }

    // 4️⃣ Check if user already exists
    const existUser = await User.findOne({ email });
    if (existUser) {
      return res.status(400).json({ message: "User already exists" });
    }

    // 5️⃣ Hash the password
    const hashPassword = await bcrypt.hash(password, 10);

    // 6️⃣ Create user in DB
    const user = await User.create({ name, email, password: hashPassword });

    // 7️⃣ Generate JWT token
    const token = await gentoken(user._id);

    // 8️⃣ Set cookie in response
    res.cookie("token", token, {
      httpOnly: true,
      secure: true, // set true in production (HTTPS)
      sameSite: "none",
      maxAge: 7 * 24 * 60 * 60 * 1000, // 7 days
    });

    // 9️⃣ Return user data without password
    const { password: pwd, ...userData } = user._doc;
    return res.status(201).json(userData);

  } catch (error) {
    console.log("Registration error:", error);
    return res.status(500).json({ message: `Registration error: ${error.message}` });
  }
};


export const Login = async (req, res) => {
  try {
    let { email, password } = req.body;
    let user = await User.findOne({ email })
    if (!user) {
      return res.status(404).json({ message: "User is Not Found" })
    }
    let isMatch = await bcrypt.compare(password, user.password)
    if (!isMatch) {
      return res.status(400).json({ message: "Incorrect password" })
    }

    const token = await gentoken(user._id);
    res.cookie("token", token, {
      httpOnly: true,
      secure: true,
      sameSite: "none",
      maxAge: 7 * 24 * 60 * 60 * 1000
})
    return res.status(201).json(user)

  } catch (error) {
    console.log("Login error:", error);
    return res.status(500).json({ message: `Login error: ${error.message}` });
  }

};

export const logOut = async (req,res) => {
  try {
    res.clearCookie("token")
    return res.status(201).json({ message: "logOut Succesfull" })

  } catch (error) {
    console.log("logOut error:", error);
    return res.status(500).json({ message: `logOut error: ${error.message}` });

  }
}

export const googleLogin = async (req, res) => {
  try {
    let  { name, email } = req.body;
    let user = await User.findOne({email})
    if (!user) {
      user = await User.create({
        name,email
      })
      return res.status(201).json({ message: "logOut Succesfull" })
    }
    
    const token = await gentoken(user._id);
    res.cookie("token", token, {
      httpOnly: true,
      secure: true,
      sameSite: "none",
      maxAge: 7 * 24 * 60 * 60 * 1000
    }) 
    return res.status(200).json(user)
  }

   catch (err) {
    console.log("googleLogin:", error);
    return res.status(500).json({ message: `googleLogin error: ${error.message}` });
  }
}; 




export const adminLogin = async (req, res) => {
  try {
    const { email, password } = req.body;

    // 1️⃣ Check email first
    if (email !== process.env.ADMIN_EMAIL) {
      return res.status(405).json({ message: "Invalid Credentials" });
    }

    if (email !== process.env.ADMIN_EMAIL || password !== process.env.ADMIN_PASSWORD) {
  return res.status(405).json({ message: "Invalid Credentials" });
}

  
    // 3️⃣ Generate token
    const token = await gentoken1(email);

    // 4️⃣ Set cookie
    res.cookie("token", token, {
      httpOnly: true,
      secure: true, // production me true
      sameSite: "none",
      maxAge: 1 * 24 * 60 * 60 * 1000, // 1 day
    });

    // 5️⃣ Respond with token
    return res.status(200).json({ token });

  } catch (error) {
    console.log("AdminLogin error:", error);
    return res.status(500).json({ message: `AdminLogin error: ${error.message}` });
  }
};

