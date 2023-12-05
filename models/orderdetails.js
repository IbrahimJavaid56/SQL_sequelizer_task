import { DataTypes } from 'sequelize';
import { sequelize } from '../config/DBconfig.js';



 const OrderDetail = sequelize.define('orderdetail', {
  orderNumber: {
    type: DataTypes.INTEGER,
    primaryKey: true,
  },
  productCode: {
    type: DataTypes.STRING(15)
  },
  quantityOrdered: {
    type: DataTypes.INTEGER,
  },
  priceEach: {
    type: DataTypes.DECIMAL(10, 2),
  },
  orderLineNumber: {
    type: DataTypes.SMALLINT,
    primaryKey: true,
  }
},{
  timestamps:false
} , {
  // Additional model options as needed
  tableName: 'orderdetail', // Set the table name if different from the model name
});


export  {OrderDetail};



