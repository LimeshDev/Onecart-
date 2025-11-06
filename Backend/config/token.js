import jwt from "jsonwebtoken";

// 🔹 1️⃣ Token for Normal Users
export const gentoken = async (userId) => {
  try {
    if (!userId) {
      throw new Error("userId is missing");
    }

    // ✅ Token generate with userId
    const token = jwt.sign({ userId }, process.env.JWT_SECRET, { expiresIn: "7d" });

    console.log("✅ User token generated successfully:", token);
    return token;

  } catch (error) {
    console.error("❌ gentoken error:", error.message);
    return null;
  }
};


// 🔹 2️⃣ Token for Admin Login
export const gentoken1 = async (email) => {
  try {
    if (!email) {
      throw new Error("email is missing");
    }

    // ✅ Token generate with email
    const token = jwt.sign({ email }, process.env.JWT_SECRET, { expiresIn: "1d" });

    console.log("✅ Admin token generated successfully:", token);
    return token;

  } catch (error) {
    console.error("❌ gentoken1 error:", error.message);
    return null;
  }
};
