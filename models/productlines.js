import { DataTypes } from "sequelize";
import { sequelize } from "../config/DBconfig.js";
import { Product } from "./products.js";
 const ProductLine = sequelize.define('ProductLine', {
  productLine: {
    type: DataTypes.STRING(50),
    primaryKey: true,
  },
  textDescription: {
    type: DataTypes.STRING(4000),
  },
  htmlDescription: {
    type: DataTypes.TEXT('medium'),
  },
  image: {
    type: DataTypes.BLOB('medium'),
  },
},{
  timestamps:false
} ,{
    // Additional model options as needed
    tableName: 'productlines', // Set the table name if different from the model name
  });

export  {ProductLine};
