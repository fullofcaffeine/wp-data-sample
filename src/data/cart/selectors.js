import { createRegistrySelector } from "@wordpress/data";
import { PRODUCTS_STORE_KEY } from "../../data";

export const getCartItems = createRegistrySelector(select => state => {
  //get items in cart
  const cartIds = state;
  // use that to get the products from the products store
  return select(PRODUCTS_STORE_KEY)
    .getProducts()
    .filter(product => cartIds.includes(product.id));
});

export const getCartTotal = createRegistrySelector(select => state => {
  const products = select(PRODUCTS_STORE_KEY)
    .getProducts()
    .filter(product => state.includes(product.id));
  if (products) {
    return products.reduce((acc, product) => {
      return acc + parseFloat(product.price);
    }, 0);
  }
});
