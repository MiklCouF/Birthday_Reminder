const fs = require("fs");
const path = require("path");
const tables = require("../../database/tables");
const nodemailer = require("nodemailer");
require("dotenv").config();

async function conductorReminder() {
  const getReminder1 = await tables.friend.read1Day();
  await sendAllEmails(getReminder1);
  const getReminder15 = await tables.friend.read15Days();
  await sendAllEmails(getReminder15);
}

async function getDataBeforeSendEmailReminder(dataItem) {
  const { user_id, firstname, lastname, birthday } = dataItem;
  const data = {
    email: await tables.user.readEmailById(user_id),
    friendName: firstname + " " + lastname,
    formattedDate: formatDate(birthday),
    age: calculateAge(birthday),
  };
  console.log("data transform for email template", data);
  return data;
}

const sendAllEmails = async (dataArray) => {
  for (const dataItem of dataArray) {
    try {
      const userData = await getDataBeforeSendEmailReminder(dataItem);
      await sendEmailReminder(userData);
      // const result = await sendEmailReminder(userData);
    } catch (error) {
      console.error("Erreur lors de l'envoi de l'email :", error);
    }
  }
};

// Fonction pour lire et injecter des variables dans le template
const getEmailTemplate = (data) => {
  // Lire le fichier HTML
  const filePath = path.join(
    __dirname,
    "../template/email/reminderEmailTemplate.html",
  );
  let template = fs.readFileSync(filePath, "utf8");

  // Remplacer les variables {{friendName}}, {{age}}, {{birthday}}
  Object.keys(data).forEach((key) => {
    const regex = new RegExp(`{{\\s*${key}\\s*}}`, "g");
    template = template.replace(regex, data[key] || "<span style='color: #FF0000'>ERREUR</span>");
  });
  return template;
};

// Fonction pour envoyer l'email
const sendEmailReminder = async (userData) => {
  const transporter = nodemailer.createTransport({
    service: "gmail",
    auth: {
      user: process.env.NODEJS_GMAIL_SEND_USER,
      pass: process.env.NODEJS_GMAIL_SEND_PASSWORD,
    },
  });

  // Générer le template avec les données
  const emailContent = getEmailTemplate(userData);

  const mailOptions = {
    from: process.env.NODEJS_GMAIL_SEND_USER,
    // to: userData.email,
    // to: "mike_mc7@hotmail.Com",
    subject: `Rappel Anniversaire pour ${userData.friendName}`,
    html: emailContent,
  };

  try {
    await transporter.sendMail(mailOptions);
  } catch (error) {
    console.error("Erreur lors de l'envoi de l'email :", error);
  }
};

// FORMAT DAY MONTH AND AGE FOR CURRENT YEAR
function calculateAge(birthdateString) {
  const birthYear = new Date(birthdateString).getFullYear(); // Récupère l'année de naissance
  const currentYear = new Date().getFullYear(); // Récupère l'année actuelle
  return currentYear - birthYear; // Calcule l'âge
}

function formatDate(dateString) {
  const date = new Date(dateString); // Convertit la chaîne en objet Date
  const currentYear = new Date().getFullYear(); // Récupère l'année en cours
  date.setFullYear(currentYear); // Remplace l'année par l'année actuelle
  const days = [
    "Dimanche",
    "Lundi",
    "Mardi",
    "Mercredi",
    "Jeudi",
    "Vendredi",
    "Samedi",
  ];
  const months = [
    "janvier",
    "février",
    "mars",
    "avril",
    "mai",
    "juin",
    "juillet",
    "août",
    "septembre",
    "octobre",
    "novembre",
    "décembre",
  ];

  // Récupère le jour, le chiffre du jour, et le mois
  const dayName = days[date.getDay()]; // Nom du jour
  const dayNumber = date.getDate(); // Chiffre du jour
  const monthName = months[date.getMonth()]; // Nom du mois
  return `${dayName} ${dayNumber} ${monthName}`;
}

module.exports = { conductorReminder };
