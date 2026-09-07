import request from "supertest"
import app from "./app.js"

describe("Todo API", () => {
  test("GET /todos should return an empty array initially", async () => {
    const response = await request(app).get("/todos")
    expect(response.status).toBe(200)
    expect(response.body).toEqual([])
  })

  test("POST /todos should create a new todo", async () => {
    const response = await request(app).post("/todos").send({title: "Buy milk"})

    expect(response.status).toBe(201)
    expect(response.body.title).toBe("Buy milk")
    expect(response.body.completed).toBe(false)
  })

  test("POST /todos without title should return 400", async () => {
    const response = await request(app).post("/todos").send({})

    expect(response.status).toBe(400)
  })

  test("DELETE /todos/:id for non-existent id should return 404", async () => {
    const response = await request(app).delete("/todos/999")
    expect(response.status).toBe(404)
  })
})
