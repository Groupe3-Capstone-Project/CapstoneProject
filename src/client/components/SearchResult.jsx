import React, { useState } from 'react';
import { Link } from 'react-router-dom';

export default function SearchResult({ result }) {
  const [selectedProduct, setSelectedProduct] = useState(null);

//   const handleNameClick = () => {
//     setSelectedProduct(result);
//   };

//   return (
//     <div className="border p-4 mb-4">
//       <div 
//       className="text-lg cursor-pointer text-blue-500 hover:underline"
//       onClick={handleNameClick}>{result.title}</div>
//       {selectedProduct && (
//         <div className="mt-2">
//           <p className="text-xl font-semibold">Title: {selectedProduct.title}</p>
//           <img
//           className="mt-2 w-32 h-32 object-cover rounded"
//           src={selectedProduct.imgUrl} 
//           alt={selectedProduct.title} 
//           />
//         </div>
//       )}
//     </div>
//   );
return (
    <div className="border p-4 mb-4">
      <Link to={`/products/${result.id}`} className="text-lg cursor-pointer text-blue-500 hover:underline">
        {result.title}
      </Link>
    </div>
  );

}