const AbstractRepository = require("./AbstractRepository");

class friendRepository extends AbstractRepository {
  constructor() {
    // Call the constructor of the parent class (AbstractRepository)
    // and pass the table name "friend" as configuration
    super({ table: "friend" });
  }

  // The C of CRUD - Create operation

  async create(friend) {
    // Execute the SQL INSERT query to add a new friend to the "friend" table
    const [result] = await this.database.query(
      `insert into ${this.table} (name) values (?)`,
      [friend.name]
    );

    // Return the ID of the newly inserted friend
    return result.insertId;
  }

  // The Rs of CRUD - Read operations

  async read(id) {
    // Execute the SQL SELECT query to retrieve a specific friend by its ID
    const [rows] = await this.database.query(
      `select * from ${this.table} where id = ?`,
      [id]
    );

    // Return the first row of the result, which represents the friend
    return rows[0];
  }

  async readAll() {
    // Execute the SQL SELECT query to retrieve all friends from the "friend" table
    const [rows] = await this.database.query(`select * from ${this.table}`);

    // Return the array of friends
    return rows;
  }

  async readMonth() {
    // Execute the SQL SELECT query to retrieve all friends from the "friend" table
    const [rows] = await this.database.query(`select * from ${this.table} WHERE MONTH(birthday) = MONTH(CURDATE()) ORDER BY birthday` );

    // Return the array of friends
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
