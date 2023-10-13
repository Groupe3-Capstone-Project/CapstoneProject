import React, { useState } from "react";
import { Link } from "react-router-dom";

export default function SearchResult({ result }) {
  const [selectedProduct, setSelectedProduct] = useState(null);

  return (
    <div className="border p-4 mb-4">
      <Link
        to={`/products/${result.id}`}
        className="text-lg cursor-pointer text-blue-500 hover:underline"
      >
        {result.title}
      </Link>
    </div>
  );
}
