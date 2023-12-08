import { Sequelize } from 'sequelize';
const sequelize = new Sequelize('classicalDB','root','',{
  dialect: 'mysql',
  logging: false, 
});
export {sequelize};

// const limiter = rateLimit({
//   windowMs: 60 * 1000, // one minute
//   max: 10, // max 10 requests
//   message: "Too many request(s) from this IP, Please try again later",
// });
// // global rate limiter middlware for all routes
// app.use(limiter);

// const rateLimit = require("express-rate-limit");