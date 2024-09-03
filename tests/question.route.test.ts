import request from 'supertest';
import app from '../app'; // Assuming app.ts is your main Express app file
import sequelize from '../database'; // Assuming you are exporting sequelize instance from database.ts

describe('Question Routes', () => {
    // beforeAll(async () => {
    //     await sequelize.sync({ force: true }); // Sync the database and reset the data
    // });

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
        console.log("TOKEN",token)
    });

//   afterEach(async () => {
//     // Clean up database after each test
//     await sequelize.truncate({ cascade: true });
//   });

    it('POST /api/questions should create a new question', async () => {
        const response = await request(app)
            .post('/api/questions')
            .set('Authorization', `Bearer ${token}`)
            .send({ title: 'Test Question', body: 'This is a test question.'});

        expect(response.status).toBe(200);
        expect(response.body).toHaveProperty('id');
        expect(response.body.title).toBe('Test Question');
    });

    it('GET /api/questions/:id should retrieve a specific question', async () => {
        // First, create a question
        const question = await request(app)
            .post('/api/questions')
            .set('Authorization', `Bearer ${token}`)
            .send({ title: 'Test Question', body: 'This is a flesh question.' });

        const response = await request(app)
            .get(`/api/questions/${question.body.id}`)
            .set('Authorization', `Bearer ${token}`);

        expect(response.status).toBe(200);
        expect(response.body.question.title).toBe('Test Question');
    });

    it('GET /api/question should retrieve all questions', async () => {
        const response = await request(app)
            .get('/api/questions')
            .set('Authorization', `Bearer ${token}`);

        expect(response.status).toBe(200);
        expect(response.body.data.questions.length).toBeGreaterThan(0);
    });

    it('PATCH /api/question/:id should update a question', async () => {
        // First, create a question
        const question = await request(app)
            .post('/api/questions')
            .set('Authorization', `Bearer ${token}`)
            .send({ title: 'Original Title', body: 'Original content.' });

        const response = await request(app)
            .patch(`/api/questions/${question.body.id}`)
            .set('Authorization', `Bearer ${token}`)
            .send({ title: 'Updated Title' });

        expect(response.status).toBe(200);
        expect(response.body.question.title).toBe('Updated Title');
    });

    it('DELETE /api/question/:id should delete a question', async () => {
        // First, create a question
        const question = await request(app)
            .post('/api/questions')
            .set('Authorization', `Bearer ${token}`)
            .send({ title: 'Test Question', body: 'This is a test question.' });
            console.log(token,"TTTTTT")

        const response = await request(app)
            .delete(`/api/questions/${question.body.id}`)
            .set('Authorization', `Bearer ${token}`);

        expect(response.status).toBe(200);
        expect(response.body.message).toBe('Question deleted successfully');
    });
});
