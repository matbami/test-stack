// import { Sequelize } from "sequelize";



// console.log(`Loaded DB_DATABASE: ${process.env.DB_DATABASE}`);
// console.log(`Loaded from file: ${envFile}`);

// console.log(`NODE_ENV: ${process.env.NODE_ENV}`);
import { Sequelize } from "sequelize-typescript";
import User from "./models/user.model";
import Question from "./models/question.model";
import Answer from "./models/answer.model";
import Rating from "./models/rating.model";
import Subscription from "./models/subscription.model";
import dotenv from 'dotenv';
const envFile = process.env.NODE_ENV === 'test' ? '.env.test' : '.env';
console.log(`Loading environment variables from ${envFile}`);
dotenv.config({ path: envFile });


// dotenv.config();




const sequelize = new Sequelize({
    dialect: 'mysql',
    username: process.env.DB_USERNAME,
    database: process.env.DB_DATABASE,
    host: process.env.DB_HOST,
    port: parseInt(process.env.DB_PORT),
    password: process.env.DB_PASSWORD,


  });



  (async () => {
    try {
      await sequelize.authenticate();
      console.log('Connection has been established successfully.');
    } catch (error) {
        console.log(error)
      console.error('Unable to connect to the database:', error);
    }
  })();

  sequelize.addModels([User,Question, Answer,Rating, Subscription])




  export default sequelize