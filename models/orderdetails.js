import { DataTypes } from 'sequelize';
import { sequelize } from '../config/DBconfig.js';



 const OrderDetail = sequelize.define('OrderDetail', {
  orderNumber: {
    type: DataTypes.INTEGER,
    primaryKey: true,
  },
  productCode: {
    type: DataTypes.STRING(15),
    primaryKey: true,
  },
  quantityOrdered: {
    type: DataTypes.INTEGER,
  },
  priceEach: {
    type: DataTypes.DECIMAL(10, 2),
  },
  orderLineNumber: {
    type: DataTypes.SMALLINT,
  }
}, {
  // Additional model options as needed
  tableName: 'orderdetails', // Set the table name if different from the model name
});


export  {OrderDetail};



