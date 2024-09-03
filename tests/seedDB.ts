import sequelize from '../database';  // Import the Sequelize instance
import User from '../models/user.model';  // Adjust import based on your project structure

const seedDatabase = async () => {
  await sequelize.sync({ force: true }); // Ensure the database is in the right state
  
  // Seed Users
  await User.create({
    username: 'testuser',
    email: 'test@example.com',
    password: 'password',
  });

  // Add more seeding logic if needed
};

export default seedDatabase;
