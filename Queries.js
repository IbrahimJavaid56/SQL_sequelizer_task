import express from 'express';
import { sequelize } from './config/DBconfig.js';
import {OrderDetail} from './models/orderdetails.js';
import {Order} from './models/orders.js';
import {Product} from './models/products.js';
import {ProductLine} from './models/productlines.js';
import { Customer } from './models/customers.js';
import { Payment } from './models/payments.js';
import { Employee } from './models/employees.js';
import { Office } from './models/offices.js';
import { syncModels } from './script.js';
const app = express();
app.use(express.json());
const PORT = process.env.PORT || 3000;

//relationships
ProductLine.hasMany(Product, { foreignKey: "productLine" });
Product.belongsTo(ProductLine, { foreignKey: "productLine" });
Product.hasMany(OrderDetail, { foreignKey: "productCode" });
OrderDetail.belongsTo(Product, { foreignKey: "productCode" });
Order.hasMany(OrderDetail, { foreignKey: "orderNumber" });
OrderDetail.belongsTo(Order, { foreignKey: "orderNumber" });
Customer.belongsTo(Employee, { foreignKey: "salesRepEmployeeNumber" });
//Employee.hasMany(Customer, { foreignKey: "salesRepEmployeeNumber", as: 'Customers' });
Employee.hasMany(Customer, { foreignKey: "salesRepEmployeeNumber" });
Customer.hasMany(Payment, { foreignKey: "customerNumber" });
Payment.belongsTo(Customer, { foreignKey: "customerNumber" });
Customer.hasMany(Order, { foreignKey: "customerNumber" });
Order.belongsTo(Customer, { foreignKey: "customerNumber" });
Employee.belongsTo(Office, { foreignKey: "officeCode" });
Office.hasMany(Employee, { foreignKey: "officeCode" });
// Order.hasMany(ProductLine, { foreignKey: 'orderId' });
// ProductLine.belongsTo(Order, { foreignKey: 'orderId' });

syncModels();

//Query 10 function code
const getProductOrderCountsForUSACustomers = async (req, res) => {
  try {
    const productOrderCounts = await Product.findAll({
      attributes: [
        'productName',
        [sequelize.fn('COUNT', sequelize.col('orderdetails.orderNumber')), 'No_of_times_sold'],
      ],
      include: [
        {
          model: OrderDetail,
          attributes: [],
          required: true,
          include: [
            {
              model: Order,
              attributes: [],
              required: true,
              include: [
                {
                  model: Customer,
                  attributes: [],
                  required: true,
                  where: {
                    country: 'USA'
                  },
                },
              ],
            },
          ],
        },
      ],
      group: ['productName', 'productCode','country'],
      order: [[sequelize.literal('No_of_times_sold'),'DESC']] // Include the alias in the GROUP BY
    });
    console.table(productOrderCounts);
  } catch (error) {
    console.error('Error fetching product order counts:', error);
  }
};

const totalRevenueForEachProductLine = async (req, res) => {
  try {
      const result = await ProductLine.findAll({
          attributes: ['productLine',
          [[sequelize.fn('SUM', sequelize.literal('orderdetails.quantityOrdered * orderdetails.priceEach')), 'Total_revenue_Generated']]
          ],
          include: [
              {
                  model: Product,
                  attributes: [],
                  required: true,
                  include: [
                    {
                          model: OrderDetail,
                          attributes: [],
                          required: true,
                    }

                  ]
              }
          ],
          group:['productLine']
      });

  console.table(result);
  } catch (error) {
      console.error('Error fetching employees:', error);
  }
};

//totalRevenueForEachProductLine();
const getCustomersWithOrdersAndPayments = async (req, res) => {
  try {
      const result = await Customer.findAll({
          attributes: ['customerName']
          ,
          include: [
              {
                  model: Order,
                  attributes: ['orderNumber'],
                  required: true,
              }
              ,
              {
                  model: Payment,
                  attributes: ['amount','amount'],
                  required: true,
              }
          ],
          group:['customerName']
      });

  console.table(result);
  } catch (error) {
      console.error('Error fetching employees:', error);
  }
};

  app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
 });