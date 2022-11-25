const request = require("supertest");
const app = require("./app");
const { db, User } = require("./db");

beforeEach(async () => {
  await db.sync({ force: true });
  await User.bulkCreate([
    { id: 123, name: "Jai Bhagat", user: "@ChaiWithJai" },
  ]);
});

describe("GET / responds with hello world", () => {
  test('should return {hello: "world" }', async () => {
    const res = await request(app).get("/");
    expect(res.status).toEqual(200);
    expect(res.body).toEqual({ hello: "world" });
  });
});

describe("GET /users/:id", () => {
  test("should respond with user record", async () => {
    // arrange
    const api = request(app);
    const userId = 123;
    const route = `/users/${userId}`;

    // act
    const response = await api.get(route);

    // assert
    expect(response.status).toEqual(200);
    expect(response.body.createdAt).toBeDefined();
    expect(response.body.updatedAt).toBeDefined();
    expect(response.body).toEqual(
      expect.objectContaining({
        id: 123,
        user: "@ChaiWithJai",
        name: "Jai Bhagat",
      })
    );
  });

  test("should respond with 404 if user record does not exist", async () => {
    // arrange
    const api = request(app);
    const userId = 124;
    const route = `/users/${userId}`;

    // act
    const response = await api.get(route);

    // assert
    expect(response.status).toEqual(404);
    expect(response.error.text).toEqual(`User with id:  ${userId} not found.`);
  });
});

describe("POST /users", () => {
  test("should respond with newly created user record using JSON payload", async () => {
    // arrange
    const api = request(app);
    const payload = { name: "Pablo Picasso", user: "@piz_piz" };
    const route = `/users`;

    // act
    const response = await api.post(route).send(payload);

    // assert
    expect(response.status).toEqual(200);
    expect(response.body.id).toBeDefined();
    expect(response.body.createdAt).toBeDefined();
    expect(response.body.updatedAt).toBeDefined();
    expect(response.body).toEqual(expect.objectContaining(payload));
  });

  test("returns 400 and errors for missing name", async () => {
    // arrange
    const api = request(app);
    const route = "/users";
    const params = { user: "rilkes" }; // intentionally missing name

    const response = await api.post(route).send(params);

    expect(response.status).toEqual(400);
    expect(response.body.errors).toEqual([
      {
        message: "Name is a required field",
        path: "name",
        value: null,
      },
    ]);
  });

  test.todo("responds 500 in case of error");
});
