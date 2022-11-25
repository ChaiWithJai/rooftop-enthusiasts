const { db, User } = require("./db");

beforeAll(() => db.sync({ force: true }));

test("User model should save with name, email", async () => {
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
