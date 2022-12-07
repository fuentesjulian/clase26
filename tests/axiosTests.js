import axios from "axios";

const baseUrl = "http://localhost:8080/api/products";

const getAllProducts = async () => {
  const response = await axios.get(baseUrl);
  return response.data;
};

const getProductById = async (id) => {
  const response = await axios.get(`${baseUrl}/${id}`);
  return response.data;
};

const createNewProduct = async (data) => {
  const response = await axios.post(baseUrl, data);
  return response.data;
};

const updateProduct = async (id, data) => {
  await axios.put(`${baseUrl}/${id}`, data);
};

const deleteProduct = async (id) => {
  await axios.delete(`${baseUrl}/${id}`);
};

(async () => {
  const allProducts = await getAllProducts();
  console.log(allProducts);
  const data = {
    title: "Remera",
    price: 15000,
    thumbnail:
      "http://d3ugyf2ht6aenh.cloudfront.net/stores/440/495/products/argentina-vamos-argentina-adelante1-03d5fe4c7350410db815922346590160-640-0.png",
  };
  const newProduct = await createNewProduct(data);
  console.log("Producto nuevo", newProduct);

  const productById = await getProductById(newProduct.id);
  console.log(productById);

  const tempData = {
    title: "Remera",
    price: 15000,
    thumbnail:
      "http://d3ugyf2ht6aenh.cloudfront.net/stores/440/495/products/argentina-vamos-argentina-adelante1-03d5fe4c7350410db815922346590160-640-0.png",
  };

  const tempProduct = await createNewProduct(tempData);

  const updateData = {
    price: 20000,
  };

  console.log(tempProduct.id);

  await updateProduct(tempProduct.id, updateData);

  await deleteProduct(newProduct.id);
})();
