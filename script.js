import { sequelize } from './config/DBconfig.js';
import {OrderDetail} from './models/orderdetails.js';
import {Order} from './models/orders.js';
import {Product} from './models/products.js';
import {ProductLine} from './models/productlines.js';
import { Customer } from './models/customers.js';
import { Payment } from './models/payments.js';
import { Employee } from './models/employees.js';
import { Office } from './models/offices.js';

// Define associations

ProductLine.hasMany(Product, { foreignKey: "productLine" });
Product.belongsTo(ProductLine, { foreignKey: "productLine" });
//Product.hasMany(OrderDetail, { foreignKey: "productCode" });
//OrderDetail.belongsTo(Product, { foreignKey: "productCode" });
//Order.hasMany(OrderDetail, { foreignKey: "orderNumber" });
//OrderDetail.belongsTo(Order, { foreignKey: "orderNumber" });
Employee.hasMany(Customer, { foreignKey: "salesRepEmployeeNumber" });
Customer.belongsTo(Employee, { foreignKey: "salesRepEmployeeNumber" });
Office.hasMany(Employee, { foreignKey: "officeCode" });
Employee.belongsTo(Office, { foreignKey: "officeCode" });
Customer.hasMany(Order, { foreignKey: "customerNumber" });
Order.belongsTo(Customer, { foreignKey: "customerNumber" });
//Customer.hasMany(Payment, { foreignKey: "customerNumber" });
//Payment.belongsTo(Customer, { foreignKey: "customerNumber" });


// Sync all models with the database (create tables if they don't exist)
async function syncModels() {
    try {
      // Open the connection
      await sequelize.authenticate();
      console.log('Connection has been established successfully.');
      // Sync models
      await sequelize.sync(); // Adjust the options as needed
      console.log('Models synchronized with the database.');
    } catch (error) {
      console.error('Error syncing models with the database:', error);
    }
  }

//syncModels();
export {syncModels};