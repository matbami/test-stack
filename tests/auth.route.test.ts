import request from 'supertest';
import app from '../app';  // Adjust the import path as needed
import sequelize from '../database';  // Import the Sequelize instance
import seedDatabase from './seedDB';

describe('Auth Routes', () => {

  

  // After all tests, close the database connection
  afterAll(async () => {
    await sequelize.close();
  });

  it('POST /api/auth/register should create a new user', async () => {
    const response = await request(app)
      .post('/api/auth/register')
      .send({ username: 'newuser1k', email: 'lztnew@example.com', password: 'newpassword' });

    expect(response.status).toBe(201);  // 201 Created is usually more appropriate for creation
    expect(response.body).toHaveProperty('user');
    expect(response.body).toHaveProperty('token');
  });

  it('POST /api/auth/login should return a token', async () => {
    // Ensure the user exists
    await request(app)
      .post('/api/auth/register')
      .send({ username: 'testuser', email: 'test@example.com', password: 'farabapassword' });

    const response = await request(app)
      .post('/api/auth/login')
      .send({ email: 'new@example.com', password: 'newpassword'  });

    expect(response.status).toBe(200);
    expect(response.body).toHaveProperty('token');
  });
});
