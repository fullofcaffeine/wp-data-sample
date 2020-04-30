import * as selectors from "./selectors";
import * as actions from "./actions";
import reducer from "./reducer";

export { default as STORE_KEY } from "./constants";
export const STORE_CONFIG = {
  selectors,
  actions,
  reducer
};
