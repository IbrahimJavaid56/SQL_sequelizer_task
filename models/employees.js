import { DataTypes} from 'sequelize';
import { sequelize } from '../config/DBconfig.js';

 const Employee = sequelize.define('Employee', {
  employeeNumber: {
    type: DataTypes.INTEGER,
    primaryKey: true,
  },
  lastName: {
    type: DataTypes.STRING(50),
  },
  firstName: {
    type: DataTypes.STRING(50),
  },
  extension: {
    type: DataTypes.STRING(10),
  },
  email: {
    type: DataTypes.STRING(100),
  },
  officeCode: {
    type: DataTypes.STRING(10),
  },
  reportsTo: {
    type: DataTypes.INTEGER,
  },
  jobTitle: {
    type: DataTypes.STRING(50),
  },
},{
  timestamps:false
} ,{
  // Additional model options as needed
  tableName: 'employees', // Set the table name if different from the model name
});



export  {Employee};
