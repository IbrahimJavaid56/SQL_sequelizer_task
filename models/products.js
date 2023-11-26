import { DataTypes } from 'sequelize';
import { sequelize } from "../config/DBconfig.js";

 const Product = sequelize.define('Product', {
  productCode: {
    type: DataTypes.STRING(15),
    primaryKey: true,
  },
  productName: {
    type: DataTypes.STRING(70),
    allowNull: false,
  },
  productLine: {
    type: DataTypes.STRING(50),
  },
  productScale: {
    type: DataTypes.STRING(10),
  },
  productVendor: {
    type: DataTypes.STRING(50),
  },
  productDescription: {
    type: DataTypes.TEXT,
  },
  quantityInStock: {
    type: DataTypes.SMALLINT,
  },
  buyPrice: {
    type: DataTypes.DECIMAL(10, 2),
  },
  MSRP: {
    type: DataTypes.DECIMAL(10, 2),
  },
},{
    // Additional model options as needed
    tableName: 'products', // Set the table name if different from the model name
    timestamps: true
  });

export  {Product};
