export const getProducts = state => {
  return state.products || [];
};
export const getProduct = (state, id) => {
  return getProducts(state).find(product => product.id === id);
};
