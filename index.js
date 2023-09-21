import express from "express"
import { createServer } from "node:http"
import { Server } from "socket.io"

const app = express()
const server = createServer(app)
const io = new Server(server)

app.get("/", (req, res) => {
  res.sendFile(
    new URL(
      "C:/Users/Administrador/Desktop/proj/chatinho/chatinho-app/index.html",
      import.meta.url
    ).pathname
  )
})
io.emit("some event", {
  someProperty: "some value",
  otherProperty: "other value"
})

io.on("connection", socket => {
  console.log("a user connected")
  socket.on("disconnect", () => {
    console.log("user disconnected")
  })
  socket.on("chat message", msg => {
    console.log("message: " + msg)
    io.emit("chat message", msg)
  })
})

server.listen(3001, () => {
  console.log("server running at http://localhost:3001")
})
