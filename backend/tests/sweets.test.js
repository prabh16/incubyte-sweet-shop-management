const request = require("supertest");
const app = require("../src/app");
const db = require("../src/db/sqlite");

let token;

beforeAll(async () => {
  const res = await request(app)
    .post("/api/auth/login")
    .send({
      email: "test@test.com",
      password: "123456",
    });

  token = res.body.token;
});

beforeEach(() => {
  db.prepare("DELETE FROM sweets").run();
});

test("Get all sweets returns empty array initially", async () => {
  const res = await request(app)
    .get("/api/sweets")
    .set("Authorization", `Bearer ${token}`);

  expect(res.statusCode).toBe(200);
  expect(Array.isArray(res.body)).toBe(true);
  expect(res.body.length).toBe(0);
});

test("Add a sweet returns 201", async () => {
  const res = await request(app)
    .post("/api/sweets")
    .set("Authorization", `Bearer ${token}`)
    .send({
      name: "Ladoo",
      price: 10,
    });

  expect(res.statusCode).toBe(201);
});

test("Add sweet fails when name is missing", async () => {
  const res = await request(app)
    .post("/api/sweets")
    .set("Authorization", `Bearer ${token}`)
    .send({
      price: 10,
    });

  expect(res.statusCode).toBe(400);
});

test("Add sweet fails when price is missing", async () => {
  const res = await request(app)
    .post("/api/sweets")
    .set("Authorization", `Bearer ${token}`)
    .send({
      name: "Jalebi",
    });

  expect(res.statusCode).toBe(400);
});
