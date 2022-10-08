const express = require('express')

const app = express()
const http = require('http')
const cors = require('cors')
const { Server } = require('socket.io')


app.use(cors())

const server = http.createServer(app)
const io = new Server(server, {
  cors: {
    origin: "http://localhost:",
    methods: ["GET", "POST"],
  }
})

io.on("connection", (socket) =>{
  console.log(`Usuario conectado con el id ${socket.id}`)

  socket.on("join_room", (data) => {
    socket.join(data)
    console.log(`Usuario con el ID: ${socket.id} se ha unido con exito a la sala ${data}`)
  })

  socket.on("send_message", (data) =>{
    socket.to(data.room).emit("recieve_message", data)
  })

  socket.on("disconnect", () =>{
    console.log(`El usuario ${socket.id} se ha desconectado`)
  })
})

server.listen(3001, () => {
  console.log('Server is Running')
})
