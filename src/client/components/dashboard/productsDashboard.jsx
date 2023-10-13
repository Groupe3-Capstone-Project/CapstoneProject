import { useState, React, useEffect } from "react";
import ProductModal from "./productModal";
import {
  fetchAllProducts,
  editProduct,
  createProduct,
  deleteProduct,
} from "../../api/ajaxHelper";
import DeleteModal from "./deleteModal";

const productsDashboard = () => {
  const [modalOpen, setModalOpen] = useState(false);
  const [products, setProducts] = useState([]);

  async function fetchProducts() {
    try {
      const response = await fetchAllProducts();
      const returnedProducts = response.reverse();
      setProducts(returnedProducts);
    } catch (err) {
      console.error(err);
    }
  }

  useEffect(() => {
    fetchProducts();
  }, []);

  const handleCreate = async (data) => {
    try {
      await createProduct(data);
      fetchProducts();
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <>
      <h1 className="text-center text-2xl mb-4">All Products</h1>
      <div className="flex justify-end">
        <button className="btn" onClick={() => setModalOpen(true)}>
          New Product
        </button>
        {modalOpen && (
          <ProductModal
            setModalOpen={setModalOpen}
            type="new"
            handleSubmit={handleCreate}
            products={products}
          />
        )}
      </div>

      <Products fetchProducts={fetchProducts} products={products} />
    </>
  );
};

function Products({ fetchProducts, products }) {
  const handleEdit = async (data) => {
    try {
      const rv = await editProduct(data);
      fetchProducts();
    } catch (err) {
      console.error(err);
    }
  };

  const handleDelete = async (id) => {
    try {
      await deleteProduct(id);
      fetchProducts();
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <div className="overflow-x-auto">
      <table className="table">
        <thead>
          <tr>
            <th>
              <label>
                <input type="checkbox" className="checkbox" />
              </label>
            </th>
            <th>Painting</th>
            <th>Period</th>
            <th>Price</th>
            <th></th>
          </tr>
        </thead>
        <tbody>
          {products &&
            products.map((product) => (
              <Product
                product={product}
                handleEdit={handleEdit}
                key={product.id}
                handleDelete={handleDelete}
                products={products}
              />
            ))}
        </tbody>
      </table>
    </div>
  );
}

function Product({ product, handleEdit, handleDelete, products }) {
  const [modalOpen, setModalOpen] = useState(false);
  const [deleteModal, setDeleteModel] = useState(false);

  return (
    <tr>
      <th>
        <label>
          <input type="checkbox" className="checkbox" />
        </label>
      </th>
      <td>
        <div className="flex items-center space-x-3">
          <div className="avatar">
            <div className="mask mask-squircle w-12 h-12">
              <img src={product.imgUrl} alt="Profile avatar" />
            </div>
          </div>
          <div>
            <div className="font-bold">{product.title}</div>
            <div className="text-sm opacity-50">{product.artist}</div>
          </div>
        </div>
      </td>
      <td>
        {product.year}
        <br />
        <span className="badge badge-ghost badge-sm">{product.period}</span>
      </td>
      <td>{product.price}</td>
      <th className="flex gap-2 font-normal">
        <button className="btn" onClick={() => setModalOpen(true)}>
          Edit
        </button>
        {modalOpen && (
          <ProductModal
            handleSubmit={handleEdit}
            setModalOpen={setModalOpen}
            product={product}
            products={products}
          />
        )}

        <button
          className="btn btn-error btn-outline"
          onClick={() => setDeleteModel(true)}
        >
          Delete
        </button>
        {deleteModal && (
          <DeleteModal
            type="product"
            handleSubmit={handleDelete}
            title={product.title}
            id={product.id}
            setModalOpen={setDeleteModel}
          />
        )}
      </th>
    </tr>
  );
}
export default productsDashboard;
