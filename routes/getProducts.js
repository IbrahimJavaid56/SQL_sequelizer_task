import express from 'express';
import { getProducts,downloadCsv } from '../controllers/getProductcontrollers.js';
const getProductInfoRouter = express.Router();

getProductInfoRouter.get('/getProducts/:buyPrice',getProducts);
getProductInfoRouter.post('/DownloadCsv/:uuid',downloadCsv);

export default getProductInfoRouter;
