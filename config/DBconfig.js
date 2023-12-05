import { Sequelize } from 'sequelize';
const sequelize = new Sequelize('classicalDB','root','',{
  dialect: 'mysql',
  logging: false, 
});
export {sequelize};