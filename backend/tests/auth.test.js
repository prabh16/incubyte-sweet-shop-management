const request = require("supertest");
const app = require("../src/app");

test("User registration works", async() => {
    const res = await request(app)
    .post("/api/auth/register")
    .send({
        email: "test@example.com",
        password: "100001",
    });

    expect(res.statusCode).toBe(201);
});


test("User registration fails when email is missing", async() =>{
    const res = await request(app)
    .post("/api/auth/register")
    .send({
        password: "100000";
    });

    expect(res.statusCode).toBe(400);
});