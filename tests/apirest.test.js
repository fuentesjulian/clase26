import { httpServer } from "../src/main.js";
import supertest from "supertest";
import { expect } from "chai";
import { generateOne as generateProd } from "../src/api/fakeProds.js";
const PORT = 8080;
let request;
let product;
let prodId;
let updateData;

describe("Test api restful", () => {
  before(async () => {
    await startServer();
    request = supertest(`http://localhost:${PORT}/api/products`);
  });

  after(async () => {
    await stopServer();
  });

  describe("POST", () => {
    it("Al crear un item, deberia retornar status 201, un id y la data del item creado", async () => {
      product = generateProd();
      const response = await request.post("/").send(product);
      expect(response.status).to.eq(201);
      const newProd = response.body;
      expect(newProd).to.include.keys("id");
      prodId = newProd?.id;
      expect(newProd.title).to.eq(product.title);
      expect(Number(newProd.price)).to.eq(Number(product.price));
      expect(newProd.thumbnail).to.eq(product.thumbnail);
    });
  });

  describe("GET", () => {
    // it("",async()=>{})
    it("Al hacer un get, deberia retornar (1) status 200 y (2) un array", async () => {
      const response = await request.get("/");
      expect(response.status).to.eq(200);
      expect(Array.isArray(response.body)).to.eq(true);
    });
  });

  describe("GET /id", () => {
    it("Al hacer un get por el ID del item creado, deberia retornar (1) status 200 y (2) los datos del item creado", async () => {
      const response = await request.get(`/${prodId}`);
      expect(response.status).to.eq(200);
      const prod = response.body;
      expect(prod.title).to.eq(product.title);
      expect(Number(prod.price)).to.eq(Number(product.price));
      expect(prod.thumbnail).to.eq(product.thumbnail);
    });
  });

  describe("PUT /id", () => {
    it("Al editar el item creado, deberia retornar status 200", async () => {
      updateData = { price: 55000 };
      const response = await request.put(`/${prodId}`).send(updateData);
      expect(response.status).to.eq(200);
    });

    it("La data en el server del item editado deberia hacer match con la data enviada para editar", async () => {
      const response = await request.get(`/${prodId}`);
      const prod = response.body;
      expect(prod.price).to.eq(updateData.price);
    });
  });

  describe("DELETE", () => {
    it("Al eliminar el item, deberia retornar status 200", async () => {
      const response = await request.delete(`/${prodId}`);
      expect(response.status).to.eq(200);
    });

    it("Una vez eliminado el item, si lo busco por ID tiene que retornar un objeto vacio", async () => {
      const response = await request.get(`/${prodId}`);
      const prod = response.body;
      expect(Object.keys(prod).length).to.eq(0);
    });
  });
});

const startServer = async () => {
  httpServer.listen(PORT, () => {
    console.log("Servidor express iniciado para testeos");
  });
};

const stopServer = async () => {
  httpServer.close();
  console.log("Servidor express finalizado");
};
