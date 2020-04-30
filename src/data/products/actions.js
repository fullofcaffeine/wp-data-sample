import { getResourcePath } from "./utils";
import { fetch } from "../controls";
import { select } from "@wordpress/data-controls";
import TYPES from "./action-types";
import STORE_KEY from "./constants";

const { UPDATE, CREATE, DELETE, HYDRATE } = TYPES;

export function* createProduct(product) {
  const result = yield fetch(getResourcePath(), {
    method: "POST",
    body: product
  });
  if (result) {
    return {
      type: CREATE,
      product: result
    };
  }
  return;
}

export function* updateProduct(product) {
  const canonicalProduct = yield select(STORE_KEY, "getProduct", product.id);
  const result = yield fetch(getResourcePath(canonicalProduct._id), {
    method: "PUT",
    body: product
  });
  if (result) {
    return {
      type: UPDATE,
      product
    };
  }
}

// create a custom fetch control because the built-in one for `data-controls` is too wp specific.
export function* deleteProduct(productId) {
  const product = yield select(STORE_KEY, "getProduct", productId);
  const result = yield fetch(getResourcePath(product._id), {
    method: "DELETE"
  });
  if (result) {
    return {
      type: DELETE,
      productId
    };
  }
}

export const hydrate = products => {
  return {
    type: HYDRATE,
    products
  };
};
