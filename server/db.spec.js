const { db, User } = require("./db");

beforeAll(() => db.sync({ force: true }));

test("User model should save with name, username", async () => {
  // arrange
  const params = {
    name: "New User",
    user: "new@example.com",
  };

  // act
  const user = await User.create(params);

  // assert
  expect(user.id).toBeDefined();
  expect(user.createdAt).toBeDefined();
  expect(user.updatedAt).toBeDefined();
  expect(user).toEqual(expect.objectContaining(params));
});

test("User model should not save without a name property", () => {
  const params = { user: "rothkos" }; // missing name intentionally

  const subject = User.create(params);

  expect(subject).rejects.toThrow(/name is a required field/i);
});

test("User model should not save without a user property", () => {
  const params = { name: "Mark Rothko" }; // missing user intentionally

  const subject = User.create(params);

  expect(subject).rejects.toThrow(/user is a required field/i);
});
