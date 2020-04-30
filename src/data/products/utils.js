export const getResourcePath = id => {
  const root = `${window.resourceAddress}/products/`;
  return id ? `${root}/${id}` : root;
};
