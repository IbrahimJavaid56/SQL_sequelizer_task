import { DataTypes } from 'sequelize';
import { sequelize } from '../config/DBconfig.js';

 const Order = sequelize.define('Order', {
  orderNumber: {
    type: DataTypes.INTEGER,
    primaryKey: true,
  },
  orderDate: {
    type: DataTypes.DATEONLY,
  },
  requiredDate: {
    type: DataTypes.DATEONLY,
  },
  shippedDate: {
    type: DataTypes.DATEONLY,
  },
  status: {
    type: DataTypes.STRING(15),
  },
  comments: {
    type: DataTypes.TEXT,
  }
},{
  tableName: 'orders', // Set the table name if different from the model name
});



// Sync the model with the database (create the table if it doesn't exist)
//sequelize.sync();

export  {Order};
