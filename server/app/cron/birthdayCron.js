const cron = require('node-cron');
const { getUsersWithBirthdayToday, sendBirthdayEmail } = require('../services/birthdayService');

// Planifie la tâche cron pour s'exécuter tous les jours à minuit
cron.schedule('0 0 * * *', async () => {
  try {
    // Récupérer les utilisateurs ayant un anniversaire aujourd'hui
    const users = await getUsersWithBirthdayToday();

    // Envoyer un email à chaque utilisateur pour son anniversaire
    users.forEach(user => {
      sendBirthdayEmail(user);
    });

    console.log(`Anniversaires du jour traités : ${users.length} utilisateurs.`);
  } catch (error) {
    console.error('Erreur lors de l\'exécution du cron:', error);
  }
});