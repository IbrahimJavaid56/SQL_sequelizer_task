import { Customer } from "../models/customers.js";
import { Order } from "../models/orders.js";
import { Payment } from "../models/payments.js";
import { Product } from "../models/products.js";
import { Employee } from "../models/employees.js";
import { ProductLine } from "../models/productlines.js";
import { OrderDetail } from "../models/orderdetails.js";
import { Office } from "../models/offices.js";
import { sequelize } from "../config/DBconfig.js";

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
const task1 = async(req,res) =>{
  try {
    const products = await Product.findAll({
      attributes: ['productName', 'productLine'],
    });

    const responseData = {
      totalRecordsFetched: products.length,
      data: products
    };

    res.json(responseData);
  } catch (error) {
    console.error('Error fetching product names and lines:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
}

const task2 = async (req, res) => {
  try {
    const customerOrderCounts = await Customer.findAll({
      attributes: [
        'customerName',
        [sequelize.fn('COUNT', sequelize.col('orders.orderNumber')), 'Total_No_Of_Orders'],
      ],
      include: [{
        model: Order,
        attributes: [],
      }],
      group: ['Customer.customerNumber'], // group by 
      order: [[sequelize.fn('COUNT', sequelize.col('orders.orderNumber')), 'DESC']], // order by
    });

    const responseData = {
      totalRecordsFetched: customerOrderCounts.length,
      data: customerOrderCounts,
    };

    res.json(responseData);
  } catch (error) {
    console.error('Error fetching customer order counts:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
};

const task3 = async (req, res) => {
  try {
    const customerPaymentTotal = await Customer.findAll({
      attributes: [
        'customerName',
        [sequelize.fn('SUM', sequelize.col('payments.amount')), 'Total_Payment'],
      ],
      include: [{
        model: Payment,
        attributes: [],
        required: false, // `required: false` for left join
        where: {
          customerNumber: sequelize.col('Customer.customerNumber'), // Join condition
        },
      }],
      group: ['Customer.customerNumber'], // Group by
    });

    const responseData = {
      totalRecordsFetched: customerPaymentTotal.length,
      data: customerPaymentTotal
    };

    res.json(responseData);
  } catch (error) {
    console.error('Error fetching customer payment totals:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
};

const task4 = async (req, res) => {
  try {
    const customerPaymentTotal = await Customer.findAll({
      attributes: [
        'customerName',
        [sequelize.fn('SUM', sequelize.col('payments.amount')), 'Total_Payment'],
      ],
      include: [{
        model: Payment,
        attributes: [],
        required: false, // `required: false` for left join
        where: {
          customerNumber: sequelize.col('Customer.customerNumber'), // Join condition
        },
      }],
      group: ['Customer.customerNumber'], // Group by
    });

    const responseData = {
      totalRecordsFetched: customerPaymentTotal.length,
      data: customerPaymentTotal
    };

    res.json(responseData);
  } catch (error) {
    console.error('Error fetching customer payment totals:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
};

const task5 = async (req, res) => {
  try {
    const employeesWithNoCus = await Employee.findAll({
      attributes: ['firstName'],
      include: [{
        model: Customer,
        attributes: [],
        required: false, // `required: false` for left join
      }],
      where: {
        '$customers.salesRepEmployeeNumber$': null,
      },
    });

    const responseData = {
      totalRecordsFetched: employeesWithNoCus.length,
      data: employeesWithNoCus
    };

    res.json(responseData);
  } catch (error) {
    console.error('Error fetching employees with no customers:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
};

const task6 = async (req, res) => {
  try {
    const customerOrderCountsWithExcludingCustomers = await Customer.findAll({
      attributes: [
        'customerName',
        [sequelize.fn('COUNT', sequelize.col('orders.orderNumber')), 'Total_No_Of_Orders'],
      ],
      include: [{
        model: Order,
        attributes: [],
        required: true
      }],
      group: ['Customer.customerNumber'], // group by
      order: [[sequelize.fn('COUNT', sequelize.col('orders.orderNumber')), 'DESC']], // order by
    });

    const responseData = {
      totalRecordsFetched: customerOrderCountsWithExcludingCustomers.length,
      data: customerOrderCountsWithExcludingCustomers
    };

    res.json(responseData);
  } catch (error) {
    console.error('Error fetching customer order counts:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
};

const task7 = async (req, res) => {
  try {
    const customerPayment = await Customer.findAll({
      attributes: [
        'customerName', 'city',
        [sequelize.fn('AVG', sequelize.col('payments.amount')), 'Average_Amount'],
      ],
      include: [{
        model: Payment,
        attributes: [], 
        required: false, // `required: false` for left join
      }],
      group: ['Customer.city'], // Group by
      having: sequelize.literal('Average_Amount > 1000')
    });

    const responseData = {
      totalRecordsFetched: customerPayment.length,
      data: customerPayment
    };
    res.json(responseData);
  } catch (error) {
    console.error('Error fetching customer payment totals:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
};
const task8 = async (req, res) => {
  try {
    const productQuantities = await Product.findAll({
      attributes: [
        'productName',
        [sequelize.fn('SUM', sequelize.col('orderdetails.quantityOrdered')), 'Total_Quantity_ordered'],
      ],
      include: [{
        model: OrderDetail,
        attributes: [],
        required: false, // `required: false` for left join
      }],
      group: ['Product.productCode', 'Product.productName'],
    });

    const responseData = {
      totalRecordsFetched: productQuantities.length,
      data: productQuantities
    };
    res.json(responseData);
  } catch (error) {
    console.error('Error fetching product quantities:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
};

const task9 = async (req, res) => {
  try {
    const employeesInUSAWithNoCustomers = await Employee.findAll({
      attributes: ['firstName'],
      include: [
        {
          model: Customer,
          attributes: [],
          required: false,//LEFT JOIN
        },
        {
          model: Office,
          attributes: [],
          required: true, // INNER JOIN
          where: {
            country: 'USA',
          },
        },
      ],
      where: {
        '$customers.salesRepEmployeeNumber$': null, // Use the correct alias for the association
      },
    });

    const responseData = {
      totalRecordsFetched: employeesInUSAWithNoCustomers.length,
      data: employeesInUSAWithNoCustomers
    };

    res.json(responseData);
  } catch (error) {
    console.error('Error fetching employees:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
};
const task10 = async (req, res) => {
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
      group: ['productName', 'productCode'], // Remove 'country' from the GROUP BY
      order: [[sequelize.literal('No_of_times_sold'), 'DESC']]
    });
    const responseData = {
      totalRecordsFetched: productOrderCounts.length,
      data: productOrderCounts
    };

    res.json(responseData);
  } catch (error) {
    console.error('Error fetching product order counts:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
};


const task12 = async (req,res) => {
    try {
        const result = await Customer.findAll({
          attributes: ['customerName'],
          include: [
            {
              model: Order,
              attributes: ['orderNumber'],
              required: true,
            },
            {
              model: Payment,
              attributes: ['amount'],
              required: true,
            },
          ],
          group: ['customerName'],
        });
    
        res.json(result);
      } catch (error) {
        console.error('Error fetching customers with orders and payments:', error);
        res.status(500).json({ error: 'Internal Server Error' });
      }
  };

 export {task1,task2,task3,task4,task5,task6,task7,task8,task9,task10,task12};
