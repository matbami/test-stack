import request from "supertest";
import app from "../../app";
import sequelize from "../../database";


describe("Auth Routes", () => {

  afterAll(async () => {
    await sequelize.close();
  });


  it("POST /api/v1/auth/register should create a new user", async () => {
    const email = `lztnpew+${Date.now()}@example.com`;
    const username = `User${Date.now()}`;
    const response = await request(app).post("/api/v1/auth/register").send({
      username,
      email,
      password: "newpassword",
    });

    expect(response.status).toBe(201);
    expect(response.body.data).toHaveProperty("user");
    expect(response.body.data).toHaveProperty("token");
  });

  it("POST /api/auth/login should return a token", async () => {
    await request(app).post("/api/v1/auth/register").send({
      username: "testuser",
      email: "test@example.com",
      password: "farabapassword",
    });

    const response = await request(app)
      .post("/api/v1/auth/login")
      .send({ email: "new@example.com", password: "newpassword" });

    expect(response.status).toBe(200);
    expect(response.body.data).toHaveProperty("token");
  });
});
