const request = require("supertest");
const app = require("../src/app");

test("User registration works", async() => {
    const res = (await request(app).post("/api/auth/register")).setEncoding({
        email: "test@example.com",
        password: "100001",
    });

    expect(res.statusCode).toBe(201);
});