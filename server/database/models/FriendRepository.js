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
        throw new Error("Friend object is missing required properties");
      }
    
      // Use parameterized query to prevent SQL injection
      const query = `INSERT INTO ${this.table} (firstname, lastname, birthday, user_id) VALUES (?, ?, ?, ?)`;
      const values = [friend.firstname, friend.lastname, friend.birthday, friend.userId];
    
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
    const [rows] = await this.database.query(`SELECT id, firstname, lastname, DATE_FORMAT(birthday, '%d-%m-%Y') AS formatted_birthday, YEAR(CURDATE()) - YEAR(birthday) AS age_this_year FROM ${this.table} WHERE user_id = ?`,
      [userId]
    );

    // Return the array of friends
    return rows;
  }

  async readMonth(userId) {
    // Execute the SQL SELECT query to retrieve all friends FROM the "friend" table
    const [rows] = await this.database.query(`SELECT id, firstname, lastname, YEAR(CURDATE()) - YEAR(birthday) AS age_this_year,
      CASE DAYOFWEEK(DATE_FORMAT(birthday, CONCAT(YEAR(CURDATE()), '-%m-%d')))
    WHEN 1 THEN 'Dimanche'
    WHEN 2 THEN 'Lundi'
    WHEN 3 THEN 'Mardi'
    WHEN 4 THEN 'Mercredi'
    WHEN 5 THEN 'Jeudi'
    WHEN 6 THEN 'Vendredi'
    WHEN 7 THEN 'Samedi'
  END AS birth_day_of_week_this_year, DAY(birthday) AS birth_day FROM ${this.table}
  WHERE user_id = ? AND MONTH(birthday) = MONTH(CURDATE()) ORDER BY birth_day` ,
  [userId]
);

    // Return the array of friends where birthday is during the current month
    return rows;
  }

  // The U of CRUD - Update operation
  // TODO: Implement the update operation to modify an existing friend

  // async update(friend) {
  //   ...
  // }

  // The D of CRUD - Delete operation
  // TODO: Implement the delete operation to remove an friend by its ID

  // async delete(id) {
  //   ...
  // }
}

module.exports = friendRepository;
