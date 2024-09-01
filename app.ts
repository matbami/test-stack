import express from 'express';
import authRouter from './routes/auth.route';
import questionRouter from './routes/question.route';
import answerRouter from './routes/answer.route';


const app = express();

app.use(express.json());
app.use('/api/auth', authRouter);
app.use('/api/questions', questionRouter);
app.use('/api/answers', answerRouter);


export default app;
