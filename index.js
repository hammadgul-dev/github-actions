import e from "express"

const app = e()
const PORT = process.env.PORT || 3000

app.get("/", (req, resp) => {
  resp.send("CI/CD Paractice")
})

app.listen(PORT, () => {
  console.log(`Server Is Listing On Port ${PORT}`)
})
