import request from 'supertest';
import app from '../app'; // Path to your Express app
import sequelize from '../database'; // Path to your Sequelize instance

describe('Subscription Routes', () => {
//   beforeAll(async () => {
//     await sequelize.sync({ force: true }); // Sync the database and reset the data
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

      console.log(res.body,"LOGIN RESPONSE")

    token = res.body.token;
    
  });


//   afterEach(async () => {
//     // Clean up database after each test
//     await sequelize.truncate({ cascade: true });
//   });

  it('POST /api/subscriptions should create a new subscription', async () => {
    const question = await request(app)
      .post('/api/questions')
      .set('Authorization', `Bearer ${token}`)
      .send({ title: 'Test Question', body: 'This is a test question.' });

      console.log(question.body,"QUESTIONBODY")

    const response = await request(app)
      .post('/api/subscriptions')
      .set('Authorization', `Bearer ${token}`)
      .send({ questionId: question.body.id });

    expect(response.status).toBe(200);
    expect(response.body).toHaveProperty('id');
    expect(response.body.questionId).toBe(question.body.id);
  });

  it('DELETE /api/subscriptions/:id should cancel a subscription', async () => {
    const question = await request(app)
      .post('/api/questions')
      .set('Authorization', `Bearer ${token}`)
      .send({ title: 'Test Question', body: 'This is a test question.' });

    const subscription = await request(app)
      .post('/api/subscriptions')
      .set('Authorization', `Bearer ${token}`)
      .send({ questionId: question.body.id });
      console.log(subscription.body,"SUBBODYYY")

    const response = await request(app)
      .delete(`/api/subscriptions/${subscription.body.id}`)
      .set('Authorization', `Bearer ${token}`);

    expect(response.status).toBe(200);
    expect(response.body.message).toBe('Subscription cancelled');
  });
});
