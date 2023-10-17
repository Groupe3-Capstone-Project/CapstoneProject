import React, { useState, useEffect } from "react";
import { FaShoppingCart } from "react-icons/fa";
import { GoChevronRight } from "react-icons/go";
import { removeFromCart } from "../api/initializeGuestCart";
import { useNavigate } from "react-router-dom";

export default function GuestCart({
  cart,
  setCart,
  totalPrice,
  cartTotalItems,
}) {
  const [isOpen, setIsOpen] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    async function fetchGuestCartData() {
      try {
        const guestCart = localStorage.getItem("guest_cart");
        const parsedCart = JSON.parse(guestCart);
        setCart(parsedCart);
        // console.log("From GC:", parsedCart);
      } catch (error) {
        console.error(error);
      }
    }
    fetchGuestCartData();
  }, [setCart]);

  const toggleCart = async () => {
    setIsOpen(!isOpen);
  };

  const closeCart = () => {
    setIsOpen(false);
  };

  async function handleRemove(productId) {
    try {
      removeFromCart("guest_cart", productId);
      const guestCart = localStorage.getItem("guest_cart");
      const parsedCart = JSON.parse(guestCart);
      setCart(parsedCart);
    } catch (error) {
      console.error(error);
    }
  }

  // console.log("2nd one:", totalPrice);
  return (
    <div className="relative">
      {!isOpen && (
        <button
          onClick={toggleCart}
          className="text-2xl text-blue-600 hover:text-blue-900 absolute top-2 right-2 focus:outline-none"
        >
          <FaShoppingCart />
        </button>
      )}
      {cartTotalItems > 0 && (
        <div className="absolute top-0 right-1 bg-red-500 text-white rounded-full w-6 h-3 flex items-center justify-center text-xs">
          {cartTotalItems}
        </div>
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
            <div
              key={item.id}
              className="flex items-center justify-between mb-2"
            >
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
                <p className="ml-4 text-gray-700 font-semibold">
                  Qty: {item.quantity}
                </p>
              </div>
            </div>
          ))}
          <hr className="my-4 border-t border-gray-300" />
          <div className="flex items-center justify-between">
            <p className="text-lg font-semibold">Total Price:</p>
            <p className="text-lg font-semibold">${totalPrice}</p>
          </div>
          {cart.cart_items.length > 0 && (
            <button
              onClick={() =>
                navigate("/checkout", {
                  state: { cart: cart, totalPrice: totalPrice },
                })
              }
              className="w-full py-2 bg-blue-500 text-white rounded mt-4 hover:bg-blue-600 focus:outline-none focus:ring focus:border-blue-400"
            >
              Checkout
            </button>
          )}
        </div>
      )}
    </div>
  );
}
