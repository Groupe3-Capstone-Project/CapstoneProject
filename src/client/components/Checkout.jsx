import React, { useState } from "react";
import { clearCart } from "../api/initializeGuestCart";
import { AiFillCreditCard } from "react-icons/ai";
import { Link, useNavigate, useLocation } from "react-router-dom";
import { completeOrder, cancelOrder } from "../api/ajaxHelper";

export default function Checkout({ userId }) {
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");
  const [emailAddress, setEmailAddress] = useState("");
  const [address, setAddress] = useState("");
  const [city, setCity] = useState("");
  const [state, setState] = useState("");
  const [zipCode, setZipCode] = useState("");
  const [cardNumber, setCardNumber] = useState("");
  const [cardholderName, setCardholderName] = useState("");
  const [expirationMonth, setExpirationMonth] = useState("");
  const [expirationYear, setExpirationYear] = useState("");
  const [cvv, setCVV] = useState("");
  const [thankYouMessage, setThankYouMessage] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();
  const { cart } = location.state || {};

  console.log("Check this cart out:", cart)
  if (!cart) {
    // Handle the case where cart and setCart are missing
    // For example, you could display an error message or redirect the user.
    return (
      <div>
        <p>Cart data is missing.</p>
        <Link to="/products">Go back to products</Link>
      </div>
    );
  }


  //   const handleCheckout = () => {
  //     setThankYouMessage(true);
  //     setTimeout(() => {
  //         setThankYouMessage(false);
  //       }, 5000);

  //   };

  const handleCheckout = async () => {
    try {
      const orderId = cart.orderId;
      console.log("orderId?? ", orderId)
      if(userId) {
        const result = await completeOrder(orderId);
      } else {
        clearCart();
      }
      alert("Order completed successfully");
      navigate("/products");
    } catch (error) {
      console.error(error);
    }
  };

  const handleCancelOrder = async (orderId) => {
    try {
      const orderId = cart.orderId;
      console.log("orderId?? ", orderId)
      if (userId) {
        const result = await cancelOrder(orderId);
      } else {
        clearCart(); 
      }
      alert("Order cancelled successfully");
      navigate("/products");
    } catch (error) {
      console.error(error);
    }
  };

  // const handleCheckout = () => {
  //   alert("Thank you for purchasing our product!");
  // };

  const handleCheckoutHistory = () => {
    // Redirect to the products page
    navigate("/products");
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <div className="bg-white p-8 rounded shadow-lg grid grid-cols-2 gap-4">
        <div className="col-span-1">
          <div className="user-info-container border border-gray-300 p-4 rounded">
            <h2 className="text-xl font-semibold mb-2">User Information</h2>
            <label htmlFor="firstName" className="block font-semibold mb-2">
              First Name:
            </label>
            <input
              type="text"
              id="firstName"
              placeholder="First Name"
              value={firstName}
              onChange={(e) => setFirstName(e.target.value)}
              className="w-full p-2 border border-gray-300 rounded focus:outline-none focus:ring focus:border-blue-400"
            />
            <label htmlFor="lastName" className="block font-semibold mb-2">
              Last Name:
            </label>
            <input
              type="text"
              id="lastName"
              placeholder="Last Name"
              value={lastName}
              onChange={(e) => setLastName(e.target.value)}
              className="w-full p-2 border border-gray-300 rounded focus:outline-none focus:ring focus:border-blue-400"
            />
            <label htmlFor="phoneNumber" className="block font-semibold mb-2">
              Phone Number:
            </label>
            <input
              type="tel"
              id="phoneNumber"
              placeholder="Phone Number"
              value={phoneNumber}
              onChange={(e) => setPhoneNumber(e.target.value)}
              className="w-full p-2 border border-gray-300 rounded focus:outline-none focus:ring focus:border-blue-400"
            />
            <label htmlFor="emailAddress" className="block font-semibold mb-2">
              Email Address:
            </label>
            <input
              type="email"
              id="emailAddress"
              placeholder="Email Address"
              value={emailAddress}
              onChange={(e) => setEmailAddress(e.target.value)}
              className="w-full p-2 border border-gray-300 rounded focus:outline-none focus:ring focus:border-blue-400"
            />
            <label htmlFor="address" className="block font-semibold mb-2">
              Address:
            </label>
            <textarea
              id="address"
              placeholder="Address"
              value={address}
              onChange={(e) => setAddress(e.target.value)}
              className="w-full p-2 border border-gray-300 rounded focus:outline-none focus:ring focus:border-blue-400"
            />
            <label htmlFor="city" className="block font-semibold mb-2">
              City:
            </label>
            <input
              type="text"
              id="city"
              placeholder="City"
              value={city}
              onChange={(e) => setCity(e.target.value)}
              className="w-full p-2 border border-gray-300 rounded focus:outline-none focus:ring focus:border-blue-400"
            />
            <label htmlFor="state" className="block font-semibold mb-2">
              State:
            </label>
            <input
              type="text"
              id="state"
              placeholder="State"
              value={state}
              onChange={(e) => setState(e.target.value)}
              className="w-full p-2 border border-gray-300 rounded focus:outline-none focus:ring focus:border-blue-400"
            />
            <label htmlFor="zipCode" className="block font-semibold mb-2">
              Zip Code:
            </label>
            <input
              type="text"
              id="zipCode"
              placeholder="Zip code"
              value={zipCode}
              onChange={(e) => setZipCode(e.target.value)}
              className="w-full p-2 border border-gray-300 rounded focus:outline-none focus:ring focus:border-blue-400"
            />
            <div className="col-span-2 mt-4">
              <Link to="/products">
                <button
                  onClick={() => {
                    handleCheckout()
                  }}
                  type="submit"
                  className="w-full py-2 bg-gray-800 text-white rounded hover:bg-gray-900 focus:outline-none focus:ring focus:border-blue-400"
                >
                  Place Order
                </button>
                {thankYouMessage && (
                  <div className="fixed bottom-5 left-1/2 transform -translate-x-1/2 bg-green-400 text-white px-4 py-2 rounded-md shadow-lg text-xl">
                    Thank you for purchasing our product!
                  </div>
                )}
              </Link>
              <Link to="/products">
                <button
                  onClick={() => {
                    handleCancelOrder();
                  }}
                  className="w-full py-2 bg-red-500 text-white rounded hover:bg-red-600 focus:outline-none focus:ring focus:border-red-400"
                >
                  Cancel Order
                </button>
              </Link>
            </div>
          </div>
        </div>

        <div className="col-span-1">
          <div className="card-info-container border border-gray-300 p-4 rounded">
            <h2 className="text-xl font-semibold mb-2">Card Information</h2>
            <label htmlFor="cardNumber" className="block font-semibold mb-2">
              Card Number:
            </label>
            <div className="relative">
              <AiFillCreditCard className="absolute right-2 top-2 text-gray-400" />
              <input
                type="text"
                id="cardNumber"
                placeholder="Card Number"
                value={cardNumber}
                onChange={(e) => setCardNumber(e.target.value)}
                className="w-full pl-10 p-2 border border-gray-300 rounded focus:outline-none focus:ring focus:border-blue-400"
              />
            </div>
            <label
              htmlFor="cardholderName"
              className="block font-semibold mb-2"
            >
              Cardholder Name:
            </label>
            <input
              type="text"
              id="cardholderName"
              placeholder="Cardholder Name"
              value={cardholderName}
              onChange={(e) => setCardholderName(e.target.value)}
              className="w-full p-2 border border-gray-300 rounded focus:outline-none focus:ring focus:border-blue-400"
            />
            <div className="flex gap-2">
              <div className="col-span-1">
                <label
                  htmlFor="expirationMonth"
                  className="block font-semibold mb-2"
                >
                  Expiration Month:
                </label>
                <input
                  type="text"
                  id="expirationMonth"
                  placeholder="MM"
                  value={expirationMonth}
                  onChange={(e) => setExpirationMonth(e.target.value)}
                  className="w-full p-2 border border-gray-300 rounded focus:outline-none focus:ring focus:border-blue-400"
                />
              </div>
              <div className="col-span-1">
                <label
                  htmlFor="expirationYear"
                  className="block font-semibold mb-2"
                >
                  Expiration Year:
                </label>
                <input
                  type="text"
                  id="expirationYear"
                  placeholder="YY"
                  value={expirationYear}
                  onChange={(e) => setExpirationYear(e.target.value)}
                  className="w-full p-2 border border-gray-300 rounded focus:outline-none focus:ring focus:border-blue-400"
                />
              </div>
            </div>
            <label htmlFor="cvv" className="block font-semibold mb-2">
              CVV:
            </label>
            <input
              type="text"
              id="cvv"
              placeholder="CVV"
              value={cvv}
              onChange={(e) => setCVV(e.target.value)}
              className="w-full p-2 border border-gray-300 rounded focus:outline-none focus:ring focus:border-blue-400"
            />
          </div>
        </div>
      </div>
    </div>
  );
}
