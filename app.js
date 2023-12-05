import express,{json} from 'express';
import getProductInfoRouter from './routes/getProducts.js';
import invoiceRouter from './routes/invoice.js';
import mergePdfRouter from './routes/mergePDF.js';
import { syncModels } from './script.js';
import fileUpload from 'express-fileupload'
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
  app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
 });
