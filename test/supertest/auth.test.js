import "../../src/helpers/env.js";
import { connect, disconnect } from "mongoose";
import app from "../../src/app.js";
import { expect } from "chai";
import supertest from "supertest";
import jwt from "jsonwebtoken";

const requester = supertest(app);

describe("TESTING: Rutas de Auth/Users", function () {
  this.timeout(10000);

  const user = {
    email: `test_${Date.now()}@test.com`,
    password: "12345678",
    role: "ADMIN"
  };

  let cookies;  // <--- Declaradas aquí, globales para todo el describe
  let userId;

  before(async () => {
    await connect(process.env.LINK_DB);
  });

  after(async () => {
    await disconnect();
  });

  it("POST /api/auth/register crea un usuario no registrado", async () => {
    const response = await requester.post("/api/auth/register").send(user);
    const { status, body } = response;
    expect(status).to.equal(201);
    expect(body.response).to.have.property("_id");
  });

  it("POST /api/auth/register error 401 al registrar un usuario ya registrado", async () => {
    const response = await requester.post("/api/auth/register").send(user);
    const { status, body } = response;

    expect(status).to.equal(401);
    expect(body.error).to.equal("Invalid credentials");
  });

  it("POST /api/auth/login tiene éxito el inicio de sesión", async () => {
    const response = await requester.post("/api/auth/login").send(user);
    const { status, headers, body } = response;

    expect(status).to.equal(200);
    cookies = headers["set-cookie"];  // asignación a la variable global
    expect(cookies).to.be.an("array").that.is.not.empty;

    const token = cookies[0].split(";")[0].split("=")[1];
    const decoded = jwt.decode(token);
    userId = decoded.user_id;  // asignación a la variable global
  });

  it("POST /api/auth/login devuelve el mensaje correcto en la propiedad message", async () => {
    const response = await requester.post("/api/auth/login").send(user);
    const { body } = response;

    expect(body).to.have.property("message", "Logged in");
  });

  it("PUT /api/users/:uid tiene éxito el update", async () => {
    const response = await requester
      .put(`/api/users/${userId}`)  // usa la variable global
      .set("Cookie", cookies)
      .send({ name: "Luciano" });

    expect(response.status).to.equal(200);
  });

  it("DELETE /api/users/:uid tiene éxito el destroy", async () => {
    const response = await requester
      .delete(`/api/users/${userId}`)
      .set("Cookie", cookies);
    expect(response.status).to.equal(200);
  });

  it("POST /api/auth/logout tiene éxito", async () => {
    const response = await requester
      .post("/api/auth/logout")
      .set("Cookie", cookies);

    expect(response.status).to.equal(200);
    expect(response.body.message).to.equal("Logout success");
  });
});
