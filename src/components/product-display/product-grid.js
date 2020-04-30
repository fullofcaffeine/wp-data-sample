import React from "react";
import { __ } from "@wordpress/i18n";
import { useSelect, useDispatch } from "@wordpress/data";
import { PRODUCTS_STORE_KEY, CART_STORE_KEY } from "../../data";

const ProductItem = ({
  product = { name: "", description: "", price: "0.00" },
  addToCart,
  inCart
}) => {
  const { name, description, price } = product;
  const cartButton = !inCart ? (
    <p>
      <button
        type="button"
        className="btn btn-sm btn-secondary btn-success"
        onClick={addToCart}
      >
        {__("Add to Cart")}
      </button>
    </p>
  ) : null;
  return (
    <div className="col">
      <h2>{name}</h2>
      <p>{description}</p>
      <div className="float-right">
        <p>{price}</p>
      </div>
      {cartButton}
    </div>
  );
};

const ProductGrid = () => {
  const { products, cartItems } = useSelect(select => {
    return {
      products: select(PRODUCTS_STORE_KEY).getProducts(),
      cartItems: select(CART_STORE_KEY).getCartItems()
    };
  }, []);
  const { addCartItem } = useDispatch(CART_STORE_KEY);
  const productItems = products.map(product => {
    return (
      <ProductItem
        key={product.id}
        product={product}
        addToCart={() => addCartItem(product.id)}
        inCart={cartItems.some(cartItem => cartItem.id === product.id)}
      />
    );
  });
  return <div className="row row-cols-3 py-3 px-lg-5">{productItems}</div>;
};

export default ProductGrid;
