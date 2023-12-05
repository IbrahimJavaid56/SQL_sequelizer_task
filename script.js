import { sequelize } from './config/DBconfig.js';
import {OrderDetail} from './models/orderdetails.js';
import {Order} from './models/orders.js';
import {Product} from './models/products.js';
import {ProductLine} from './models/productlines.js';
import { Customer } from './models/customers.js';
import { Payment } from './models/payments.js';
import { Employee } from './models/employees.js';
import { Office } from './models/offices.js';

//relationships
ProductLine.hasMany(Product, { foreignKey: "productLine" });
Product.belongsTo(ProductLine, { foreignKey: "productLine" });
Product.hasMany(OrderDetail, { foreignKey: "productCode" });
OrderDetail.belongsTo(Product, { foreignKey: "productCode" });
Order.hasMany(OrderDetail, { foreignKey: "orderNumber" });
OrderDetail.belongsTo(Order, { foreignKey: "orderNumber" });
Customer.belongsTo(Employee, { foreignKey: "salesRepEmployeeNumber" });
Employee.hasMany(Customer, { foreignKey: "salesRepEmployeeNumber", as: 'Customers' });
Customer.hasMany(Payment, { foreignKey: "customerNumber" });
Payment.belongsTo(Customer, { foreignKey: "customerNumber" });
Customer.hasMany(Order, { foreignKey: "customerNumber" });
Order.belongsTo(Customer, { foreignKey: "customerNumber" });
Employee.belongsTo(Office, { foreignKey: "officeCode" });
Office.hasMany(Employee, { foreignKey: "officeCode" });
Order.hasMany(ProductLine, { foreignKey: 'orderId' });
ProductLine.belongsTo(Order, { foreignKey: 'orderId' });

async function syncModels() {
    try {
      // Open the connection
      await sequelize.authenticate();
      console.log('Connection has been established successfully.');
      // Sync models
      await sequelize.sync();
      console.log('Models synchronized with the database.');
    } catch (error) {
      console.error('Error syncing models with the database:', error);
    }
  }

export {syncModels};