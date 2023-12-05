import express from 'express';
import { mergeFile } from '../controllers/mergePDF.js';

const mergePdfRouter = express.Router();

mergePdfRouter.post('/mergePDF',mergeFile);

export default mergePdfRouter;