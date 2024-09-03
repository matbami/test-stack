import request from "supertest";
import app from "../../app";
import sequelize from "../../database";

describe("Answer Routes", () => {
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

  it("POST /api/v1/answers should create a new answer", async () => {
    const question = await request(app)
      .post("/api/v1/questions")
      .set("Authorization", `Bearer ${token}`)
      .send({ title: "Test Question", body: "This is a test question." });

    const response = await request(app)
      .post("/api/v1/answers")
      .set("Authorization", `Bearer ${token}`)
      .send({
        questionId: question.body.data.id,
        body: "This is a test answer.",
      });

    expect(response.status).toBe(201);
    expect(response.body.data).toHaveProperty("id");
    expect(response.body.data.body).toBe("This is a test answer.");
  });

  it("GET /api/v1/answers/question/:questionId should retrieve answers by question", async () => {
    const question = await request(app)
      .post("/api/v1/questions")
      .set("Authorization", `Bearer ${token}`)
      .send({ title: "Test Question", body: "This is a test question." });

    const answer = await request(app)
      .post("/api/v1/answers")
      .set("Authorization", `Bearer ${token}`)
      .send({
        questionId: question.body.data.id,
        body: "This is a test answer.",
      });

    const response = await request(app)
      .get(`/api/v1/answers/question/${question.body.data.id}`)
      .set("Authorization", `Bearer ${token}`);

    expect(response.status).toBe(200);
  });

  it("PATCH /api/answers/:id should update an answer", async () => {
    const question = await request(app)
      .post("/api/v1/questions")
      .set("Authorization", `Bearer ${token}`)
      .send({ title: "Test Question", body: "This is a test question." });

    const answer = await request(app)
      .post("/api/v1/answers")
      .set("Authorization", `Bearer ${token}`)
      .send({ questionId: question.body.data.id, body: "Original bosy." });

    const response = await request(app)
      .patch(`/api/v1/answers/${answer.body.data.id}`)
      .set("Authorization", `Bearer ${token}`)
      .send({ body: "Updated body." });

    expect(response.status).toBe(200);
    expect(response.body.data.body).toBe("Updated body.");
  });

  it("DELETE /api/v1/answers/:id should delete an answer", async () => {
    const question = await request(app)
      .post("/api/v1/questions")
      .set("Authorization", `Bearer ${token}`)
      .send({ title: "Test Question", body: "This is a test question." });

    const answer = await request(app)
      .post("/api/v1/answers")
      .set("Authorization", `Bearer ${token}`)
      .send({
        questionId: question.body.data.id,
        body: "This is a test answer.",
      });

    const response = await request(app)
      .delete(`/api/v1/answers/${answer.body.data.id}`)
      .set("Authorization", `Bearer ${token}`);

    expect(response.status).toBe(200);
    expect(response.body.message).toBe("Answer deleted successfully");
  });
});
