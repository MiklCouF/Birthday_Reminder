const nodemailer = require('nodemailer');
const emailTemplate = require('../template/email/emailTemplate');
require('dotenv').config();

  const transporter = nodemailer.createTransport({
    host: 'smtp.gmail.com',
    port: 465,
    service:'Gmail',
    secure: true, // utilise SSL
    auth: {
      user: process.env.NODEJS_GMAIL_SEND_USER,
      pass: process.env.NODEJS_GMAIL_SEND_PASSWORD,
    },
  });
  const sendEmailReminder = () => {
    console.log('sendEmail depuis config');
      // Configuration de l'email
      const mailOptions = {
        from: process.env.NODEJS_GMAIL_SEND_USER,
        to: 'mike_mc7@hotmail.com', 
        subject: 'Rappel Anniversaire pour',
        text: 'emailTemplate.testEmailTemplateText',// Texte brut
          html: emailTemplate.testEmailTemplate, // HTML
      };
    console.log('mailOptions', mailOptions);
    
      // Envoi de l'email
      return transporter.sendMail(mailOptions);
    };

const sendEmail = () => {
  console.log('sendEmail depuis config');
    // Configuration de l'email
    const mailOptions = {
      from: process.env.NODEJS_GMAIL_SEND_USER,
      to: 'mike_mc7@hotmail.com', 
      subject: 'Rappel Anniversaire pour',
      text: 'emailTemplate.testEmailTemplateText',// Texte brut
        html: emailTemplate.testEmailTemplate, // HTML
    };
  console.log('mailOptions', mailOptions);
  
    // Envoi de l'email
    return transporter.sendMail(mailOptions);
  };

module.exports = { sendEmail, sendEmailReminder };