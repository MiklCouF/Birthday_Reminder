const db = require('../config/db');  // Assure-toi d'avoir configuré ta connexion à la base de données
const nodemailer = require('nodemailer');

// Récupérer les utilisateurs dont l'anniversaire est aujourd'hui
async function getUsersWithBirthdayToday() {
  const today = new Date().toISOString().slice(0, 10);  // Format 'yyyy-mm-dd'

  const query = 'SELECT nom, email, date_anniversaire FROM utilisateurs WHERE DATE(date_anniversaire) = ?';
  const [users] = await db.execute(query, [today]);

  return users;
}

// Envoyer un email de souhait d'anniversaire
async function sendBirthdayEmail(user) {
  const transporter = nodemailer.createTransport({
    service: 'gmail',  // Tu peux utiliser un autre service si besoin
    auth: {
      user: 'ton_email@gmail.com',
      pass: 'ton_mot_de_passe',
    },
  });

  const mailOptions = {
    from: 'ton_email@gmail.com',
    to: user.email,
    subject: `Joyeux anniversaire ${user.nom}!`,
    text: `Bonjour ${user.nom},\n\nNous te souhaitons un très joyeux anniversaire !`,
  };

  try {
    await transporter.sendMail(mailOptions);
    console.log(`Email envoyé à ${user.email}`);
  } catch (error) {
    console.error(`Erreur lors de l'envoi de l'email à ${user.email}:`, error);
  }
}

module.exports = { getUsersWithBirthdayToday, sendBirthdayEmail };