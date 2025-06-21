import { expect } from "chai";
import supertest from "supertest";
import mongoose from "mongoose";
import dotenv from "dotenv";
import app from "../../src/app.js";

// Cargar variables desde .env.test (o .env.dev si no hay modo definido)
dotenv.config({ path: `.env.${process.env.MODE || "test"}` });

let agent;
let productId;

describe("Productos Router", function () {
  this.timeout(15000); // Por conexión + operaciones

  const adminUser = {
    email: `test_${Date.now()}@test.com`,
    password: "12345678",
    role: "ADMIN"
  };

  before(async () => {
    try {
      await mongoose.connect(process.env.LINK_DB, { dbName: "test" });
    } catch (error) {
      throw error;
    }

    agent = supertest.agent(app);

    const registerRes = await agent.post("/api/auth/register").send(adminUser);

    if (registerRes.status !== 201 && registerRes.status !== 200) {
      throw new Error("Registro fallido");
    }
    const res = await agent.post("/api/auth/login").send(adminUser);

    if (res.status !== 200) {
      throw new Error("Login fallido");
    }
  });

  after(async () => {
    await mongoose.disconnect();
    
  });

  it("Debe crear un producto (rol ADMIN)", async () => {
    const newProduct = {
      title: "Producto test",
      description: "Descripción",
      price: 10,
      stock: 5,
      category: "Tablets"
    };

    const res = await agent.post("/api/products").send(newProduct);
    expect(res.status).to.equal(201);
    expect(res.body.response).to.have.property("_id");

    productId = res.body.response._id;
  });

  it("Debe leer todos los productos (público)", async () => {
    const res = await agent.get("/api/products");
    expect(res.status).to.equal(200);
    expect(res.body.response).to.be.an("array");
  });

  it("Debe actualizar producto (rol ADMIN)", async () => {
    const update = { price: 15 };
    const res = await agent.put(`/api/products/${productId}`).send(update);

    expect(res.status).to.equal(200);
    expect(res.body.response.price).to.equal(15);
  });

  it("Debe eliminar producto (rol ADMIN)", async () => {
    const res = await agent.delete(`/api/products/${productId}`);
    expect(res.status).to.equal(200);
  });
});
