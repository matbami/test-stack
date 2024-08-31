import app from './app'
import express, { Request, Response, NextFunction } from 'express';
import './database'
import { errorHandler, AppError } from './helper/errorHandler';


// Example route
// app.get('/', (req, res) => {
//   res.send('Hello World!');
// });

// Example route that throws an error
// app.get('/', (req: Request, res: Response, next: NextFunction) => {
//     try {
//         throw new AppError('This is an error!', 400);
//     } catch (err) {
//         next(err); // Pass the error to the global error handler
//     }
// });

app.use(errorHandler);

// Start the server
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});



