import { fetch } from "../controls";
import { hydrate } from "./actions";
import { getResourcePath } from "./utils";

export function* getProducts() {
  const products = yield fetch(getResourcePath());
  if (products) {
    return hydrate(products);
  }
  return;
}
