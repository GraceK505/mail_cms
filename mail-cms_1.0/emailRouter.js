/**
 * Send an email by calling the backend API.
 * @author jimBoYz Ni ChOy!!!
 * May 26, 2025 Mon. 5:30 PM
 * Updated June 03, 2025 Tue. 4:41PM
 * @param {Object} options - email options: { name, recipient (to), subject, message (body) }
 */

const express = require('express'); const dotenv = require("dotenv"); const multer = require('multer'); const nodemailer = require('nodemailer'); const fs = require('fs');

dotenv.config();
const router = express.Router();

// Multer setup
const dStorage = multer.diskStorage({
    destination: (req, file, callback) => {
        callback(null, './uploads');
    },
    filename: (req, file, callback) => {
        callback(null, `${file.fieldname}_${Date.now()}_${file.originalname}`);
    }
});

const upload = multer({ storage: dStorage });

const user_mail = process.env.EMAIL_USER;
const email_pass = process.env.EMAIL_PASS;
const host = process.env.SMTP_HOST || 'smtp.gmail.com';
const port = process.env.SMTP_PORT || '465';
const secure = process.env.SECURE === 'true';
const service = process.env.SERVICE || 'gmail';

router.post('/send-email', upload.single('attachment'), async (req, res) => {
    const { name, recipient, subject, message } = req.body;
    const file = req.file;

    try {
        const emailSubject = subject || `Message from ${name}`;

        const transporter = nodemailer.createTransport({
            host,
            port,
            secure,
            service,
            auth: {
                user: user_mail,
                pass: email_pass
            }
        });

        const mailOptions = {
            from: name,
            to: recipient,
            subject: emailSubject,
            text: `From: ${name} \n${message}`,
            attachments: file ? [{ path: file.path, filename: file.originalname }] : []
        };

        await transporter.sendMail(mailOptions);
        if (file) fs.unlinkSync(file.path);

        res.status(200).json({ success: true, message: 'Email sent successfully!' });
    } catch (err) {
        console.error(err);
        if (file) fs.unlinkSync(file.path);
        res.status(500).json({ error: 'Failed to send email.' });
    }
});

module.exports = router;