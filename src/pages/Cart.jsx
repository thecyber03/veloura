import React from "react";
import { useCart } from "../API/CartContext.jsx";
import { Link } from "react-router-dom";
import LoginButton from '../components/ui/LoginButton.jsx'
import { useAuth } from "../API/AuthContext.jsx";
import axios from 'axios'

export default function CartPage() {
  const { cart, updateCartQuantity, removeFromCart } = useCart(); // Updated
  const { user, setUser } = useAuth()
  
  const placeOrder = async () => {
    try {
      if (!user.address) {
        const newAddress = prompt("Enter your delivery address:");
        if (!newAddress) return;
  
        await axios.patch(`${import.meta.env.VITE_BACKEND_URI}/update-address/${user._id}`, { address: newAddress });
      }
  
      await axios.post(`${import.meta.env.VITE_BACKEND_URI}/place-order/${user._id}`, { cart });
      localStorage.removeItem("cart");
  
      const { data } = await axios.get(`${import.meta.env.VITE_BACKEND_URI}/user/${user._id}`);
      setUser(data); // Update AuthContext with latest user data
    } catch (err) {
      alert(err.response?.data?.error || "Something went wrong");
    }
  };




  // Calculate total price
  const totalAmount = cart.reduce((acc, item) => acc + item.price * item.quantity, 0);

  if (cart.length === 0) {
    return (
      <div className="flex flex-col justify-center items-center h-[80vh]">
        <p className="text-md text-gray-500 font-semibold">Your cart is empty.</p>
        {!user && (
          <Link to="/login">
            <p className="text-sm text-gray-500 cursor-pointer">
              Please <mark className="text-blue-500 underline bg-transparent font-semibold">Login</mark> to continue shopping
            </p>
          </Link>
        )}
      </div>
    );
  }

  return (
    <div className="p-4">
      <h1 className="text-2xl font-bold mb-4">Your Cart</h1>

      {cart.map((item) => (
        <div key={item.id} className="flex items-center gap-4 border-b py-2">
          {/* Image */}
          <div className="w-16 h-16 overflow-hidden flex justify-center items-center bg-gray-100 rounded-md">
            {item.image ? (
              <img src={item.image} alt={item.title} className="h-full w-auto object-contain" />
            ) : (
              <p className="text-xs text-gray-400">No Image</p>
            )}
          </div>

          {/* Product Info */}
          <div className="flex-1">
            <h3 className="text-lg font-semibold">{item.title}</h3>
            <p className="text-gray-500 text-sm">{item.unit}</p>
            <p className="text-gray-700 font-semibold">₹{item.price * item.quantity}</p>
          </div>

          {/* Quantity Controls */}
          <div className="flex items-center gap-2">
            <button
              onClick={() =>
                item.quantity > 1
                  ? updateCartQuantity(item.id, item.quantity - 1)
                  : removeFromCart(item.id)
              }
              className="bg-gray-300 text-gray-700 px-3 py-1 rounded-md text-lg"
            >
              -
            </button>
            <span className="font-semibold">{item.quantity}</span>
            <button
              onClick={() => updateCartQuantity(item.id, item.quantity + 1)}
              className="bg-gray-300 text-gray-700 px-3 py-1 rounded-md text-lg"
            >
              +
            </button>
          </div>
        </div>
      ))}

      {/* Total & Checkout Section */}
      <div className="fixed bottom-0 left-0 w-full flex justify-between items-center border-t px-4 py-5 bg-white">
        {/* Total Amount */}
        <p className="text-lg font-semibold">Total: ₹{totalAmount}</p>

        {/* Place Order / Login Button */}
        {user ? (
          <Link to="/my-order">
            <button onClick={placeOrder} className="bg-blue-500 text-white px-4 py-2 rounded-md font-medium">
              Place Order
            </button>
          </Link>
        ) : (
          <LoginButton/>
        )}
      </div>
    </div>
  );
}
