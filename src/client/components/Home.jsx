import React, { useState, useEffect } from "react";
import { fetchAllPosts } from "../api/ajaxHelper";


const backgroundImageUrl =
  "https://upload.wikimedia.org/wikipedia/commons/thumb/7/7d/A_Sunday_on_La_Grande_Jatte%2C_Georges_Seurat%2C_1884.jpg/640px-A_Sunday_on_La_Grande_Jatte%2C_Georges_Seurat%2C_1884.jpg";


export default function Home() {
    const [products, setProducts] = useState([]);
    const [error, setError] = useState(null);

    useEffect(() => {
        async function fetchPosts() {
            try {
                const returnedProducts = await fetchAllPosts();
                setProducts(returnedProducts);
            } catch (err) {
                console.error(err)
                setError(err);
            } 
        }

        fetchPosts();
    }, []);

    function renderAllPosts() { 
         if (!Array.isArray(products)) {
            // Handle loading or error state here
            return (
              <div>
                {error ? (
                  <div>Error: {error.message}</div>
                ) : (
                  <div>Loading...</div>
                )}
              </div>
            );
        }            

        return (
            <div className="mx-4 md:mx-8">
              <div className="flex">
                <div className="flex-1 relative">
                  <div
                    className="bg-cover bg-center w-full h-[500px]"
                    style={{
                      backgroundImage: `url(${backgroundImageUrl})`,
                    }}
                  ></div>
                  <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 text-white text-center">
                    <h1 className="text-4xl font-bold mb-4">Welcome to your online art gallery</h1>
                    
                  </div>
                </div>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 xl:grid-cols-5 gap-[30px] max-w-sm mx-auto md:max-w-none md:mx-0 mt-3">
                {products.map((product) => (
                  <div key={product.id} className="mb-4 relative overflow-hidden group transition">
                    <div className="border border-[#e4e4e4] h-[250px] w-[250px]">
                      <div className="w-full h-full flex justify-center items-center">
                        <div className="w-[200px] mx-auto flex justify-center items-center">
                          <img
                            className="max-h-[160px] group-hover:scale-110 transition duration-300"
                            src={product.imgUrl}
                            alt=""
                          />
                        </div>
                      </div>
                    </div>
                    <div>
                      <h2 className="text-sm capitalize text-gray-500 mb-1">{product.artist}</h2>
                      <h3 className="font-semibold mb-1">{product.title}</h3>
                      <p className="font-semibold">$ {product.price}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          );
          
    }

    return (
        <div>{renderAllPosts()}</div>
    )
}