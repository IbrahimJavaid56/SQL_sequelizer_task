import express,{json} from 'express';
import getProductInfoRouter from './routes/getProducts.js';
import { getCsv,getProducts } from './controllers/getProductcontrollers.js';
import { syncModels } from './script.js';

const app = express();
app.use(express.json());
const PORT = process.env.PORT || 3000;
syncModels();

app.use('/api',getProducts);
app.use('/api',getCsv);
  // Start the server
  app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
  });
