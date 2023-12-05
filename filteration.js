import { Op } from 'sequelize';
import { v4 } from 'uuid';
import { Product } from './models'; // Assuming you have a Product model defined
import { createObjectCsvWriter as createCsvWriter } from 'csv-writer';
import { resolve } from 'path';

app.get("/api/getProducts", async (req, res) => {
  try {
    // Define filters based on query parameters
    const filters = {
      productLine: req.query.productLine,
      priceRange: req.query.priceRange,
      keyword: req.query.keyword
    };

    // Build the where clause for Sequelize based on filters
    const whereClause = {};
    if (filters.productLine) {
      whereClause.productLine = filters.productLine;
    }
    if (filters.priceRange) {
      // Split the price range into min and max values
      const [minPrice, maxPrice] = filters.priceRange.split('-').map(Number);
      // Add a condition for the price range
      whereClause.buyPrice = {
        [Op.between]: [minPrice, maxPrice],
      };
    }

    // Add advanced keyword search
    if (filters.keyword) {
      whereClause[Op.or] = [
        { productName: { [Op.like]: `%${filters.keyword}%` } },
        { productLine: { [Op.like]: `%${filters.keyword}%` } },
        { productDescription: { [Op.like]: `%${filters.keyword}%` } },
        { productVendor: { [Op.like]: `%${filters.keyword}%` } },
      ];
    }

    // Query the database to get filtered records
    const records = await Product.findAll({
      where: whereClause,
    });

    // Remove duplicate records based on productCode
    const uniqueRecords = Array.from(new Map(records.map((record) => [record.productCode, record])).values());

    // Generate a unique file name using UUID
    const fileName = `uploads/excel-${v4()}.csv`;

    // Set up CSV writer with headers
    const csvWriter = createCsvWriter({
      path: fileName,
      header: [
        { id: 'productCode', title: 'Product Code' },
        { id: 'productName', title: 'Product Name' },
        { id: 'productLine', title: 'Product Line' },
        { id: 'productScale', title: 'Product Scale' },
        { id: 'productVendor', title: 'Product Vendor' },
        { id: 'productDescription', title: 'Product Description' },
        { id: 'quantityInStock', title: 'Quantity In Stock' },
        { id: 'buyPrice', title: 'Buy Price' },
        { id: 'MSRP', title: 'MSRP' },
      ],
      append: false,
    });

    // Write records to the CSV file
    await csvWriter.writeRecords(uniqueRecords.map(record => record.toJSON()));

    // Respond with the CSV file as a download
    res.status(200).sendFile(resolve(fileName), (err) => {
      if (err) {
        console.error(err);
        res.status(500).send('Internal Server Error');
      }
    });
  } catch (error) {
    console.error(error);
    res.status(500).send('Internal Server Error');
  }
});