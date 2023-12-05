import {Customer} from '../models/customers.js';
import {Order} from '../models/orders.js';
import {OrderDetail} from '../models/orderdetails.js';
import {Payment} from '../models/payments.js';
import {Employee} from '../models/employees.js';
import {Office} from '../models/offices.js';
import PDFDocument from 'pdfkit';

async function getInvoice(req, res) {
  const orderNumber = req.params.orderNumber;
  console.log(orderNumber);

  try {
    const orderDetails = await Order.findOne({
      where: { orderNumber: orderNumber },
      include: [
        {
          model: OrderDetail,
          attributes: ['productCode', 'quantityOrdered', 'priceEach', 'orderLineNumber'],
        },
        {
          model: Customer,
          attributes: ['customerNumber', 'customerName', 'contactFirstName', 'contactLastName', 'creditLimit'],
          include: [
            {
              model: Employee,
              attributes: ['employeeNumber', 'firstName', 'lastName', 'jobTitle'],
              include: [
                {
                  model: Office,
                  attributes: ['officeCode', 'city', 'phone', 'addressLine1', 'addressLine2', 'state', 'country', 'postalCode', 'territory'],
                },
              ],
            },
            {
                model: Payment,
                attributes: ['checkNumber', 'paymentDate', 'amount'],
            },
          ],
        }
      ],
    });
    if (!orderDetails) {
      return res.status(404).json({ error: 'Order not found' });
    }

    // Create a PDF document
    const doc = new PDFDocument();
    res.setHeader('Content-Type', 'application/pdf');
    res.setHeader('Content-Disposition', `attachment; filename=invoice_${orderNumber}.pdf`);
    doc.image('invoicelogo.png', 40, 60, { width: 70 });
    // Pipe the PDF to res
    doc.pipe(res);
    // Adding content to the PDF
    doc.font('Helvetica-Bold').fontSize(18).text(`INVOICE : ORDER#${orderNumber}`, { align: 'center' });
    let yPos = 150;

    // Column 1: Customer Details
    doc.fontSize(10).text(`Customer Number: ${orderDetails.Customer.customerNumber}`, 45, yPos);
    doc.text(`First Name: ${orderDetails.Customer.contactFirstName}`, 45, yPos + 20);
    doc.text(`Last Name: ${orderDetails.Customer.contactLastName}`, 45, yPos + 40);
    doc.text(`Credit Limit: ${orderDetails.Customer.creditLimit}`, 45, yPos + 60);

    // Column 2: Order Details
    let yPosOrderDetails = yPos;
    doc.fontSize(10).text(`Order Number: ${orderDetails.orderNumber}`, 200, yPosOrderDetails);
    doc.text(`Order Date: ${orderDetails.orderDate}`, 200, yPosOrderDetails + 20);
    doc.text(`Order Shipping Date: ${orderDetails.shippedDate}`, 200, yPosOrderDetails + 40);

    // Column 3: Employee Details
    let yPosEmployeeDetails = yPos;
    doc.fontSize(10).text(`Employee Number: ${orderDetails.Customer.Employee.employeeNumber}`, 370, yPosEmployeeDetails);
    doc.text(`Employee First Name: ${orderDetails.Customer.Employee.firstName}`, 370, yPosEmployeeDetails + 20);
    doc.text(`Employee Last Name: ${orderDetails.Customer.Employee.lastName}`, 370, yPosEmployeeDetails + 40);
    doc.text(`Employee Job Title: ${orderDetails.Customer.Employee.jobTitle}`, 370, yPosEmployeeDetails + 60);
    doc.text(`EmployeeOffice: ${orderDetails.Customer.Employee.Office.city}`, 370, yPosEmployeeDetails + 80);
    doc.moveDown();
    let yPosTable = 285;
    // Table Header
    doc.fontSize(9).text('Product Code', 50, yPosTable - 20);
    doc.text('Quantity', 150, yPosTable - 20);
    doc.text('Price', 250, yPosTable - 20);
    doc.text('T-Price', 300, yPosTable - 20);
    doc.text('Line Number', 378, yPosTable - 20);

    yPosTable += -5;
  // Table Rows
orderDetails.orderdetails.forEach(orderDetail => {
    doc.fontSize(9).text(orderDetail.productCode, 50, yPosTable);
    doc.text(orderDetail.quantityOrdered.toString(), 150, yPosTable);
    doc.text(`${orderDetail.priceEach}`, 250, yPosTable);
  
    // Calculate and display total price
    const totalPrice = orderDetail.quantityOrdered * parseFloat(orderDetail.priceEach.replace('$', ''));
    doc.text(` ${totalPrice.toFixed(2)}`, 300, yPosTable);
  
    doc.text(orderDetail.orderLineNumber.toString(), 400, yPosTable);
  
    yPosTable += 20;
  });
  

  // Calculate and display the total amount
  const totalAmount = orderDetails.orderdetails.reduce((sum, orderDetail) => {
    const totalPrice = orderDetail.quantityOrdered * parseFloat(orderDetail.priceEach.replace('$', ''));
    return sum + totalPrice;
  }, 0);
  

    doc.font('Helvetica-Bold').fontSize(12).text('Amount:', 290, yPosTable + 20);
    doc.text(`RS : ${totalAmount.toFixed(2)}`, 350, yPosTable + 20);

    doc.end();
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
}

export { getInvoice };
