import express from 'express';
import { task1, task10, task12, task2, task3, task4, task5, task6, task7, task8, task9 } from '../controllers/queries_controllers_func.js';
const queriesByOrm = express.Router();

queriesByOrm.get('/getProductNamesAndLines',task1);
queriesByOrm.get('/getCustomerOrderCounts',task2);
queriesByOrm.get('/getCustomersPaymentTotal',task3);
queriesByOrm.get('/getProductOrderCounts',task4);
queriesByOrm.get('/employeesWithNoCustomers',task5);
queriesByOrm.get('/cusOrderExcludeCusWithNoOrder',task6);
queriesByOrm.get('/getAveragePaymentByCityOver1000',task7);
queriesByOrm.get('/getProductQuantityOrdered',task8);
queriesByOrm.get('/employeesWithNoCustomersAndInUSA',task9);
queriesByOrm.get('/getProductOrderCountsForUSACustomers',task10);

queriesByOrm.get('/customers-with-orders-and-payments',task12);

export default queriesByOrm;