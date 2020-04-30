import {
  STORE_KEY as PRODUCTS_STORE_KEY,
  STORE_CONFIG as productsConfig
} from "./products";
import {
  STORE_KEY as CART_STORE_KEY,
  STORE_CONFIG as cartConfig
} from "./cart";
import { registerStore } from "@wordpress/data";

registerStore(PRODUCTS_STORE_KEY, productsConfig);
registerStore(CART_STORE_KEY, cartConfig);

export { PRODUCTS_STORE_KEY, CART_STORE_KEY };
