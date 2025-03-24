const AbstractSeeder = require("./AbstractSeeder");

// Import seeders that must be executed before this one
// Follow your foreign keys to find the right order ;)
const UserSeeder = require("./UserSeeder");

class FriendSeeder extends AbstractSeeder {
  constructor() {
    // Call the constructor of the parent class (AbstractSeeder) with appropriate options
    super({ table: "friend", truncate: true, dependencies: [UserSeeder] });
  }

  // The run method - Populate the 'friend' table with fake data

  run() {
    // Generate and insert fake data into the 'item' table
    for (let i = 0; i < 1000; i += 1) {
      // Generate fake item data
      const fakeFriend = {
        firstname: this.faker.person.firstName(), // Generate a fake title using faker library
        lastname: this.faker.person.lastName(), // Generate a fake title using faker library
        birthday: this.faker.date.birthdate({ mode: 'age', min: 0, max: 99 }), // Generate a fake title using faker library
        reminder_15: 1,
        user_id: this.faker.number.int({ min: 1, max: 10 }),
        // user_id: this.getRef(`user_${i}`).insertId, // Get the insertId of the corresponding user from UserSeeder
      };

      // Insert the fakeItem data into the 'firend' table
      this.insert(fakeFriend); // insert into firend(firstname, lastname, birthday, user_id, reminder_15) values (?, ?, ?, ?, ?)
    }
  }
}

// Export the ItemSeeder class
module.exports = FriendSeeder;
