const express = require("express");
const bodyParser = require("body-parser");
const nodemailer = require("nodemailer");
const mjml = require("mjml");
const { MongoClient } = require("mongodb");
const router = express.Router();
const uri = process.env.MONGO_URI;
const port = process.env.PORT || 3000;
const client = new MongoClient(
  "mongodb+srv://CleverGrace:%23.J87tasTptRJaw@emailtemplatecluster.7wg7scv.mongodb.net/?retryWrites=true&w=majority&appName=emailTemplateCluster"
);

router.post("/convert-mjml", async (req, res) => {
  const { mjml: mjmlString } = req.body;

  if (!mjmlString) {
    return res.status(400).json({ error: "MJML content is required" });
  }

  try {
    const { html } = mjml(mjmlString, { validationLevel: "soft" });
    res.status(200).json({ html });
  } catch (err) {
    console.error("MJML Conversion Error:", err.message);
    res.status(500).json({ error: err.message });
  }
});

router.get("/emails", async (req, res) => {
  try {
    await client.connect();
    db = await client.db("CleverGraceDB");
    const emails = await db.collection("CleverGraceDB").find().toArray();
    
    res.status(200).json(emails);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// router.post("/send-email", async (req, res) => {
//   const { name, email, adminEmail, message } = req.body;

//   try {
//     const transporter = nodemailer.createTransport({
//       service: "gmail",
//       post: "465",
//       auth: {
//         user: process.env.EMAIL_USER,
//         pass: process.env.EMAIL_PASS,
//         clientId: process.env.CLIENT_ID
//       },
//     });

//     const mailOptions = {
//       from: email,
//       to: "recipient-email@gmail.com",
//       subject: `Message from ${name}`,
//       text: message,
//     };

//     await transporter.sendMail(mailOptions);
//     res.status(200).send("Email sent successfully!");
//   } catch (error) {
//     console.error(error);
//     res.status(500).send("Failed to send email.");
//   }
// });

module.exports = router;
