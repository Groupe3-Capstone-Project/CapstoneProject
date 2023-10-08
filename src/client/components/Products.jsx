

import React, { useState, useEffect } from "react";
// import { fetchAllProducts } from "../api/ajaxHelper";
import { BsPlus, BsEyeFill } from "react-icons/bs"
import { Link } from "react-router-dom";
import Cart from "./Cart";
import SearchBar from "./SearchBar";
import SearchResultList from "./SearchResultList";
import { addProduct, getCart, fetchPaginatedProducts } from "../api/ajaxHelper";



const backgroundImageUrl =
  "https://upload.wikimedia.org/wikipedia/commons/thumb/7/7d/A_Sunday_on_La_Grande_Jatte%2C_Georges_Seurat%2C_1884.jpg/640px-A_Sunday_on_La_Grande_Jatte%2C_Georges_Seurat%2C_1884.jpg";


export default function Products({ addToCart, userId }) {
    const [products, setProducts] = useState([]);
    const [error, setError] = useState(null);
    const [cart, setCart] = useState([]);
    const [result, setResult] = useState([]);
    const [currentPage, setCurrentPage] = useState(1); // Track current page
    const [totalProducts, setTotalProducts] = useState(0);
    const itemsPerPage = 10; // Items per page (you can adjust this)

    useEffect(() => {
      async function fetchProductsAndCart() {
        try {
          // Fetch the list of paginated products
          const data = await fetchPaginatedProducts(currentPage, itemsPerPage);

          if (data && data.products) {
          setProducts(data.products);
          setTotalProducts(data.totalProducts);
          }
    
          // Fetch the user's cart
          const cartData = await getCart(userId); // You may need to pass the user's ID if required
          setCart(cartData); // Assuming cartData contains the cart array
        } catch (err) {
          console.error(err);
          setError(err);
        }
      }
    
      fetchProductsAndCart();
    }, [userId, currentPage]);

    async function handlePageChange(newPage) {
      // Handle page change when user clicks on pagination buttons
      setCurrentPage(newPage);
    }

    
    async function handleAddToCart(product) {
      try {
        // Call the addProduct function from the backend to add the product to the cart
        const response = await addProduct(product.id);  // Assuming product.id is the ID of the product to add
        if (response) {
          // If the addition was successful, update the cart state by fetching the updated cart
          const cartData = await getCart(response.userCart.userId); // You may need to pass the user's ID if required
          setCart(cartData); // Assuming cartData contains the updated cart array
        } else {
          console.error("Failed to add product to cart.");
        }
      } catch (error) {
        console.error("Error adding product to cart:", error);
      }
    }
    

  function removeFromCart(productId) {
    // Remove the product with the specified productId from the cart
    const updatedCart = cart.filter((item) => item.id !== productId);
    setCart(updatedCart);
  }

  // function calculateTotal() {
  //   // Calculate the total price of items in the cart
  //   const total = cart.reduce((accumulator, item) => {
  //     return accumulator + item.price * item.quantity;
  //   }, 0);
  //   return total;
  // }


    function renderAllProducts() {

        return (

   <div className="mx-4 md:mx-8">      
      <div className="flex">
         <div className="flex-1"> 
         <div
              className="bg-cover bg-center w-full h-[750px] relative"
              style={{ backgroundImage: `url(${backgroundImageUrl})` }}
            >
              <h1 className="text-white text-4xl font-bold absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 text-center shadow-lg shadow-blue-500/50">
                Welcome to your online art gallery
              </h1>
            </div>
            <SearchBar setResult={setResult} />
            <SearchResultList result={result} />
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 xl:grid-cols-5 gap-[30px] max-w-sm mx-auto md:max-w-none md:mx-0 mt-3">
                {products.map((product) => (
                    <div key={product.id} className="mb-4 relative overflow-hidden group transition">
                        <div className="border border-[#e4e4e4] h-[250px] w-[250px]">
                            <div className="w-full h-full flex  justify-center items-center">
                                <div className="w-[200px] mx-auto flex justify-center items-center">
                                <Link to={`/products/${product.id}`}>
                                    <img
                                        className="max-h-[160px] group-hover:scale-110 transition duration-300 hover:cursor-pointer "
                                        src={product.imgUrl}
                                        alt=""
                                    />
                                </Link>    
                                </div>
                                <div className="absolute top-0 -right-8 group-hover:right-5 p-2 flex flex-col items-center justify-center gap-y-2 opacity-0 group-hover:opacity-100 transition-all duration-300">
                                <button onClick={() => handleAddToCart(product)}>
                                 <div className="flex justify-center items-center text-white w-5 h-5 bg-red-500">
                                 <BsPlus className="text-3xl" />
                                 </div>
                                </button>
                                    <Link to={`/products/${product.id}`}>
                                        <BsEyeFill 
                                        className="w-5 h-5 bg-white flex justify-center items-center text-primary drop-shadow-xl" 
                                        />
                                    </Link>
                                </div>
                            </div>
                        </div>
                        <div>
                            <h2 className=" text-sm capitalize text-gray-500 mb-1">{product.artist}</h2>
                            <h3 className="font-semibold mb-1">{product.title}</h3>
                            <p className="font-semibold">$ {product.price}</p>
                        </div>
                    </div>
                ))}
            </div>
            </div>
            <div className=" ml-10 mt-20">
                <Cart cart={cart} removeFromCart={removeFromCart} />
            </div>
        </div>
    </div>    
        );
    }

    function renderPagination() {
      const totalPages = Math.ceil(totalProducts / itemsPerPage);
      const pageButtons = [];
  
      for (let i = 1; i <= totalPages; i++) {
        pageButtons.push(
          <button
            key={i}
            onClick={() => handlePageChange(i)}
            className={`mx-1 ${
              currentPage === i ? 'bg-blue-500 text-white' : 'bg-gray-200 text-gray-600'
            } rounded-md px-3 py-1 focus:outline-none focus:ring`}
          >
            {i}
          </button>
        );
      }
  
      return (
        <div className="flex justify-center mt-4">{pageButtons}</div>
      );
    }

    



    return (
        <div>
          {renderAllProducts()}
          {renderPagination()}
        </div>
    )
}

