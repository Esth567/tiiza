const itemApprovalTemplate = ({ customerName, companyName, homeUrl, itemName, currentYear }) => {
  return `
    <!DOCTYPE html>
<html>
<head>
  <meta charset="UTF-8">
  <title>Item Approval and Subscription Activation</title>
  <style>
    body {
      font-family: Arial, sans-serif;
      margin: 0;
      padding: 0;
    }

    .container {
      max-width: 600px;
      margin: 0 auto;
      padding: 20px;
    }

    .header {
      background-color: #003366;
      color: #ffffff;
      padding: 20px;
      text-align: center;
    }

    .content {
      padding: 20px;
      background-color: #f4f4f4;
    }

    .message {
      margin-bottom: 20px;
    }

    .button {
      display: inline-block;
      background-color: #003366;
      color: #ffffff !important;
      text-decoration: none;
      padding: 10px 20px;
      border-radius: 4px;
    }

    .footer {
      text-align: center;
      background-color: #003366;
      color: #ffffff;
      padding: 20px;
    }
  </style>
</head>
<body>
  <div class="container">
    <div class="header">
      <h2>Item Approval and Subscription Activation Approved</h2>
    </div>
    <div class="content">
      <p class="message">Dear ${customerName},</p>
      <p class="message">We are pleased to inform you that your registered item "${itemName}",  has been approved and your subscription has been successfully activated. You can now enjoy the benefits and features of your selected item.</p>
      <p class="message">If you have any questions or need assistance, please feel free to contact our support team.</p>
      <p class="message">Thank you for choosing our services!</p>
      <p class="message">Best regards,</p>
      <p class="message">${companyName}</p>
      <p class="message"><a href="${homeUrl}"  class="button">Visit Our Website</a></p>
    </div>
    <div class="footer">
      <p>&copy; ${currentYear} Tiiza Network. All rights reserved.</p>
    </div>
  </div>
</body>
</html>
    
    `;
};

module.exports = { itemApprovalTemplate };
