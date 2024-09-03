import app from './app'
import './database'
import { errorHandler, AppError } from './helper/errorHandler';


app.use(errorHandler);

// Start the server
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});



