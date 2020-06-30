const express = require("express");
const path = require("path");
const bodyParser = require('body-parser')

const { Router } = express;
const router = Router();

const app = express();

app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json())


app.use(express.static(__dirname + "/dist/pagina"));


app.get("/*", function (req, res) {
  res.sendFile(path.join(__dirname + "/dist/pagina/index.html"));
});


router.post('/send-email', async (req, res) => {
  const { name, email, phone, message } = req.body;

  contentHTML = `
      <h1>User Information</h1>
      <ul>
          <li>Username: ${name}</li>
          <li>User Email: ${email}</li>
          <li>PhoneNumber: ${phone}</li>
      </ul>
      <p>${message}</p>
  `;

  let transporter = nodemailer.createTransport({
      host: 'gmail',
      secure: false,
      auth: {
        user: 'migajas11games@gmail.com',
        pass: 'Miguel11'
    },
      tls: {
          rejectUnauthorized: false
      }
  });

  let info = await transporter.sendMail({
      from: '"Contacto de Kamel"', // sender address,
      to: 'migajas11games@gmail.com',
      subject: 'Website Contact Form',
      // text: 'Hello World'
      html: contentHTML
  })

  console.log('Message sent: %s', info.messageId);
  // Message sent: <b658f8ca-6296-ccf4-8306-87d57a0b4321@example.com>

  // Preview only available when sending through an Ethereal account
  console.log('Preview URL: %s', nodemailer.getTestMessageUrl(info));
  // Preview URL: https://ethereal.email/message/WaQKMgKddxQDoou...


});


app.listen(process.env.PORT || 8080);
