import React, { useState, useEffect } from "react";
import { fetchAllPosts } from "../api/ajaxHelper";
import { BsPlus, BsEyeFill } from "react-icons/bs"
import { Link } from "react-router-dom";



export default function Products() {
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

        return (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 xl:grid-cols-5 gap-[30px] max-w-sm mx-auto md:max-w-none md:mx-0">
                {products.map((product) => (
                    <div key={product.id} className="mb-4 relative overflow-hidden group transition">
                        <div className="border border-[#e4e4e4] h-[300px] w-[300px]">
                            <div className="w-full h-full flex  justify-center items-center">
                                <div className="w-[200px] mx-auto flex justify-center items-center">
                                    <img
                                        className="max-h-[160px] group-hover:scale-110 transition duration-300"
                                        src={product.imgUrl}
                                        alt=""
                                    />
                                </div>
                                <div className="absolute top-0 -right-8 group-hover:right-5 p-2 flex flex-col items-center justify-center gap-y-2 opacity-0 group-hover:opacity-100 transition-all duration-300">
                                    <button>
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
                            <h3 className="font-semibold mb-1">{product.title}</h3>
                            <h2 className="font-semibold">{product.artist}</h2>
                            <p className="font-semibold">$ {product.price}</p>
                        </div>
                    </div>
                ))}
            </div>
        );
    }
    



    return (
        <div>{renderAllPosts()}</div>
    )
}
