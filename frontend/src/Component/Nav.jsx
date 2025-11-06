import React, { useContext, useState } from 'react'
import logo from '../assets/logo.png'
import { IoSearchCircleOutline, IoSearchCircleSharp } from "react-icons/io5";
import { FaCircleUser } from "react-icons/fa6";
import { MdOutlineShoppingCart, MdContacts } from "react-icons/md";
import { IoMdHome } from "react-icons/io";
import { HiOutlineCollection } from "react-icons/hi";
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { userDataContext } from '../context/UserContext';
import { authDataContext } from '../context/authContext';
import { shopDataContext } from '../context/ShopContext';

function Nav() {
  let { getCurrentUser, userData } = useContext(userDataContext);
  let { serverUrl } = useContext(authDataContext);
  let { showSearch, setShowSearch, search, setSearch, getCartCount } = useContext(shopDataContext);
  let [showProfile, setShowProfile] = useState(false);
  let navigate = useNavigate();

  const handleLogout = async () => {
    try {
      const result = await axios.get(serverUrl + "/api/auth/logout", { withCredentials: true });
      console.log(result.data);
      navigate("/login");
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="w-full h-[70px] bg-[#ecfafaec] z-10 fixed top-0 flex items-center justify-between px-[20px] md:px-[40px] shadow-md shadow-black">

      {/* -------- Logo Section -------- */}
      <div className="flex items-center gap-[10px] w-[40%] md:w-[25%] cursor-pointer" onClick={() => navigate("/")}>
        <img src={logo} alt="logo" className="w-[40px] h-[40px] object-contain rounded-full" />
        <h1 className="text-[22px] md:text-[26px] font-bold text-black">OneCart</h1>
      </div>

      {/* -------- Navigation Links (Hidden on small screens) -------- */}
      <div className="hidden md:flex w-[50%] justify-center">
        <ul className="flex items-center justify-center gap-[15px]">
          <li className="text-[15px] text-white bg-[#000000c9] py-[10px] px-[18px] rounded-2xl hover:bg-slate-500 cursor-pointer" onClick={() => navigate("/")}>HOME</li>
          <li className="text-[15px] text-white bg-[#000000c9] py-[10px] px-[18px] rounded-2xl hover:bg-slate-500 cursor-pointer" onClick={() => navigate("/collection")}>COLLECTIONS</li>
          <li className="text-[15px] text-white bg-[#000000c9] py-[10px] px-[18px] rounded-2xl hover:bg-slate-500 cursor-pointer" onClick={() => navigate("/about")}>ABOUT</li>
          <li className="text-[15px] text-white bg-[#000000c9] py-[10px] px-[18px] rounded-2xl hover:bg-slate-500 cursor-pointer" onClick={() => navigate("/contact")}>CONTACT</li>
        </ul>
      </div>

      {/* -------- Icons Section -------- */}
      <div className="w-[40%] md:w-[25%] flex items-center justify-end gap-[15px] relative">
        {/* Search Icon */}
        {!showSearch ? (
          <IoSearchCircleOutline className="w-[35px] h-[35px] text-black cursor-pointer hover:scale-105 transition" onClick={() => { setShowSearch(true); navigate("/collection"); }} />
        ) : (
          <IoSearchCircleSharp className="w-[35px] h-[35px] text-black cursor-pointer hover:scale-105 transition" onClick={() => setShowSearch(false)} />
        )}

        {/* Profile Icon */}
        {!userData ? (
          <FaCircleUser className="w-[28px] h-[28px] text-black cursor-pointer hover:scale-105 transition" onClick={() => setShowProfile(!showProfile)} />
        ) : (
          <div className="w-[30px] h-[30px] bg-black text-white flex items-center justify-center rounded-full cursor-pointer hover:scale-105 transition" onClick={() => setShowProfile(!showProfile)}>
            {userData.name?.charAt(0)?.toUpperCase() || 'U'}
          </div>
        )}

        {/* Cart Icon */}
        <div className="relative hidden md:block">
          <MdOutlineShoppingCart className="w-[30px] h-[30px] text-black cursor-pointer hover:scale-105 transition" onClick={() => navigate("/cart")} />
          <span className="absolute -top-[6px] -right-[8px] bg-black text-white rounded-full w-[18px] h-[18px] flex items-center justify-center text-[10px] font-semibold">
            {getCartCount()}
          </span>
        </div>
      </div>

      {/* -------- Search Bar -------- */}
      {showSearch && (
        <div className="w-full h-[80px] bg-[#d8f6f9dd] absolute top-full left-0 flex items-center justify-center">
          <input
            type="text"
            placeholder="Search Here"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-[80%] md:w-[60%] lg:w-[50%] h-[50px] bg-[#233533] rounded-[30px] px-[40px] text-white placeholder:text-white text-[16px] outline-none"
          />
        </div>
      )}

      {/* -------- Profile Menu -------- */}
      {showProfile && (
        <div className="absolute top-[100%] right-[20px] w-[220px] bg-[#000000d7] border border-gray-500 rounded-[10px] shadow-lg z-20">
          <ul className="flex flex-col text-white py-[10px] text-[16px]">
            {!userData && (
              <li className="px-[15px] py-[8px] hover:bg-[#2f2f2f] cursor-pointer" onClick={() => { navigate("/login"); setShowProfile(false); }}>Login</li>
            )}
            {userData && (
              <li className="px-[15px] py-[8px] hover:bg-[#2f2f2f] cursor-pointer" onClick={() => { handleLogout(); setShowProfile(false); }}>Logout</li>
            )}
            <li className="px-[15px] py-[8px] hover:bg-[#2f2f2f] cursor-pointer" onClick={() => { navigate("/order"); setShowProfile(false); }}>Orders</li>
            <li className="px-[15px] py-[8px] hover:bg-[#2f2f2f] cursor-pointer" onClick={() => { navigate("/about"); setShowProfile(false); }}>About</li>
          </ul>
        </div>
      )}

      {/* -------- Bottom Mobile Navbar -------- */}
      <div className="fixed bottom-0 left-0 w-full h-[80px] bg-[#191818] flex items-center justify-between px-[25px] md:hidden z-20">
        <button className="text-white flex flex-col items-center gap-[2px]" onClick={() => navigate("/")}><IoMdHome className="w-[26px] h-[26px]" />Home</button>
        <button className="text-white flex flex-col items-center gap-[2px]" onClick={() => navigate("/collection")}><HiOutlineCollection className="w-[26px] h-[26px]" />Collections</button>
        <button className="text-white flex flex-col items-center gap-[2px]" onClick={() => navigate("/contact")}><MdContacts className="w-[26px] h-[26px]" />Contact</button>
        <div className="relative">
          <button className="text-white flex flex-col items-center gap-[2px]" onClick={() => navigate("/cart")}><MdOutlineShoppingCart className="w-[26px] h-[26px]" />Cart</button>
          <span className="absolute -top-[6px] -right-[8px] bg-white text-black font-bold rounded-full w-[18px] h-[18px] flex items-center justify-center text-[10px]">{getCartCount()}</span>
        </div>
      </div>

    </div>
  );
}

export default Nav;
