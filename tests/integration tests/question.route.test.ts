import request from "supertest";
import app from "../../app";
import sequelize from "../../database";

describe("Question Routes", () => {
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

  it("POST /api/v1/questions should create a new question", async () => {
    const response = await request(app)
      .post("/api/v1/questions")
      .set("Authorization", `Bearer ${token}`)
      .send({ title: "Test Question", body: "This is a test question." });

    expect(response.status).toBe(201);
    expect(response.body).toHaveProperty("data");
    expect(response.body.data.title).toBe("Test Question");
  });

  it("GET /api/v1/questions/:id should retrieve a specific question", async () => {
    const question = await request(app)
      .post("/api/v1/questions")
      .set("Authorization", `Bearer ${token}`)
      .send({ title: "Test Question", body: "This is a flesh question." });

    const response = await request(app)
      .get(`/api/v1/questions/${question.body.data.id}`)
      .set("Authorization", `Bearer ${token}`);

    expect(response.status).toBe(200);
    expect(response.body.data.title).toBe("Test Question");
  });

  it("GET /api/question should retrieve all questions", async () => {
    const response = await request(app)
      .get("/api/v1/questions")
      .set("Authorization", `Bearer ${token}`);

    expect(response.status).toBe(200);
    expect(response.body.data.questions.length).toBeGreaterThan(0);
  });

  it("PATCH /api/question/:id should update a question", async () => {
   
    const question = await request(app)
      .post("/api/v1/questions")
      .set("Authorization", `Bearer ${token}`)
      .send({ title: "Original Title", body: "Original content." });

    const response = await request(app)
      .patch(`/api/v1/questions/${question.body.data.id}`)
      .set("Authorization", `Bearer ${token}`)
      .send({ title: "Updated Title" });

    expect(response.status).toBe(200);
    expect(response.body.data.title).toBe("Updated Title");
  });

  it("DELETE /api/v1/question/:id should delete a question", async () => {
    const question = await request(app)
      .post("/api/v1/questions")
      .set("Authorization", `Bearer ${token}`)
      .send({ title: "Test Question", body: "This is a test question." });

    const response = await request(app)
      .delete(`/api/v1/questions/${question.body.data.id}`)
      .set("Authorization", `Bearer ${token}`);

    expect(response.status).toBe(200);
    expect(response.body.message).toBe("Question deleted successfully");
  });
});
