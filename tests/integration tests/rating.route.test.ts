import request from "supertest";
import app from "../../app";
import sequelize from "../../database";

describe("Rating Routes", () => {
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

  it("POST /api/ratings should create a new rating", async () => {
    const question = await request(app)
      .post("/api/v1/questions")
      .set("Authorization", `Bearer ${token}`)
      .send({ title: "Test Question", body: "This is a test question." });

    const response = await request(app)
      .post("/api/v1/ratings")
      .set("Authorization", `Bearer ${token}`)
      .send({
        targetId: question.body.data.id,
        targetType: "question",
        value: "upvote",
      });

    expect(response.status).toBe(201);
    expect(response.body.data).toHaveProperty("id");
    expect(response.body.data.targetId).toBe(question.body.data.id);
    expect(response.body.data.targetType).toBe("question");
    expect(response.body.data.value).toBe("upvote");
  });

  it("GET /api/ratings should retrieve ratings for a question or answer", async () => {
    await request(app)
      .post("/api/v1/ratings")
      .set("Authorization", `Bearer ${token}`)
      .send({
        targetId: "hgg",
        targetType: "question",
        value: "upvote",
      });

    const response = await request(app)
      .get("/api/v1/ratings")
      .set("Authorization", `Bearer ${token}`)
      .query({ targetId: "hgg", targetType: "question" });

    expect(response.status).toBe(200);
    expect(response.body.data[0].targetId).toBe("hgg");
    expect(response.body.data[0].targetType).toBe("question");
  });

  it("GET /api/ratings/count should retrieve rating counts", async () => {
    await request(app)
      .post("/api/v1/ratings")
      .set("Authorization", `Bearer ${token}`)
      .send({
        targetId: "hgg",
        targetType: "question",
        value: "upvote",
      });

    const response = await request(app)
      .get("/api/v1/ratings/count")
      .set("Authorization", `Bearer ${token}`)
      .query({ targetId: "hgg", targetType: "question" });

    expect(response.status).toBe(200);
    expect(response.body.data).toHaveProperty("upVotes");
    expect(response.body.data).toHaveProperty("downVotes");
    expect(response.body.data).toHaveProperty("voteNumber");
  });

  it("DELETE /api/ratings/:id should delete a rating", async () => {
    const createResponse = await request(app)
      .post("/api/v1/ratings")
      .set("Authorization", `Bearer ${token}`)
      .send({
        targetId: "qqqss",
        targetType: "question",
        value: "upvote",
      });

    const ratingId = createResponse.body.data.id;

    const response = await request(app)
      .delete(`/api/v1/ratings/${ratingId}`)
      .set("Authorization", `Bearer ${token}`);

    expect(response.status).toBe(200);
    expect(response.body.message).toBe("Rating deleted successfully");
  });
});
