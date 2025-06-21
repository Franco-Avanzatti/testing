import "dotenv/config.js";
import assert from "assert";
import dbConnect from "../../src/helpers/dbConnect.helper.js";
import mongoose from "mongoose";
import { productsManager } from "../../src/dao/manager.mongo.js";

describe("TESTING: Servicio de Productos", () => {
  let productId;

  before(async function () {
    this.timeout(5000);
    try {
      const connection = await dbConnect(process.env.LINK_DB);
    } catch (error) {
      throw error; // re-lanza para que falle el test si la conexión falla
    }
  });

  after(async () => {
    await mongoose.disconnect();
  });

  it("Se debe crear un producto correctamente", async () => {
    const response = await productsManager.createOne({
      title: "producto de prueba",
    });
    productId = response._id;
    assert.ok(response._id);
  });

  it("Se deben leer todos los productos de la base datos", async () => {
    const response = await productsManager.readAll();
    assert.ok(response.length > 0);
  });

  it("No se deben leer productos cuando el filtro no coincide", async () => {
    const response = await productsManager.readAll({ title: "aaaaaAAAA" });
    assert.strictEqual(response.length, 0);
  });

  it("Se debe leer un producto por ID", async () => {
    const response = await productsManager.readById(productId);
    assert.ok(response._id);
  });

  it("Se debe modificar un producto", async () => {
    const response = await productsManager.updateById(productId, {
      stock: 1000,
    });
    assert.strictEqual(response.stock, 1000);
  });

  it("Se debe eliminar un producto", async () => {
    await productsManager.destroyById(productId);
    const one = await productsManager.readById(productId);
    assert.strictEqual(one, null);
  });
});
