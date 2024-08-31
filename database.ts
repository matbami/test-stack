// import { Sequelize } from "sequelize";
import { Sequelize } from "sequelize-typescript";
import User from "./models/user.model";

const sequelize = new Sequelize({
    dialect: 'mysql',
    username: 'ayo2',
    database: 'stack_overflow',
    host: 'localhost',
    port: 8889,
    password: 'J7@PfzP9_Z)GV09J',


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

  sequelize.addModels([User])




  export default sequelize