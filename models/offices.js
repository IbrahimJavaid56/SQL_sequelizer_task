import { DataTypes } from 'sequelize';
import { sequelize } from '../config/DBconfig.js';


 const Office = sequelize.define('Office', {
  officeCode: {
    type: DataTypes.STRING(10),
    primaryKey: true,
  },
  city: {
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
  state: {
    type: DataTypes.STRING(50),
  },
  country: {
    type: DataTypes.STRING(50),
  },
  postalCode: {
    type: DataTypes.STRING(15),
  },
  territory: {
    type: DataTypes.STRING(10),
  },
},{
  timestamps:false
} ,{
  // Additional model options as needed
  tableName: 'offices', // Set the table name if different from the model name
});

//sequelize.sync();

export  {Office};
