import express,{json} from 'express';
import getProductInfoRouter from './routes/getProducts.js';
import invoiceRouter from './routes/invoice.js';
import mergePdfRouter from './routes/mergePDF.js';
import { syncModels } from './script.js';
import fileUpload from 'express-fileupload'
import { Customer } from './models/customers.js';
import { Payment } from './models/payments.js';
import { Order } from './models/orders.js';
import { sequelize } from './config/DBconfig.js';
import queriesByOrm from './routes/query_by_orm.js';
const app = express();
app.use(express.json());
const PORT = process.env.PORT || 3000;
syncModels();
app.use(fileUpload({
  limits:{
    fileSize: 50*1024*1024
  }
}))

app.use('/api',getProductInfoRouter);
app.use('/api',invoiceRouter);
app.use('/api',mergePdfRouter);
app.use('/query',queriesByOrm);
 // Replace with correct paths and model names


const getAveragePaymentByCityOver1000 = async () => {
  try {
    const customerPayment = await Customer.findAll({
      attributes: [
         'city',
        [sequelize.fn('AVG', sequelize.col('payments.amount')), 'Average_Amount'],
      ],
      include: [{
        model: Payment,
        attributes: [],
      }],
      group: ['city'],
      having: sequelize.literal('Average_Amount > 1000'),
    });

    return customerPayment;
  } catch (error) {
    throw error;
  }
};

app.get('/average-payment-by-city', async (req, res) => {
  try {
    const result = await getAveragePaymentByCityOver1000();
    res.json(result);
  } catch (error) {
    console.error('Error in API:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});




  app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
 });
