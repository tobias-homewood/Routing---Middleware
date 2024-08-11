import request from "supertest";
import items from "../data/fakeDB.js";
import app from "../app.js";

describe("Shopping Routes", () => {
    beforeEach(() => {
        // Reset the items array before each test
        items.length = 0;
        items.push({ name: "apple", price: 1.0 });
    });

    test("GET /items should return all items", async () => {
        const response = await request(app).get("/items");
        expect(response.status).toBe(200);
        expect(response.body).toEqual([{ name: "apple", price: 1.0 }]);
    });

    test("POST /items should add a new item", async () => {
        const newItem = { name: "banana", price: 0.5 };
        const response = await request(app).post("/items").send(newItem);
        expect(response.status).toBe(201);
        expect(response.body).toEqual({ added: newItem });
        expect(items).toContainEqual(newItem);
    });

    test("GET /items/:name should return the item", async () => {
        const response = await request(app).get("/items/apple");
        expect(response.status).toBe(200);
        expect(response.body).toEqual({ name: "apple", price: 1.0 });
    });

    test("GET /items/:name should return 404 if item not found", async () => {
        const response = await request(app).get("/items/orange");
        expect(response.status).toBe(404);
    });

    test("PATCH /items/:name should update the item", async () => {
        const updatedItem = { name: "apple", price: 1.5 };
        const response = await request(app)
            .patch("/items/apple")
            .send(updatedItem);
        expect(response.status).toBe(200);
        expect(response.body).toEqual({ updated: updatedItem });
        expect(items).toContainEqual(updatedItem);
    });

    test("PATCH /items/:name should return 404 if item not found", async () => {
        const response = await request(app)
            .patch("/items/orange")
            .send({ name: "orange", price: 1.0 });
        expect(response.status).toBe(404);
    });

    test("DELETE /items/:name should delete the item", async () => {
        const response = await request(app).delete("/items/apple");
        expect(response.status).toBe(200);
        expect(response.body).toEqual({ message: "Deleted" });
        expect(items).not.toContainEqual({ name: "apple", price: 1.0 });
    });

    test("DELETE /items/:name should return 404 if item not found", async () => {
        const response = await request(app).delete("/items/orange");
        expect(response.status).toBe(404);
    });
});
