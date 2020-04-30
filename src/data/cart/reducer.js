import TYPES from "./action-types";

const { ADD, REMOVE } = TYPES;

const reducer = (state = [], { id, type }) => {
  switch (type) {
    case ADD:
      return [...state.filter(existingId => existingId !== id), id];
    case REMOVE:
      return state.filter(existingId => existingId !== id);
    default:
      return state;
  }
};

export default reducer;
