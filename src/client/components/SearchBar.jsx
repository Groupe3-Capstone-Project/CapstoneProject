import React, { useState } from 'react';
import { FaSearch } from 'react-icons/fa';
const BASE_URL = "http://localhost:4000/api";

export default function SearchBar({ setResult }) {
  const [input, setInput] = useState("");

  const fetchData = (value) => {
    fetch(`${BASE_URL}/products`)
      .then((response) => response.json())
      .then((products) => {
        console.log("Fetched products:", products);

        if (Array.isArray(products)) {
          const result = value 
          ? products.filter((product) => {
            const searchWords = value.toLowerCase().split(' ');
            return searchWords.some((searchWord) => {
              return (
                product &&
                product.title &&
                product.title.toLowerCase().includes(searchWord)
              );
            }); 
          }) 
          : [];
          console.log(result);
          setResult(result);
        } else {
          console.error("Product data is not an array:", products);
          setResult([]); 
        }
      })
      .catch((error) => {
        console.error("Fetch error:", error);
        setResult([]);
      });
  }

  const handleChange = (value) => {
    setInput(value);
    fetchData(value);
  }

  return (
    <div className='flex items-center border border-gray-300 p-2 rounded'>
      <FaSearch className='text-blue-500 mr-2' />
      <input
        className='w-full p-2 outline-none focus:ring focus:ring-blue-500'
        placeholder='Type to search...'
        value={input}
        onChange={(e) => handleChange(e.target.value)}
      />
    </div>
  );
}
