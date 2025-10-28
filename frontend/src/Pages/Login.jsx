import React, { useState, useContext } from "react";
import Logo from "../assets/logo.png";
import Google from "../assets/google.png";
import { Eye, EyeOff } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { authDataContext } from "../Context/authContext";
import { userDataContext } from "../Context/UserContext";
import axios from "axios";
import { signInWithPopup } from "firebase/auth";
import { auth, Provider } from "../../utils/firebase";

function Login() {
  const navigate = useNavigate();
  const { serverUrl } = useContext(authDataContext);
  const { getCurrentUser } = useContext(userDataContext);

  const [showPassword, setShowPassword] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  // ✅ Normal Login
  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      const result = await axios.post(
        `${serverUrl}/api/auth/login`,
        { email, password },
        { withCredentials: true } // ensures cookie/session works
      );

      console.log("✅ Login Successful:", result.data);

      // ✅ Update user context & wait for it
      await getCurrentUser();

      // ✅ Redirect only after context updated
      navigate("/");
    } catch (error) {
      console.error("❌ Login Failed:", error.response?.data || error.message);
      alert("Login failed! Check your credentials or server.");
    }
  };

  // ✅ Google Login
  const googleLogin = async () => {
    try {
      const response = await signInWithPopup(auth, Provider);
      const user = response.user;
      const name = user.displayName;
      const email = user.email;

      const result = await axios.post(
        `${serverUrl}/api/auth/googlelogin`,
        { name, email },
        { withCredentials: true }
      );

      console.log("✅ Google Login Success:", result.data);

      // ✅ Update user context
      await getCurrentUser();

      // ✅ Redirect to home
      navigate("/");
    } catch (error) {
      console.error("❌ Google Login Error:", error);
      alert("Google login failed!");
    }
  };

  return (
    <div className="w-[100vw] h-[100vh] bg-gradient-to-b from-[#141414] to-[#0c2025] text-white flex flex-col items-center justify-start">
      {/* Navbar Logo */}
      <div
        className="w-full h-[80px] flex items-center justify-start px-[30px] gap-[10px] cursor-pointer"
        onClick={() => navigate("/")}
      >
        <img className="w-[40px]" src={Logo} alt="Logo" />
        <h1 className="text-[22px] font-sans font-semibold">OneCart</h1>
      </div>

      {/* Header */}
      <div className="w-full h-[100px] flex flex-col items-center justify-center gap-[10px]">
        <span className="text-[25px] font-semibold">Login Page</span>
        <span className="text-[16px] text-gray-300">
          Welcome back! Please login to continue.
        </span>
      </div>

      {/* Card */}
      <div className="max-w-[600px] w-[90%] py-[30px] bg-[#00000025] border border-[#96969635] backdrop-blur-2xl rounded-lg shadow-lg flex items-center justify-center">
        <form
          onSubmit={handleLogin}
          className="w-[90%] flex flex-col items-center justify-center gap-[20px]"
        >
          {/* Google Login */}
          <div
            className="w-full h-[50px] bg-[#42656cae] rounded-lg flex items-center justify-center gap-[10px] cursor-pointer hover:bg-[#42656cce] transition-all duration-300"
            onClick={googleLogin}
          >
            <img src={Google} className="w-[25px]" alt="Google Logo" />
            <span className="text-[16px] font-medium">Login with Google</span>
          </div>

          {/* Divider */}
          <div className="w-full flex items-center justify-center gap-[10px] text-gray-400">
            <div className="w-[40%] h-[1px] bg-[#96969635]"></div>
            <span>OR</span>
            <div className="w-[40%] h-[1px] bg-[#96969635]"></div>
          </div>

          {/* Email Input */}
          <input
            type="email"
            placeholder="Email Address"
            required
            className="w-full h-[50px] border-2 border-[#96969635] backdrop-blur-sm rounded-lg shadow-lg bg-transparent placeholder-[#ffffffc7] px-[20px] font-semibold focus:border-[#6060f5] outline-none"
            onChange={(e) => setEmail(e.target.value)}
          />

          {/* Password Input */}
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

          {/* Submit Button */}
          <button
            type="submit"
            className="w-full h-[50px] bg-[#6060f5] rounded-lg flex items-center justify-center mt-[10px] text-[17px] font-semibold hover:bg-[#4949d4] transition-all duration-300"
          >
            Login
          </button>

          {/* Registration Redirect */}
          <p className="text-[15px] text-gray-300">
            Don't have an account?{" "}
            <span
              onClick={() => navigate("/registration")}
              className="text-[#5555f6cf] font-semibold cursor-pointer hover:underline"
            >
              Create New Account
            </span>
          </p>
        </form>
      </div>
    </div>
  );
}

export default Login;
