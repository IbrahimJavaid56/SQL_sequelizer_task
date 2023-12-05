import { DataTypes } from 'sequelize';
import { sequelize } from '../config/DBconfig.js';


const Customer = sequelize.define('Customer', {
  customerNumber: {
    type: DataTypes.INTEGER,
    primaryKey: true,
  },
  customerName: {
    type: DataTypes.STRING(50),
  },
  contactLastName: {
    type: DataTypes.STRING(50),
  },
  contactFirstName: {
    type: DataTypes.STRING(50),
  },
  phone: {
    type: DataTypes.STRING(50),
  },
  addressLine1: {
    type: DataTypes.STRING(50),
  },
  addressLine2: {
    type: DataTypes.STRING(50),
  },
  city: {
    type: DataTypes.STRING(50),
  },
  state: {
    type: DataTypes.STRING(50),
  },
  postalCode: {
    type: DataTypes.STRING(15),
  },
  country: {
    type: DataTypes.STRING(50),
  },
  salesRepEmployeeNumber: {
    type: DataTypes.INTEGER,
  },
  creditLimit: {
    type: DataTypes.DECIMAL(10, 2),
  },
},{
  timestamps:false
} ,
{
  // Additional model options as needed
  tableName: 'customers', // Set the table name if different from the model name
});


export {Customer};
