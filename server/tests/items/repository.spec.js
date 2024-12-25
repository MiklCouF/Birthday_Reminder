// Import required dependencies
const { database, tables } = require("../../app/config");

// Import repository classes
const AbstractRepository = require("../../database/models/AbstractRepository");
const FriendRepository = require("../../database/models/FriendRepository");

// Test suite for FriendRepository
describe("FriendRepository", () => {
  // Test: Check if FriendRepository extends AbstractRepository
  test("FriendRepository extends AbstractRepository", async () => {
    // Assertions
    expect(Object.getPrototypeOf(FriendRepository)).toBe(AbstractRepository);
  });

  // Test: Check if tables.friend is an instance of FriendRepository
  test("tables.friend = new FriendRepository", async () => {
    // Assertions
    expect(tables.friend instanceof FriendRepository).toBe(true);
  });



  // Test: Check if readAll method selects all data from the 'Friend' table
  test("readAll => select", async () => {
    // Mock empty rows returned from the database
    const rows = [];

    // Mock the implementation of the database query method
    jest.spyOn(database, "query").mockImplementation(() => [rows]);

    // Call the readAll method of the Friend repository
    const returned = await tables.friend.readAll();

    // Assertions
    expect(database.query).toHaveBeenCalledWith("select * from friend");
    expect(returned).toStrictEqual(rows);
  });
});
