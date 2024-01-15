// import api from "../axios";
import { useEffect, useState } from "react";
import CreateButton from "./CreateButton";
import UserModal from "./UserModal";
import { useProducts } from "../contexts/ProductContext";
import DeleteModal from "./DeleteModal";

function Material() {
  const { products, setProducts, fetchProducts } = useProducts();

  const [selectedProduct, setSelectedProduct] = useState(null);
  const [showCreateModal, setShowCreateModal] = useState(false);
  const [showEditModal, setShowEditModal] = useState(false);
  const [showDeleteModal, setShowDeleteModal] = useState(false);

  const handleEditClick = (product) => {
    setSelectedProduct(product);
    setShowEditModal(true);
  };

  const handleCloseModal = () => {
    setShowEditModal(false);
    setShowCreateModal(false);
    setShowDeleteModal(false);
  };

  const handleDeleteClick = (product) => {
    setSelectedProduct(product);
    setShowDeleteModal(true);
  };

  const createProduct = async (data) => {
    try {
      const response = await api.post("/products", data);
      if (response.data.success) {
        setProducts([...products, response.data.newProduct]);
      } else {
        alert("Failed to create product.");
      }
    } catch (error) {
      console.error(error.response ? error.response.data : error.message);
      alert("Failed to create product.");
    }
  };

  const updateProduct = async (data, productId) => {
    try {
      const response = await api.put(`/products/${productId}`, data);

      setProducts((prevProducts) => {
        const productToUpdate = prevProducts.find((p) => p.id === productId);

        if (productToUpdate) {
          const updatedProducts = prevProducts.map((p) =>
            p.id === productToUpdate.id ? response.data.updatedProduct : p
          );

          return updatedProducts;
        } else {
          console.warn("Product not found in the current list.");
          return prevProducts;
        }
      });
    } catch (error) {
      console.error("Error updating product", error);
    }
  };

  const deleteProduct = async (productId) => {
    try {
      await api.delete(`/products/${productId}`);
      setShowDeleteModal(false);

      setProducts((prevProducts) => {
        const updatedProducts = prevProducts.filter(
          (product) => product.id !== productId
        );
        return updatedProducts;
      });
    } catch (error) {
      console.error("Error deleting product", error);
    }
  };

  useEffect(() => {
    fetchProducts();
  }, []);

  useEffect(() => {
    console.log("Selected product updated:", selectedProduct);
  }, [selectedProduct]);

  return (
    <div className="px-4 sm:px-6 lg:px-8">
      <div className="sm:flex sm:items-center">
        <div className="sm:flex-auto">
          <h1 className="text-base font-semibold leading-6 text-gray-900 mt-6">
            Products
          </h1>
          <p className="mt-2 text-sm text-gray-700">
            A list of all the products in your account including their name,
            title, email and role.
          </p>
        </div>
        <div className="mt-4 sm:ml-16 sm:mt-0 sm:flex-none">
          <div className="mt-4 sm:ml-16 sm:mt-0 sm:flex-none">
            <CreateButton onClick={() => setShowCreateModal(true)} />
          </div>
        </div>
      </div>
      <div className="mt-8 flow-root">
        <div className="-mx-4 -my-2 overflow-x-auto sm:-mx-6 lg:-mx-8">
          <div className="inline-block min-w-full py-2 align-middle sm:px-6 lg:px-8">
            <table className="min-w-full divide-y divide-gray-300">
              <thead>
                <tr>
                  <th
                    scope="col"
                    className="py-3.5 pl-4 pr-3 text-left text-sm font-semibold text-gray-900 sm:pl-0"
                  >
                    Name
                  </th>

                  <th
                    scope="col"
                    className="py-3.5 pl-4 pr-3 text-left text-sm font-semibold text-gray-900 sm:pl-0"
                  >
                    Serial Number
                  </th>

                  <th
                    scope="col"
                    className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900"
                  >
                    Stock
                  </th>

                  <th
                    scope="col"
                    className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900"
                  >
                    Price
                  </th>

                  <th scope="col" className="relative py-3.5 pl-3 pr-4 sm:pr-0">
                    <span className="sr-only">Edit</span>
                  </th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-200">
                {products.map((product) => (
                  <tr key={product.name}>
                    <td className="whitespace-nowrap py-4 pl-4 pr-3 text-sm font-medium text-gray-900 sm:pl-0">
                      {product.name}
                    </td>

                    <td className="whitespace-nowrap py-4 pl-4 pr-3 text-sm text-gray-500 sm:pl-0">
                      {product.serialNumber}
                    </td>

                    <td className="whitespace-nowrap py-4 pl-4 pr-3 text-sm text-gray-500">
                      {product.stock}
                    </td>

                    <td className="whitespace-nowrap py-4 pl-4 pr-3 text-sm text-gray-500">
                      {product.price}
                    </td>

                    <td className="relative whitespace-nowrap py-4 pl-3 pr-4 text-right text-sm font-medium sm:pr-0">
                      <button
                        onClick={() => handleEditClick(product)}
                        className="text-indigo-600 hover:text-indigo-900 transition-transform transform hover:scale-110"
                      >
                        Edit<span className="sr-only">, {product.name}</span>
                      </button>

                      <button
                        onClick={() => handleDeleteClick(product)}
                        className="ml-2"
                      >
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          width="1em"
                          height="1em"
                          viewBox="0 0 24 24"
                          className="align-middle text-red-300 hover:text-red-500 hover:scale-110 transition-transform transform"
                        >
                          <path
                            fill="currentColor"
                            d="m9.4 16.5l2.6-2.6l2.6 2.6l1.4-1.4l-2.6-2.6L16 9.9l-1.4-1.4l-2.6 2.6l-2.6-2.6L8 9.9l2.6 2.6L8 15.1zM7 21q-.825 0-1.412-.587T5 19V6H4V4h5V3h6v1h5v2h-1v13q0 .825-.587 1.413T17 21z"
                          ></path>
                        </svg>
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
        {showEditModal &&
          (console.log("Opening edit modal with user:", selectedProduct),
          (
            <UserModal
              editMode={true}
              product={selectedProduct}
              handleCloseModal={handleCloseModal}
              updateProduct={updateProduct}
            />
          ))}
        {showCreateModal && (
          <UserModal
            editMode={false}
            handleCloseModal={handleCloseModal}
            createProduct={createProduct}
          />
        )}

        {showDeleteModal && (
          <DeleteModal
            closeModal={() => setShowDeleteModal(false)}
            deleteUser={deleteUser}
            user={selectedUser}
          />
        )}
      </div>
    </div>
  );
}

export default Material;
