import request from 'supertest';
import app from '../app'; // Assuming app.ts is your main Express app file
import sequelize from '../database'; // Assuming you are exporting sequelize instance from database.ts

describe('Rating Routes', () => {
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
    });


//   afterEach(async () => {
//     // Clean up database after each test
//     await sequelize.truncate({ cascade: true });
//   });

    it('POST /api/ratings should create a new rating', async () => {
        const question = await request(app)
        .post('/api/questions')
        .set('Authorization', `Bearer ${token}`)
        .send({ title: 'Test Question', body: 'This is a test question.'});

        const response = await request(app)
            .post('/api/ratings')
            .set('Authorization', `Bearer ${token}`)
            .send({
                targetId: question.body.id,
                targetType: 'question',
                value: 'upvote'
            });

        expect(response.status).toBe(200);
        expect(response.body).toHaveProperty('id');
        expect(response.body.targetId).toBe(question.body.id);
        expect(response.body.targetType).toBe('question');
        expect(response.body.value).toBe('upvote');
    });

    it('GET /api/ratings should retrieve ratings for a question or answer', async () => {
        // First, create a rating
        await request(app)
            .post('/api/ratings')
            .set('Authorization', `Bearer ${token}`)
            .send({
                targetId: 'hgg',
                targetType: 'question',
                value: 'upvote'
            });

        const response = await request(app)
            .get('/api/ratings')
            .set('Authorization', `Bearer ${token}`)
            .query({ targetId: 'hgg', targetType: 'question' });

        expect(response.status).toBe(200);
        expect(response.body.ratings).toHaveLength(1);
        expect(response.body.ratings[0].targetId).toBe('hgg');
        expect(response.body.ratings[0].targetType).toBe('question');
    });

    it('GET /api/ratings/count should retrieve rating counts', async () => {
        // First, create some ratings
        await request(app)
            .post('/api/ratings')
            .set('Authorization', `Bearer ${token}`)
            .send({
                targetId: 'hgg',
                targetType: 'question',
                value: 'upvote'
            });

        const response = await request(app)
            .get('/api/ratings/count')
            .set('Authorization', `Bearer ${token}`)
            .query({ targetId: 'hgg', targetType: 'question' });

        expect(response.status).toBe(200);
        expect(response.body.rating).toHaveProperty('upVotes');
        expect(response.body.rating).toHaveProperty('downVotes');
        expect(response.body.rating).toHaveProperty('voteNumber');
    });

    it('DELETE /api/ratings/:id should delete a rating', async () => {
        // First, create a rating
        const createResponse = await request(app)
            .post('/api/ratings')
            .set('Authorization', `Bearer ${token}`)
            .send({
                targetId: 'hggd',
                targetType: 'answer',
                value: 'upvote'
            });


        const ratingId = createResponse.body.id;



        const response = await request(app)
            .delete(`/api/ratings/${ratingId}`)
            .set('Authorization', `Bearer ${token}`);

        expect(response.status).toBe(200);
        expect(response.body.message).toBe('Rating deleted successfully');
    });
});
