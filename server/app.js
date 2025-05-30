import express from "express"
import {Server} from "socket.io"
import { createServer } from "http"

const app = express()
const server = createServer(app)
const port = 3000

const io = new Server(server)

io.on("connection", (socket) => {

    console.log("User connected");
    console.log("Id", socket.id);
    

})

app.get('/', (req, res) => res.send('Hello World!'))



app.listen(port, () => {
    console.log(`Example app listening on port ${port}!`)
})