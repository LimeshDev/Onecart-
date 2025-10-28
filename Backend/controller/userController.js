import User from "../model/userModel.js";

export const getcurrentUser = async (req, res) => {
  try {
    // ✅ Find user by ID but exclude password
    let user = await User.findById(req.userId).select("-password");

    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    // ✅ Console me user ka data dikhayenge (password nahi hoga)
    console.log("✅ Current User Data:", user);

    return res.status(200).json({
      success: true,
      message: "User fetched successfully",
      user,
    });
  } catch (error) {
    console.error("❌ getCurrentUser Error:", error);
    return res.status(500).json({
      success: false,
      message: `getCurrentUser error: ${error.message}`,
    });
  }
};


export const getAdmin = async (req,res) => {
    try {
        let adminEmail = req.adminEmail;
        if(!adminEmail){
            return res.status(404).json({message:"Admin is not found"}) 
        }
        return res.status(201).json({
            email:adminEmail,
            role:"admin"
        })
    } catch (error) {
        console.log(error)
    return res.status(500).json({message:`getAdmin error ${error}`})
    }
}