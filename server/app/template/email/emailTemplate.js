const birthdayReminderTemplate = `
    <html>
        <body>
            <h1>Happy Birthday!</h1>
            <p>Dear [Name],</p>
            <p>We wish you a very happy birthday and a wonderful year ahead!</p>
            <p>Best regards,<br>Your Team</p>
        </body>
    </html>
`;

const eventReminderTemplate = `
    <html>
        <body>
            <h1>Event Reminder</h1>
            <p>Dear [Name],</p>
            <p>This is a reminder for the upcoming event: [Event Name].</p>
            <p>Date: [Event Date]</p>
            <p>Location: [Event Location]</p>
            <p>We hope to see you there!</p>
            <p>Best regards,<br>Your Team</p>
        </body>
    </html>
`;

const testEmailTemplate = `
<!DOCTYPE html>
<html>
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Anniversaire de {{ data.name || 'erreur' }} à venir </title>
</head>
<body style="margin: 0; padding: 0;">
  <table width="100%" border="0" cellspacing="0" cellpadding="0">
    <tr>
      <td align="center" bgcolor="#f4f4f4">
        <table width="600px" border="0" cellspacing="0" cellpadding="20" style="background: white;">
          <tr>
            <td align="center">
              <h1 style="color: #333; font-family: Arial, sans-serif;">Rappel Anniversaire</h1>
              <p style="font-size: 16px; color: #666; font-family: Arial, sans-serif;">
                 {{ data.name || 'erreur' }} va avoir {{ data.age || 'erreur' }} ans le {{ data.birthday || 'erreur' }}.
              </p>
              <a href="#" style="display: inline-block; background-color: #007BFF; color: white; text-decoration: none; padding: 10px 20px; border-radius: 5px;">Découvrir</a>
            </td>
          </tr>
        </table>
      </td>
    </tr>
  </table>
</body>
</html>
`;

module.exports = {
    birthdayReminderTemplate,
    eventReminderTemplate,
    testEmailTemplate,
};