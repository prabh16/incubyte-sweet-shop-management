const request = require("supertest");
const app = require("../src/app");

test("Get all sweets returns empty array initially", async () => {
  const res = await request(app).get("/api/sweets");

  expect(res.statusCode).toBe(200);
  expect(Array.isArray(res.body)).toBe(true);
  expect(res.body.length).toBe(0);
});