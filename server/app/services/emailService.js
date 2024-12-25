const nodemailer = require('nodemailer');
require('dotenv').config();  // Utilise dotenv pour sécuriser tes informations sensibles (comme le mot de passe)

const transporter = nodemailer.createTransport({
  service: 'gmail',  // Utilise le service Gmail par exemple
  auth: {
    user: process.env.NODEJS_GMAIL_SEND_USE, // Ton email (utilise un fichier .env pour stocker ces informations)
    pass: process.env.NODEJS_GMAIL_SEND_PASSWORD  // Ton mot de passe d'email (également dans .env)
  }
});


// TEST ROUTE

const sendEmail = () => {
    // Configuration de l'email
    const mailOptions = {
      from: process.env.NODEJS_GMAIL_SEND_USE,   // Ton email
      to: 'mike_mc7@hotmail.com', // L'email du destinataire (à tester avec un vrai email)
      subject: 'Test Email - Express + Nodemailer', // Sujet
      text: 'Bonjour, ceci est un email de test envoyé depuis une application Express.', // Texte brut
      html: '<p>Bonjour, ceci est un email de test envoyé depuis une <strong>application Express</strong>.</p>', // HTML
    };
  
    // Envoi de l'email
    return transporter.sendMail(mailOptions);
  };

//   fin du test 



// Fonction pour envoyer un email
// const sendEmail = (to, subject, text, html) => {
//   const mailOptions = {
//     from: process.env.NODEJS_GMAIL_SEND_USE,
//     to: to,
//     subject: subject,
//     text: text,
//     html: html
//   };

//   return transporter.sendMail(mailOptions);
// };

module.exports = { sendEmail };