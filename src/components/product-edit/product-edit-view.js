import React from "react";
import ProductForm from "./product-form";
import ProductListTable from "./product-list-table";
import { useState } from "@wordpress/element";
import { useSelect, useDispatch } from "@wordpress/data";
import { PRODUCTS_STORE_KEY } from "../../data";

const ProductEditView = ({ updateProducts = () => null }) => {
  const products = useSelect(select => {
    return select(PRODUCTS_STORE_KEY).getProducts();
  }, []);
  const { createProduct, updateProduct, deleteProduct } = useDispatch(
    PRODUCTS_STORE_KEY
  );
  const [isEditing, setIsEditing] = useState(false);
  const [editedProduct, setEditedProduct] = useState(undefined);
  const onEdit = productId => {
    setEditedProduct(products.find(product => product.id === productId));
    setIsEditing(true);
  };
  const onCreate = () => {
    setEditedProduct(undefined);
    setIsEditing(true);
  };
  const onProductUpdate = (updatedProduct, isNew) => {
    const method = isNew ? createProduct : updateProduct;
    method(updatedProduct);
    setEditedProduct(undefined);
    setIsEditing(false);
  };
  const onDelete = id => {
    deleteProduct(id);
  };
  return isEditing ? (
    <ProductForm product={editedProduct} onProductUpdate={onProductUpdate} />
  ) : (
    <ProductListTable
      products={products}
      onEdit={onEdit}
      onCreate={onCreate}
      onDelete={onDelete}
    />
  );
};

export default ProductEditView;
