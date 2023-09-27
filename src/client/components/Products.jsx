import React, { useState, useEffect } from "react";
import { fetchAllPosts } from "../api/ajaxHelper";
import { BsPlus, BsEyeFill } from "react-icons/bs"


// const dummyPosts = [
//     {
//         id: 1,
//         imgUrl: "https://news.artnet.com/app/news-upload/2014/07/Johannes_Vermeer_1632-1675_-_The_Girl_With_The_Pearl_Earring_1665-e1435072137333.jpg",
//         title: "Dummy Post 1",
//         artist: "Dummy Artist 1",
//         description: "This is a dummy post description for post 1.",
//         price: "7000",
//     },
//     {
//         id: 2,
//         imgUrl: "https://news.artnet.com/app/news-upload/2014/07/American-Gothic.jpg",
//         title: "Dummy Post 2",
//         artist: "Dummy Artist 2",
//         description: "This is a dummy post description for post 2.",
//         price: "7000",
//     },
//     {
//         id: 3,
//         imgUrl: "https://sep.turbifycdn.com/ty/cdn/madisonartshop/most-famous-paintings-1.jpg?t=1678352599&",
//         title: "Dummy Post 3",
//         artist: "Dummy Artist 3",
//         description: "This is a dummy post description for post 3.",
//         price: "7000",
//     },
//     {
//         id: 4,
//         imgUrl: "https://sep.turbifycdn.com/ty/cdn/madisonartshop/most-famous-paintings-16.jpg?t=1678352599&",
//         title: "Dummy Post 4",
//         artist: "Dummy Artist 4",
//         description: "This is a dummy post description for post 4.",
//         price: "7000",
//     },
//     {
//         id: 5,
//         imgUrl: "https://sep.turbifycdn.com/ty/cdn/madisonartshop/most-famous-paintings-3.jpg?t=1678352599&",
//         title: "Dummy Post 5",
//         artist: "Dummy Artist 5",
//         description: "This is a dummy post description for post 5.",
//         price: "7000",
//     },
//     {
//         id: 6,
//         imgUrl: "https://sep.turbifycdn.com/ty/cdn/madisonartshop/most-famous-paintings-17.jpg?t=1678352599&",
//         title: "Dummy Post 6",
//         artist: "Dummy Artist 6",
//         description: "This is a dummy post description for post 6.",
//         price: "7000",
//     },
// ];


export default function Products() {
    const [products, setProducts] = useState([]);
    const [error, setError] = useState(null);

    useEffect(() => {
        async function fetchPosts() {
            try {
                const returnedProducts = await fetchAllPosts();
                setPosts(returnedProducts);
            } catch (err) {
                console.error(err)
                setError(err);
            } finally {
                setLoading(false);
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
                            <div className="w-full h-full flex justify-center items-center">
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
                                    <button>
                                        <BsEyeFill className="w-5 h-5 bg-white flex justify-center items-center text-primary drop-shadow-xl" />
                                    </button>
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
