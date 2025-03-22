import React, { useState, useEffect } from "react";
import { useAuth } from "../API/AuthContext.jsx";
import axios from "axios";

export default function MyOrder() {
  const { user, setUser } = useAuth();
  const [otp, setOtp] = useState("");

  // Generate OTP once when the component mounts
  useEffect(() => {
    setOtp(Math.floor(100000 + Math.random() * 900000));
  }, []);

  // If user is null, show a loading message (without breaking Hook rules)
  if (!user) {
    return <p className="text-gray-500 p-4">Loading orders...</p>;
  }

  const cart = user.cart || [];
  const getStatus = () => ["Order Placed", "Shipped", "Out for Delivery", "Delivered"];

  const cancelOrder = async (orderId) => {
    console.log("orderId from frontend",orderId)
    console.log("user id from frontend",user._id)
    
    if (!confirm("Are you sure you want to cancel this order?")) return;

    try {
      await axios.delete(`${import.meta.env.VITE_BACKEND_URI}/cancel-order/${user._id}/${orderId}`);
      const { data } = await axios.get(`${import.meta.env.VITE_BACKEND_URI}/user/${user._id}`);
      setUser(data); 
    } catch (err) {
      alert("Failed to cancel order");
    }
  };

  return (
    <div className="p-4">
      <h1 className="text-2xl font-bold">My Orders</h1>
      <p className="mb-4 bg-gray-300 p-1 rounded">Delivery Address: {user.address || "Not provided"}</p>

      {cart.length === 0 ? (
        <p className="text-gray-500">You have no orders yet.</p>
      ) : (
        cart.map((item, index) => (
          <div key={item.id} className="border p-4 rounded-lg mb-4 shadow-md">
            <div className="flex items-center gap-4">
              <div className="w-16 h-16 bg-gray-100 flex justify-center items-center rounded-md">
                {item.image ? (
                  <img src={item.image} alt={item.title} className="h-full w-auto object-contain" />
                ) : (
                  <p className="text-xs text-gray-400">No Image</p>
                )}
              </div>

              <div className="flex-1">
                <h3 className="text-lg font-semibold">{item.title}</h3>
                <p className="text-gray-500 text-sm">{item.unit}</p>
                <p className="text-gray-700 font-semibold">₹{item.price * item.quantity}</p>
                <p className="font-semibold text-gray-600">Qty: {item.quantity}</p>
              </div>
            </div>

            {/* Order Status */}
            <div className="mt-4">
              <p className="text-sm font-semibold text-blue-500">{getStatus()[index % 4]}</p>
              <div className="relative w-full h-1 bg-gray-300 mt-2">
                <div className="absolute top-0 left-0 h-1 bg-blue-500" style={{ width: `${(index % 4) * 33}%` }}></div>
              </div>
            </div>

            {/* Delivery OTP */}
            {index % 4 === 3 && (
              <p className="text-green-600 font-semibold mt-2">
                Delivery OTP: <span className="text-black">{otp}</span>
              </p>
            )}

            {/* Cancel Order Button */}
            <button
              className="mt-4 bg-red-500 text-white px-4 py-2 rounded-md text-sm"
              onClick={() => cancelOrder(item.id)}
            >
              Cancel Order
            </button>
          </div>
        ))
      )}
    </div>
  );
}
