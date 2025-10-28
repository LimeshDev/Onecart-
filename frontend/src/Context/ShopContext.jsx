import React, { createContext, useContext, useEffect, useState } from 'react';
import { authDataContext } from './AuthContext';
import axios from 'axios';
import { userDataContext } from './UserContext';
import { toast } from 'react-toastify';

export const shopDataContext = createContext();

function ShopContext({ children }) {
  const [products, setProducts] = useState([]);
  const [search, setSearch] = useState('');
  const { userData } = useContext(userDataContext);
  const [showSearch, setShowSearch] = useState(false);
  const { serverUrl } = useContext(authDataContext);
  const [cartItem, setCartItem] = useState({});
  const [loading, setLoading] = useState(false);

  const currency = '₹';
  const delivery_fee = 40;

  // Fetch products
  const getProducts = async () => {
    try {
      const result = await axios.get(serverUrl + "/api/product/list");
      setProducts(result.data);
    } catch (error) {
      console.log(error);
    }
  };

  // Fetch user's cart from API
  const getUserCart = async () => {
    try {
      const result = await axios.post(serverUrl + '/api/cart/get', {}, { withCredentials: true });
      const data = typeof result.data === "string" ? JSON.parse(result.data) : result.data;
      setCartItem(data);
    } catch (error) {
      console.log(error);
    }
  };

  // Add product to cart
  const addtoCart = async (itemId, size) => {
    if (!size) {
      toast.error("Select a size");
      return;
    }

    // Ensure cartItem is object
    let cartData = typeof cartItem === "string" ? {} : structuredClone(cartItem);

    if (!cartData[itemId]) cartData[itemId] = {};
    cartData[itemId][size] = (cartData[itemId][size] || 0) + 1;

    setCartItem(cartData);

    if (userData) {
      setLoading(true);
      try {
        await axios.post(serverUrl + "/api/cart/add", { itemId, size }, { withCredentials: true });
        toast.success("Product Added");
      } catch (error) {
        console.log(error);
        toast.error("Add Cart Error");
      }
      setLoading(false);
    }
  };

  // Update quantity of a cart item
  const updateQuantity = async (itemId, size, quantity) => {
    if (!cartItem[itemId]) return;

    let cartData = typeof cartItem === "string" ? {} : structuredClone(cartItem);
    cartData[itemId][size] = quantity;

    // Remove size if quantity is 0
    if (quantity === 0) {
      delete cartData[itemId][size];
      if (Object.keys(cartData[itemId]).length === 0) {
        delete cartData[itemId];
      }
    }

    setCartItem(cartData);

    if (userData) {
      try {
        await axios.post(serverUrl + "/api/cart/update", { itemId, size, quantity }, { withCredentials: true });
      } catch (error) {
        console.log(error);
      }
    }
  };

  // Get total items in cart
  const getCartCount = () => {
    if (!cartItem || typeof cartItem !== "object") return 0;
    let totalCount = 0;
    for (const items in cartItem) {
      for (const item in cartItem[items]) {
        totalCount += cartItem[items][item];
      }
    }
    return totalCount;
  };

  // Get total amount
  const getCartAmount = () => {
    if (!cartItem || typeof cartItem !== "object") return 0;
    let totalAmount = 0;
    for (const items in cartItem) {
      const itemInfo = products.find(p => p._id === items);
      if (!itemInfo) continue;
      for (const item in cartItem[items]) {
        totalAmount += itemInfo.price * cartItem[items][item];
      }
    }
    return totalAmount;
  };

  useEffect(() => {
    getProducts();
    if (userData) getUserCart();
  }, [userData]);

  const value = {
    products,
    currency,
    delivery_fee,
    getProducts,
    search,
    setSearch,
    showSearch,
    setShowSearch,
    cartItem,
    addtoCart,
    getCartCount,
    getCartAmount,
    setCartItem,
    updateQuantity
  };

  return (
    <shopDataContext.Provider value={value}>
      {children}
    </shopDataContext.Provider>
  );
}

export default ShopContext;
