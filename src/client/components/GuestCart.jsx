
import React, { useState, useEffect } from "react";
import { FaShoppingCart } from "react-icons/fa";
import { GoChevronRight } from "react-icons/go";
import { getGuestCart, removeFromCart } from "../api/initializeGuestCart";
// import { getCart, removeProduct } from "../api/ajaxHelper";

export default function GuestCart({ cart, setCart, totalPrice, setTotalPrice }) {
  const [isOpen, setIsOpen] = useState(false);
  
  useEffect(() => {
      async function fetchGuestCartData() {
          try {
                const guestCart = localStorage.getItem("guest_cart");
                const parsedCart = JSON.parse(guestCart);
                setCart(parsedCart);
                console.log("From GC:", parsedCart);
                const total = calculateTotal(parsedCart.cart_items);
                setTotalPrice(total);
        } catch (error) {
            console.error(error);
        }
    }
    // Call the fetchCartData function when the component is mounted
    fetchGuestCartData();
  }, [setCart]);

  const calculateTotal = (cartItems) => {
    return cartItems.reduce((total, item) => total + item.price * item.quantity, 0);
  };
 

  const toggleCart = async () => {
    setIsOpen(!isOpen);
  };

  const closeCart = () => {
    setIsOpen(false);
  };

  async function handleRemove(productId) {
    try {
      removeFromCart("guest_cart",productId);
      const guestCart = localStorage.getItem("guest_cart");
      const parsedCart = JSON.parse(guestCart);
      setCart(parsedCart);
      const total = calculateTotal(parsedCart.cart_items);
      setTotalPrice(total);
    } catch (error) {
      console.error(error);
    }
  }

  console.log("2nd one:", cart)
  return (
    <div className="relative">
      {!isOpen && (
        <button
          onClick={toggleCart}
          className="text-2xl text-gray-900 hover:text-blue-400 absolute top-2 right-2 focus:outline-none"
        >
          <FaShoppingCart />
        </button>
      )}
      {isOpen && (
        <div className=" w-96 max-height: fit-content overflow-y-auto border border-gray-300 rounded p-4 absolute top-0 right-0 bg-white z-10">
          <button
            onClick={closeCart}
            className="text-xl text-red-500 hover:text-red-700 absolute top-2 right-2 focus:outline-none"
          >
            <GoChevronRight />
          </button>
          <h2 className="text-lg font-semibold mb-4">Your Shopping Cart</h2>
          {cart.cart_items.map((item) => (
            <div key={item.id} className="flex items-center justify-between mb-2">
              <div className="flex items-center">
                <img
                  src={item.imgUrl}
                  alt={item.title}
                  className="w-12 h-12 object-cover rounded"
                />
                <div className="ml-2">
                  <p className="text-gray-700 font-semibold">{item.title}</p>
                  <p className="text-gray-500 text-sm">Price: ${item.price}</p>
                </div>
              </div>
              <div className="flex items-center">
                <button
                  onClick={() => handleRemove(item.id)}
                  className="text-red-500 hover:text-red-700 font-semibold"
                >
                  Remove
                </button>
                <p className="ml-4 text-gray-700 font-semibold">Qty: {item.quantity}</p>
              </div>
            </div>
          ))}
          <hr className="my-4 border-t border-gray-300" />
          <div className="flex items-center justify-between">
            <p className="text-lg font-semibold">Total Price:</p>
            <p className="text-lg font-semibold">${totalPrice.toFixed(2)}</p>
            {/* <p className="text-lg font-semibold">${calculateTotal()}</p> */}
          </div>
        </div>
      )}
    </div>
  );
}