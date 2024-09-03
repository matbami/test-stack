import request from "supertest";
import app from "../../app";
import sequelize from "../../database";

describe("Subscription Routes", () => {
  afterAll(async () => {
    await sequelize.close();
  });

  let token: string;

  beforeEach(async () => {
    await request(app).post("/api/v1/auth/register").send({
      username: "testuser",
      email: "test@example.com",
      password: "password",
    });

    const res = await request(app)
      .post("/api/v1/auth/login")
      .send({ email: "test@example.com", password: "password" });

    token = res.body.data.token;
  });

  it("POST /api/subscriptions should create a new subscription", async () => {
    const question = await request(app)
      .post("/api/v1/questions")
      .set("Authorization", `Bearer ${token}`)
      .send({ title: "Test Question", body: "This is a test question." });

    const response = await request(app)
      .post("/api/v1/subscriptions")
      .set("Authorization", `Bearer ${token}`)
      .send({ questionId: question.body.data.id });

    expect(response.status).toBe(201);
    expect(response.body.data).toHaveProperty("id");
    expect(response.body.data.questionId).toBe(question.body.data.id);
  });

  it("DELETE /api/subscriptions/:id should cancel a subscription", async () => {
    const question = await request(app)
      .post("/api/v1/questions")
      .set("Authorization", `Bearer ${token}`)
      .send({ title: "Test Question", body: "This is a test question." });

    const subscription = await request(app)
      .post("/api/v1/subscriptions")
      .set("Authorization", `Bearer ${token}`)
      .send({ questionId: question.body.data.id });

    const response = await request(app)
      .delete(`/api/v1/subscriptions/${subscription.body.data.id}`)
      .set("Authorization", `Bearer ${token}`);

    expect(response.status).toBe(200);
    expect(response.body.message).toBe("Subscription cancelled successfully");
  });
});
