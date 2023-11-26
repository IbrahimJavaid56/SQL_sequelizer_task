import { Sequelize } from 'sequelize';
// Replace with actual MySQL credentials
const sequelize = new Sequelize('classical', 'root', 'nustgikifast5656', {
  host: 'localhost',
  dialect: 'mysql',
  logging: false, 
});

// Test the connection
// const testConnection = async () => {
//   try {
//     await sequelize.authenticate();
//     console.log('Connection has been established successfully.');
//   } catch (error) {
//     console.error('Unable to connect to the database:', error);
//   } finally {
    
//     await sequelize.close();
//   }
// };

// testConnection();
export {sequelize};


