const AbstractRepository = require("./AbstractRepository");

class SettingsRepository extends AbstractRepository {
  constructor() {
    // Call the constructor of the parent class (AbstractRepository)
    // and pass the table name "settings" as configuration
    super({ table: "settings" });
  }

    // The Rs of CRUD - Read operations
    async read(userId) {
      // Execute the SQL SELECT query to retrieve a specific settings by its ID
      const [rows] = await this.database.query(
        `select * from ${this.table} where user_id = ?`,
        [userId]
      );
  
      // Return the first row of the result, which represents the settings
      return rows[0];
    }

    // The U of CRUD - Update operation
    async updateReminder(userId, settingsUpdate) {
        // Extract the reminder setting from the settingsUpdate object
        const { email_cc } = settingsUpdate;

      // Execute the SQL UPDATE query to modify the reminder setting of the user
      await this.database.query(
        `update ${this.table} set setting_email_cc = ? WHERE user_id = ?`,
        [ email_cc, userId]
      );
    }
}