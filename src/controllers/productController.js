import * as productService from "../services/productService.js"

export const getAllProducts = async (req, res) => {
  // traigo todos los productos
  const allProducts = await productService.getAllProducts();
  // envio los productos
  res.status(200).send(allProducts);
};

export const getProductById = async (req, res) => {
  // traigo unicamente el producto con el id especificado en params
  const product = await productService.getProductById(req.params.id);
  // envio el producto
  res.status(200).send(product);
};

export const createNewProduct = async (req, res) => {
  // desestructuro el req para quedarme con el body
  const { body } = req;
  // creo un producto, enviando el body
  const newProduct = await productService.createNewProduct(body);
  // envio el nuevo producto como respuesta
  res.status(201).send(newProduct);
};

export const updateProduct = async (req, res) => {
  // desestructuro el req para quedarme con el body
  const { body } = req;
  // actualizo el producto, enviando el body y el id de params
  await productService.updateProduct(req.params.id, body);
  res.status(200).send();
};

export const deleteProduct = async (req, res) => {
  // eliminio el producto con el id especificado en params
  await productService.deleteProduct(req.params.id);
  res.status(200).send();
};
