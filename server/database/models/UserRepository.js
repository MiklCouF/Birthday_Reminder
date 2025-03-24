const AbstractRepository = require("./AbstractRepository");

class UserRepository extends AbstractRepository {
  constructor() {
    // Call the constructor of the parent class (AbstractRepository)
    // and pass the table name "User" as configuration
    super({ table: "user" });
  }

  // The C of CRUD - Create operation

  async create(user) {
    // Execute the SQL INSERT query to add a new User to the "User" table
    const [result] = await this.database.query(
      `insert into ${this.table} (firstname, email, password) values (?, ?, ?)`,
      [user.firstname, user.email, user.password]
    );

    // Return the ID of the newly inserted User
    return result.insertId;
  }

  // The Rs of CRUD - Read operations

  async read(id) {
    // Execute the SQL SELECT query to retrieve a specific User by its ID
    const [rows] = await this.database.query(
      `select * from ${this.table} where id = ?`,
      [id]
    );

    // Return the first row of the result, which represents the User
    return rows[0];
  }

  // get user data, select by the email
  async getUser(email) {

    const [rows] = await this.database.query(
      `select * from ${this.table} where email = ?`,
      [email]
    );
  const user = {
    id: rows[0].id,
    firstname: rows[0].firstname,
    email: rows[0].email,
    hashedPasswordDB: rows[0].password,
  }

  return user;
}

async readEmailById(user_id) {

  const [rows] = await this.database.query(
    `select email from ${this.table} where id = ?`,
    [user_id]
  );

return rows[0].email;
}

  // The U of CRUD - Update operation
  // TODO: Implement the update operation to modify an existing User

  // async update(User) {
  //   ...
  // }

  // The D of CRUD - Delete operation
  // TODO: Implement the delete operation to remove an User by its ID

  // async delete(id) {
  //   ...
  // }
}

module.exports = UserRepository;
