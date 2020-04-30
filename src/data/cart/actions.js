import TYPES from "./action-types";

const { ADD, REMOVE } = TYPES;

export const addCartItem = id => {
  return {
    type: ADD,
    id
  };
};
export const removeCartItem = id => {
  return {
    type: REMOVE,
    id
  };
};
