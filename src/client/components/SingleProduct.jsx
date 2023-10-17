import { useState, useEffect } from "react";
import { fetchSingleProduct, addProduct } from "../api/ajaxHelper";
import { addToGuestCart } from "../api/initializeGuestCart";
import { useParams } from "react-router";
import { VscChromeClose } from "react-icons/vsc";

import { Link } from "react-router-dom";

export default function SingleProduct({ userId }) {
  const [product, setProduct] = useState({});
  const [cart, setCart] = useState([]);
  const [showConfirmation, setShowConfirmation] = useState(false);
  let { id } = useParams();

  useEffect(() => {
    async function singlePlayerHandle() {
      const data = await fetchSingleProduct(id);
      console.log(data);
      setProduct(data);
    }
    singlePlayerHandle();
  }, [id]);

  async function handleAddToCart(product) {
    try {
      if (userId) {
        const response = await addProduct(product.id);
        if (!response) {
          console.error("Failed to add product to cart.");
        } else {
          setCart(response.userCart);
          setShowConfirmation(true);
          setTimeout(() => {
            setShowConfirmation(false);
          }, 3000);
        }
      } else {
        addToGuestCart("guest_cart", product);
        const guestCart = localStorage.getItem("guest_cart");
        const parsedCart = JSON.parse(guestCart);
        setCart(parsedCart);
        setShowConfirmation(true);
        setTimeout(() => {
          setShowConfirmation(false);
        }, 3000);
      }
    } catch (error) {
      console.error("Error adding product to cart:", error);
    }
  }

  function renderSingleProduct() {
    return (
      <div className="flex justify-center items-center h-screen">
        <div className="max-w-screen-md mx-auto flex relative">
          <div className="w-96 mx-auto pr-4 hover:scale-150 transition-all duration-500 cursor-pointer z-10">
            <img src={product.imgUrl} alt={product.title} />
          </div>
          <div className="flex-1 px-4 bg-white rounded-lg shadow-md p-4 relative">
            <Link to={`/products`}>
              <VscChromeClose className="text-xl text-red-500 hover:text-red-700 absolute top-2 right-2 focus:outline-none" />
            </Link>
            <p className="text-sm capitalize text-gray-500 mb-1">
              Period: {product.period}
            </p>
            <h3 className="font-semibold mb-1">{product.title}</h3>
            <h2 className="font-semibold">Artist: {product.artist}</h2>
            <p className="whitespace-pre-line">{product.description}</p>
            <h2>Year: {product.year}</h2>
            <h2>Dimensions: {product.dimensions}</h2>
            <p className="font-semibold">$ {product.price}</p>
            <div className="text-center mt-4">
              <button
                onClick={() => {
                  handleAddToCart(product);
                }}
                className="py-2 px-4 bg-gray-800 text-white rounded hover:bg-gray-900 focus:outline-none focus:ring focus:border-blue-400"
              >
                Add To Cart
              </button>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div>
      {renderSingleProduct()}
      {showConfirmation && (
        <div className="fixed bottom-5 left-1/2 transform -translate-x-1/2 bg-green-400 text-white px-4 py-2 rounded-md shadow-lg text-xl">
          Product added to cart!
        </div>
      )}
    </div>
  );
}
