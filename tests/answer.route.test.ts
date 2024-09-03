import request from 'supertest';
import app from '../app'; // Path to your Express app
import sequelize from '../database'; // Path to your Sequelize instance

describe('Answer Routes', () => {
//   beforeAll(async () => {
//     await sequelize.truncate({ cascade: true });
//   });

  afterAll(async () => {
    await sequelize.close(); // Close the database connection after all tests
  });

  let token: string;

  beforeEach(async () => {
    // Register and login a user to get a token
    await request(app)
      .post('/api/auth/register')
      .send({ username: 'testuser', email: 'test@example.com', password: 'password' });

    const res = await request(app)
      .post('/api/auth/login')
      .send({ email: 'test@example.com', password: 'password' });

    token = res.body.token;
   
  });


//   afterEach(async () => {
//     // Clean up database after each test
//     await sequelize.truncate({ cascade: true });
//   });

  it('POST /api/answers should create a new answer', async () => {
    const question = await request(app)
      .post('/api/questions')
      .set('Authorization', `Bearer ${token}`)
      .send({ title: 'Test Question', body: 'This is a test question.' });

    const response = await request(app)
      .post('/api/answers')
      .set('Authorization', `Bearer ${token}`)
      .send({ questionId: question.body.id, body: 'This is a test answer.' });

    expect(response.status).toBe(200);
    expect(response.body).toHaveProperty('id');
    expect(response.body.body).toBe('This is a test answer.');
  });

  it('GET /api/answers/question/:questionId should retrieve answers by question', async () => {
    const question = await request(app)
      .post('/api/questions')
      .send({ title: 'Test Question', body: 'This is a test question.' });

    const answer = await request(app)
      .post('/api/answers')
      .set('Authorization', `Bearer ${token}`)
      .send({ questionId: question.body.id, body: 'This is a test answer.' });

    const response = await request(app)
      .get(`/api/answers/question/${question.body.id}`)
      .set('Authorization', `Bearer ${token}`);

    expect(response.status).toBe(200);

  });

  it('PATCH /api/answers/:id should update an answer', async () => {
    const question = await request(app)
      .post('/api/questions')
      .set('Authorization', `Bearer ${token}`)
      .send({ title: 'Test Question', body: 'This is a test question.' });

    const answer = await request(app)
      .post('/api/answers')
      .set('Authorization', `Bearer ${token}`)
      .send({ questionId: question.body.id, body: 'Original content.' });

    const response = await request(app)
      .patch(`/api/answers/${answer.body.id}`)
      .set('Authorization', `Bearer ${token}`)
      .send({ body: 'Updated content.' });

    expect(response.status).toBe(200);
    expect(response.body.answer.body).toBe('Updated content.');
  });

  it('DELETE /api/answers/:id should delete an answer', async () => {
    const question = await request(app)
      .post('/api/questions')
      .set('Authorization', `Bearer ${token}`)
      .send({ title: 'Test Question', body: 'This is a test question.' });

    const answer = await request(app)
      .post('/api/answers')
      .set('Authorization', `Bearer ${token}`)
      .send({ questionId: question.body.id, body: 'This is a test answer.' });

    const response = await request(app)
      .delete(`/api/answers/${answer.body.id}`)
      .set('Authorization', `Bearer ${token}`);

    expect(response.status).toBe(200);
    expect(response.body.message).toBe('Answer deleted successfully');
  });
});





