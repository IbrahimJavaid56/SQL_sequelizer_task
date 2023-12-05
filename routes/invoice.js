import express from 'express';
import { getInvoice } from '../controllers/invoice.js';
const invoiceRouter = express.Router();

invoiceRouter.post('/getInvoice/:orderNumber',getInvoice);

export default invoiceRouter;