import { Op } from 'sequelize';
import { Product } from '../models/products.js';
import { createObjectCsvWriter } from 'csv-writer';
import { v4 as uuidv4 } from 'uuid';
import { DownloadQueue } from '../utils/queueProcess.js';

const getProducts = async function (req, res) {
  try {
    const buyPrice = req.params.buyPrice;
    console.log(buyPrice);

    // Validate if buyPrice is provided and is a valid number
    if (!buyPrice || isNaN(parseFloat(buyPrice))) {
      return res.status(400).json({ error: 'Invalid buyPrice provided in the URL' });
    }

    const productDetails = await Product.findAll({
      attributes: { exclude: ['createdAt', 'updatedAt'] },
      where: {
        buyPrice: {
          [Op.gt]: parseFloat(buyPrice),
        },
      },
    });

    const filename = `uploads/products_${uuidv4()}.csv`;

    const csvWriter = createObjectCsvWriter({
      path: filename,
      header: [
        { id: 'productCode', title: 'Product Code' },
        { id: 'productName', title: 'Product Name' },
        { id: 'productScale', title: 'Product Scale' },
        { id: 'productVendor', title: 'Product Vendor' },
        { id: 'productDescription', title: 'Product Description' },
        { id: 'quantityInStock', title: 'Quantity In Stock' },
        { id: 'buyPrice', title: 'Buy Price' },
        { id: 'MSRP', title: 'MSRP' },
      ],
    });

    csvWriter
      .writeRecords(productDetails)
      .then(() => {
        res.json({
          message: `CSV file ${filename} has been written successfully`,
          filename: filename,
        });
      })
      .catch((error) => {
        console.error('Error writing CSV file:', error);
        res.status(500).json({ error: 'Internal Server Error' });
      });
  } catch (error) {
    console.error('Error fetching products:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
};
async function downloadCsv(req, res) {
  try {
    const fileName = req.params.uuid;
    await DownloadQueue.add({ fileName });
    res.json({
      message: "File download process successfully",
    });
  } catch (error) {
    console.error('Error initiating download process:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
}
export { getProducts,downloadCsv };
