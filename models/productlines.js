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
    // Additional model options as needed
    tableName: 'productlines', // Set the table name if different from the model name
  });

//ProductLine.hasMany(Product, { foreignKey: 'productLine' });
// Sync the model with the database (create the table if it doesn't exist)
//sequelize.sync();

export  {ProductLine};
