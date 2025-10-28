import React, { useState, useEffect, useContext } from 'react';
import Nav from '../component/Nav';
import Sidebar from '../component/Sidebar';
import { authDataContext } from '../context/AuthContext';
import axios from 'axios';
import { SiEbox } from "react-icons/si";

function Orders() {
  const [orders, setOrders] = useState([]);
  const { serverUrl } = useContext(authDataContext);

  const fetchAllOrders = async () => {
    try {
      const result = await axios.post(serverUrl + '/api/order/list', {}, { withCredentials: true });
      setOrders(result.data.reverse());
    } catch (error) {
      console.log(error);
    }
  };

  const statusHandler = async (e, orderId) => {
    try {
      const result = await axios.post(serverUrl + '/api/order/status', { orderId, status: e.target.value }, { withCredentials: true });
      if (result.data) {
        await fetchAllOrders();
      }
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    fetchAllOrders();
  }, []);

  return (
    <div className="w-[100vw] min-h-screen bg-gradient-to-l from-[#141414] to-[#0c2025] text-white">
      <Nav />
      <div className="flex w-full h-full lg:justify-start justify-center">
        <Sidebar />
        <div className="lg:w-[85%] md:w-[70%] w-full min-h-screen mt-[70px] lg:ml-[300px] md:ml-[220px] px-4 py-8 flex flex-col gap-6">
          <h1 className="text-[32px] md:text-[40px] font-semibold text-[#96eef3] mb-4">All Orders List</h1>

          {orders.length === 0 && (
            <p className="text-gray-400 text-center mt-10">No orders found.</p>
          )}

          {orders.map((order, index) => (
            <div
              key={index}
              className={`w-full rounded-2xl p-5 flex flex-col md:flex-row justify-between items-start md:items-center gap-5 transition-all duration-300 
                ${order.paymentMethod === 'MockPayment' ? 'bg-yellow-500/20' : 'bg-slate-700/50'} hover:bg-slate-600/60`}
            >
              {/* Icon Section */}
              <div className="flex items-center gap-4 w-full md:w-[25%]">
                <SiEbox className="w-[55px] h-[55px] text-black bg-white p-[8px] rounded-xl" />
                <div className="flex flex-col text-[#56dbfc] text-[15px] leading-[22px]">
                  {order.items.map((item, idx) => (
                    <span key={idx}>
                      {item.name.toUpperCase()} × {item.quantity} ({item.size})
                    </span>
                  ))}
                </div>
              </div>

              {/* Address Section */}
              <div className="flex flex-col text-[14px] text-gray-300 w-full md:w-[30%] leading-[22px]">
                <p className="text-white font-semibold">{order.address.firstName} {order.address.lastName}</p>
                <p>{order.address.street}</p>
                <p>{order.address.city}, {order.address.state}</p>
                <p>{order.address.country} - {order.address.pinCode}</p>
                <p>📞 {order.address.phone}</p>
              </div>

              {/* Order Info Section */}
              <div className="flex flex-col gap-[6px] text-[15px] text-green-100 w-full md:w-[25%]">
                <p><span className="text-gray-400">Items:</span> {order.items.length}</p>
                <p><span className="text-gray-400">Method:</span> {order.paymentMethod}</p>
                <p><span className="text-gray-400">Payment:</span> {order.payment ? '✅ Done' : '⏳ Pending'}</p>
                <p><span className="text-gray-400">Date:</span> {new Date(order.date).toLocaleDateString()}</p>
                <p className="text-[18px] text-white font-bold">₹ {order.amount}</p>
              </div>

              {/* Status Dropdown */}
              <div className="w-full md:w-[20%] flex md:justify-end">
                <select
                  value={order.status}
                  className="px-4 py-2 bg-slate-600 rounded-lg border border-[#96eef3] text-white outline-none cursor-pointer w-full md:w-[180px]"
                  onChange={(e) => statusHandler(e, order._id)}
                >
                  <option value="Order Placed">Order Placed</option>
                  <option value="Packing">Packing</option>
                  <option value="Shipped">Shipped</option>
                  <option value="Out for delivery">Out for delivery</option>
                  <option value="Delivered">Delivered</option>
                </select>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default Orders;
