const VerificationEmail = (username, otp) => {
  return `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Email Verification</title>
  <style>
    body {
      font-family: "Segoe UI", Arial, sans-serif;
      margin: 0;
      padding: 0;
      background-color: #f9f9f9;
      color: #333;
    }
    .container {
      max-width: 600px;
      margin: 40px auto;
      background: #ffffff;
      padding: 30px;
      border-radius: 10px;
      box-shadow: 0 4px 12px rgba(0,0,0,0.1);
    }
    .header {
      text-align: center;
      border-bottom: 2px solid #eee;
      padding-bottom: 10px;
      margin-bottom: 20px;
    }
    .header h1 {
      font-size: 22px;
      color: #2c3e50;
    }
    .content {
      font-size: 16px;
      line-height: 1.6;
      color: #555;
    }
    .otp {
      margin: 20px auto;
      padding: 15px 25px;
      background: #f0f9ff;
      border: 2px dashed #007bff;
      color: #007bff;
      font-size: 24px;
      font-weight: bold;
      letter-spacing: 4px;
      text-align: center;
      border-radius: 8px;
      display: inline-block;
    }
    .footer {
      text-align: center;
      font-size: 13px;
      color: #888;
      margin-top: 30px;
      border-top: 1px solid #eee;
      padding-top: 15px;
    }
    .highlight {
      color: #007bff;
      font-weight: bold;
    }
  </style>
</head>
<body>
  <div className="container">
    <div className="header">
      <h1>Verify Your Email Address</h1>
    </div>
    <div className="content">
      <p>Hello <span className="highlight">${username}</span>,</p>
      <p>Thank you for registering with <strong>724 Gebeya</strong>. Please use the OTP below to verify your email address:</p>
      <div className="otp">${otp}</div>
      <p>If you didn’t create an account, you can safely ignore this email.</p>
    </div>
    <div className="footer">
      <p>&copy; 2024 724 Gebeya. All rights reserved.</p>
    </div>
  </div>
</body>
</html>`;
};

export default VerificationEmail;
