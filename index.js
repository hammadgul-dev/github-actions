import express from "express"

const app = express()
const PORT = process.env.PORT || 3000

app.use(express.json())

let todos = []
let nextId = 1

app.get("/todos", (req, res) => {
  res.status(200).json(todos)
})

app.post("/todos", (req, res) => {
  const {title} = req.body

  if (!title) {
    return res.status(400).json({message: "Title is required"})
  }

  const newTodo = {
    id: nextId++,
    title,
    completed: false,
  }

  todos.push(newTodo)
  res.status(201).json(newTodo)
})

app.put("/todos/:id", (req, res) => {
  const id = parseInt(req.params.id)
  const todo = todos.find((t) => t.id === id)

  if (!todo) {
    return res.status(404).json({message: "Todo not found"})
  }

  const {title, completed} = req.body

  if (title !== undefined) todo.title = title
  if (completed !== undefined) todo.completed = completed

  res.status(200).json(todo)
})

app.delete("/todos/:id", (req, res) => {
  const id = parseInt(req.params.id)
  const index = todos.findIndex((t) => t.id === id)

  if (index === -1) {
    return res.status(404).json({message: "Todo not found"})
  }

  todos.splice(index, 1)
  res.status(200).json({message: "Todo deleted successfully"})
})

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`)
})
