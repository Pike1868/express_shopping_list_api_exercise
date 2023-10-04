process.env.NODE_ENV = "test";
const request = require("supertest");
const app = require("../app");
let items = require("../fakeDb");
let sampleItem = { name: "popsicle", price: 1.45 };
beforeEach(() => {
  items.push(sampleItem);
});

afterEach(() => {
  items.length = 0;
});

describe("GET /items", () => {
  test("Getting all items", async () => {
    const resp = await request(app).get("/items");

    expect(resp.statusCode).toBe(200);
    expect(resp.body).toEqual({ items: [{ name: "popsicle", price: 1.45 }] });
  });
});

describe("POST /items", () => {
  test("Adding an item", async () => {
    const resp = await request(app)
      .post("/items")
      .send({ name: "book", price: 7.77 });

    expect(resp.statusCode).toBe(201);
    expect(resp.body).toEqual({
      item: { name: "book", price: 7.77 },
    });
  });
});

describe("GET /items/:name", () => {
  test("Retrieving an item by name", async () => {
    const resp = await request(app).get("/items/popsicle");

    expect(resp.statusCode).toBe(200);
    expect(resp.body).toEqual({ item: { name: "popsicle", price: 1.45 } });
  });
  test("Responds with 404 for invalid item name", async () => {
    const resp = await request(app).get("/items/random_item");

    expect(resp.statusCode).toBe(404);
    expect(resp.body).toEqual({
      error: { message: "Item not found", status: 404 },
    });
  });
});

describe("DELETE /items/:name", () => {
  test("Deleting an item", async () => {
    const resp = await request(app).delete("/items/popsicle");

    expect(resp.statusCode).toBe(200);
    expect(resp.body).toEqual({
      message: "popsicle deleted successfully",
    });
  });
  test("Responds with 404 for attempting to delete an invalid item", async () => {
    const resp = await request(app).delete("/items/random_item");

    expect(resp.statusCode).toBe(404);
    expect(resp.body).toEqual({
      error: { message: "Item not found", status: 404 },
    });
  });
});

describe("PATCH /items/:name", () => {
  test("Updating an item", async () => {
    const resp = await request(app)
      .patch("/items/popsicle")
      .send({ name: "ice cream", price: 3 });

    expect(resp.statusCode).toBe(200);
    expect(resp.body).toEqual({
      item: { name: "ice cream", price: 3 },
    });
  });
  test("Responds with 404 for attempting to update invalid item", async () => {
    const resp = await request(app).patch("/items/random_item");

    expect(resp.statusCode).toBe(404);
    expect(resp.body).toEqual({
      error: { message: "Item not found", status: 404 },
    });
  });
});
