import prodsRepo from "../repos/prodsRepo.js";
const productosApi = new prodsRepo();

export const getAllProducts = async () => {
  const allProducts = await productosApi.getAll();
  return allProducts;
};

export const getProductById = async (id) => {
  const product = await productosApi.getById(id);
  return product;
};

export const createNewProduct = async (data) => {
  const newProduct = await productosApi.createNew(data);
  return newProduct;
};

export const updateProduct = async (id, data) => {
  await productosApi.updateById(id, data);
};

export const deleteProduct = async (id) => {
  await productosApi.deleteById(id);
};
