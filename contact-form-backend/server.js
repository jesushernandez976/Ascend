const express = require('express');
const nodemailer = require('nodemailer');
const cors = require('cors');
const app = express();
const PORT = 3000; // Change if needed

// Middleware
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// POST route to handle contact form
app.post('/contact', async (req, res) => {
  const { name, email, phone, message } = req.body;

  // Setup mail transporter
  const transporter = nodemailer.createTransport({
    service: 'gmail', // or use "smtp.mailgun.org", etc.
    auth: {
      user: 'jesuspiecesboy@gmail.com',          // <-- your Gmail
      pass: 'xestqnfotmsjheae'         // <-- create an App Password
    },
  });

  // Define email content
  const mailOptions = {
    from: email,
    to: 'jesuspiecesboy@gmail.com', // <-- where to receive messages
    subject: `Contact Form Submission from ${name}`,
    text: `Name: ${name}\nEmail: ${email}\nPhone: ${phone}\nMessage:\n${message}`
  };

  try {
    await transporter.sendMail(mailOptions);
    res.status(200).json({ message: 'Email sent successfully!' });
  } catch (err) {
    console.error('Error:', err);
    res.status(500).json({ message: 'Failed to send email' });
  }
});

app.listen(PORT, () => {
  console.log(`Server running at http://localhost:${PORT}`);
});
