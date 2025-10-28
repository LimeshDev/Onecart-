import React, { useState, useContext } from "react";
import Logo from "../assets/logo.png";
import Google from "../assets/google.png";
import { Eye, EyeOff } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { authDataContext } from "../Context/authContext";
import axios from "axios";
import { signInWithPopup } from "firebase/auth";
import { auth, Provider } from "../../utils/firebase";

function Registration() {
  const navigate = useNavigate();
  const [showPassword, setShowPassword] = useState(false);
  const { serverUrl } = useContext(authDataContext);

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleSignup = async (e) => {
    e.preventDefault();
    try {
      const result = await axios.post(
        `${serverUrl}/api/auth/registration`,
        { name, email, password },
        { withCredentials: true }
      );
      console.log("✅ Registration Success:", result.data);
     
    } catch (error) {
      console.log("❌ Registration Error:", error);
    }
  };

  const googleSignup = async ()=> {
    try {
      const response = await signInWithPopup(auth,Provider)
       let user = response.user
       let name = user.displayName;
       let email = user.email;
       const result = await axios.post(serverUrl + "/api/auth/googlelogin", { name, email }, { withCredentials: true });

       console.log(result.data);
       
      
    } catch (error) {
       console.log(error)
      
    }

  }

  return (
    <div className="w-[100vw] h-[100vh] bg-gradient-to-b from-[#141414] to-[#0c2025] text-white flex flex-col items-center justify-start">
      {/* Navbar */}
      <div
        className="w-full h-[80px] flex items-center justify-start px-[30px] gap-[10px] cursor-pointer"
        onClick={() => navigate("/")}
      >
        <img className="w-[40px]" src={Logo} alt="Logo" />
        <h1 className="text-[22px] font-sans font-semibold">OneCart</h1>
      </div>

      {/* Header */}
      <div className="w-full h-[100px] flex flex-col items-center justify-center gap-[10px]">
        <span className="text-[25px] font-semibold">Registration Page</span>
        <span className="text-[16px] text-gray-300">
          Welcome to OneCart, place your order
        </span>
      </div>

      {/* Card */}
      <div className="max-w-[600px] w-[90%] py-[30px] bg-[#00000025] border border-[#96969635] backdrop-blur-2xl rounded-lg shadow-lg flex items-center justify-center">
        <form
          onSubmit={handleSignup}
          className="w-[90%] flex flex-col items-center justify-center gap-[20px]"
        >
          {/* Google Register */}
          <div className="w-full h-[50px] bg-[#42656cae] rounded-lg flex items-center justify-center gap-[10px] cursor-pointer hover:bg-[#42656cce] transition-all duration-300 " onClick={googleSignup}>
            <img src={Google} className="w-[25px]" alt="Google Logo" />
            <span className="text-[16px] font-medium">
              Register with Google
            </span>
          </div>

          {/* Divider */}
          <div className="w-full flex items-center justify-center gap-[10px] text-gray-400">
            <div className="w-[40%] h-[1px] bg-[#96969635]"></div>
            <span>OR</span>
            <div className="w-[40%] h-[1px] bg-[#96969635]"></div>
          </div>

          {/* Inputs */}
          <input
            type="text"
            placeholder="Full Name"
            required
            className="w-full h-[50px] border-2 border-[#96969635] backdrop-blur-sm rounded-lg shadow-lg bg-transparent placeholder-[#ffffffc7] px-[20px] font-semibold focus:border-[#6060f5] outline-none"
            onChange={(e) => setName(e.target.value)}
          />
          <input
            type="email"
            placeholder="Email Address"
            required
            className="w-full h-[50px] border-2 border-[#96969635] backdrop-blur-sm rounded-lg shadow-lg bg-transparent placeholder-[#ffffffc7] px-[20px] font-semibold focus:border-[#6060f5] outline-none"
            onChange={(e) => setEmail(e.target.value)}
          />

          {/* Password */}
          <div className="relative w-full">
            <input
              type={showPassword ? "text" : "password"}
              placeholder="Password"
              required
              className="w-full h-[50px] border-2 border-[#96969635] backdrop-blur-sm rounded-lg shadow-lg bg-transparent placeholder-[#ffffffc7] px-[20px] pr-[45px] font-semibold focus:border-[#6060f5] outline-none"
              onChange={(e) => setPassword(e.target.value)}
            />
            <button
              type="button"
              onClick={() => setShowPassword(!showPassword)}
              className="absolute right-[15px] top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-white transition-all duration-200"
            >
              {showPassword ? <EyeOff size={22} /> : <Eye size={22} />}
            </button>
          </div>

          {/* Submit */}
          <button
            type="submit"
            className="w-full h-[50px] bg-[#6060f5] rounded-lg flex items-center justify-center mt-[10px] text-[17px] font-semibold hover:bg-[#4949d4] transition-all duration-300"
          >
            Create Account
          </button>

          {/* Login Redirect */}
          <p className="text-[15px] text-gray-300">
            Already have an account?{" "}
            <span
              onClick={() => navigate("/login")}
              className="text-[#5555f6cf] font-semibold cursor-pointer hover:underline"
            >
              Login
            </span>
          </p>
        </form>
      </div>
    </div>
  );
}

export default Registration;
