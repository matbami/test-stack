import express from 'express';
import authRouter from './routes/auth.route';
import questionRouter from './routes/question.route';
import answerRouter from './routes/answer.route';
import ratingRouter from './routes/rating.route';
import subscriptionRouter from './routes/subscription.route';


const app = express();

app.use(express.json());
app.use('/api/v1/auth', authRouter);
app.use('/api/v1/questions', questionRouter);
app.use('/api/v1/answers', answerRouter);
app.use('/api/v1/ratings', ratingRouter);
app.use('/api/v1/subscriptions', subscriptionRouter);

export default app;
