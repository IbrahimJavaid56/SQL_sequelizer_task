import { DataTypes } from 'sequelize';
import { sequelize } from '../config/DBconfig.js'; // Assuming this is the file where the Customer model is defined


 const Payment = sequelize.define('Payment', {
  customerNumber: {
    type: DataTypes.INTEGER,
    primaryKey: true,
  },
  checkNumber: {
    type: DataTypes.STRING(50),
    primaryKey: true,
  },
  paymentDate: {
    type: DataTypes.DATEONLY,
  },
  amount: {
    type: DataTypes.DECIMAL(10, 2),
  },
}, {
  // Additional model options as needed
  tableName: 'payments', // Set the table name if different from the model name
});


export  {Payment};
