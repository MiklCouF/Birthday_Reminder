const AbstractRepository = require("./AbstractRepository");

class friendRepository extends AbstractRepository {
  constructor() {
    // Call the constructor of the parent class (AbstractRepository)
    // and pass the table name "friend" as configuration
    super({ table: "friend" });
  }

  // The C of CRUD - Create operation

  async create(friend) {

      // Ensure the friend object has the required properties
      if (!friend.firstname || !friend.lastname || !friend.birthday || !friend.userId ) {
return null;
      }
    
      // Use parameterized query to prevent SQL injection
      const query = `INSERT INTO ${this.table} (firstname, lastname, birthday, user_id, reminder_15) VALUES (?, ?, ?, ?, ?)`;
      const values = [friend.firstname, friend.lastname, friend.birthday, friend.userId, friend.reminder_15];
    
      // Execute the SQL INSERT query to add a new friend to the "friend" table
      const [result] = await this.database.query(query, values);
    
          // Return the ID of the newly inserted friend

      return result.insertId;
    }

  // The Rs of CRUD - Read operations

  async read(id) {
    // Execute the SQL SELECT query to retrieve a specific friend by its ID
    const [rows] = await this.database.query(
      `SELECT * FROM ${this.table} WHERE id = ?`,
      [id]
    );

    // Return the first row of the result, which represents the friend
    return rows[0];
  }

  async readAll(userId) {
    // Execute the SQL SELECT query to retrieve all friends FROM the "friend" table
    const [rows] = await this.database.query(`SELECT id, firstname, lastname, DATE_FORMAT(birthday, '%d-%m-%Y') AS formatted_birthday, YEAR(CURDATE()) - YEAR(birthday) AS age_this_year FROM ${this.table} WHERE user_id = ? ORDER BY lastname`,
      [userId]
    );

    // Return the array of friends
    return rows;
  }

  // async read15Days() {
    // Execute the SQL SELECT query to retrieve all friends FROM the "friend" table
    // const [rows] = await this.database.query(`SELECT * FROM ${this.table} 
      // WHERE reminder_15 = 1 AND MONTH(birthday) = MONTH(DATE_ADD(CURDATE(), INTERVAL 15 DAY))
  // AND DAY(birthday) = DAY(DATE_ADD(CURDATE(), INTERVAL 15 DAY));` ,
    // );

    // return rows;
  // }

  async read15Days() {
    // Execute the SQL SELECT query to retrieve all friends FROM the "friend" table
    const [rows] = await this.database.query(`SELECT * 
FROM ${this.table} WHERE reminder_15 = 1 
  AND MONTH(birthday) = MONTH(DATE_ADD(CURDATE(), INTERVAL 15 DAY))
  AND DAY(birthday) = DAY(DATE_ADD(CURDATE(), INTERVAL 15 DAY));` ,
    );
    return rows;
  }


  async read1Day () {
    // Execute the SQL SELECT query to retrieve all friends FROM the "friend" table
    const [rows] = await this.database.query(`SELECT * FROM ${this.table} 
      WHERE DATE_FORMAT(birthday, '%m-%d') = DATE_FORMAT(DATE_ADD(CURDATE(), INTERVAL 1 DAY), '%m-%d');` ,
    );
    return rows;
  }

  async readMonth(userId) {
    // Execute the SQL SELECT query to retrieve all friends FROM the "friend" table
    const [rows] = await this.database.query(`SELECT id, firstname, lastname, YEAR(CURDATE()) - YEAR(birthday) AS age_this_year,
      CASE DAYOFWEEK(DATE_FORMAT(birthday, CONCAT(YEAR(CURDATE()), '-%m-%d')))
    WHEN 1 THEN 'dimanche'
    WHEN 2 THEN 'lundi'
    WHEN 3 THEN 'mardi'
    WHEN 4 THEN 'mercredi'
    WHEN 5 THEN 'jeudi'
    WHEN 6 THEN 'vendredi'
    WHEN 7 THEN 'samedi'
  END AS birth_day_of_week_this_year, DAY(birthday) AS birth_day FROM ${this.table}
  WHERE user_id = ? AND MONTH(birthday) = MONTH(CURDATE()) ORDER BY birth_day` ,
  [userId]
);

    // Return the array of friends where birthday is during the current month
    return rows;
  }

  // The U of CRUD - Update operation
  async update(body) {

    const {id, firstname, lastname, birthday, user_id} = body;

    // Execute the SQL SELECT query to retrieve all users from "user" table
    const [row] = await this.database.query(`UPDATE ${this.table} SET firstname = ?, lastname = ?, birthday = ? WHERE id = ? AND user_id = ? `, [firstname, lastname, birthday, id, user_id]);

    // Return the array of users
    return row.affectedRows;
  }

  // async update(friend) {
  //   ...
  // }

  // The D of CRUD - Delete operation
  async delete(id) {
    const [row] = await this.database.query(
      `DELETE FROM ${this.table} WHERE id=?`,
      [id]
    );
    return row.affectedRows;
  }

  // The N of CRUD - Notify 15 days before operation
  async read15Days() {
    // Execute the SQL SELECT query to retrieve all friends FROM the "friend" table
    const [rows] = await this.database.query(`SELECT * FROM ${this.table} 
      WHERE reminder_15 = 1
  AND MONTH(birthday) = MONTH(DATE_ADD(CURDATE(), INTERVAL 15 DAY))
  AND DAY(birthday) = DAY(DATE_ADD(CURDATE(), INTERVAL 15 DAY));`,
    );

    // Return the array of friends
    return rows;
  }
}


module.exports = friendRepository;
