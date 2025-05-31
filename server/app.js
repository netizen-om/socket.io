import express from "express"
import {Server} from "socket.io"
import { createServer } from "http"
import cors from "cors"

const app = express()
const server = createServer(app)
const port = 3000

app.use(cors(
    {
        origin : "*",
        methods : ["GET", "POST"],
        credentials : true
    }
)) 

const io = new Server(server, {
    cors : {
        origin : "*",
        methods : ["GET", "POST"],
        credentials : true
    }
})

io.on("connection", (socket) => {

    console.log("User connected");
    console.log("Id", socket.id);
    

})

app.get('/', (req, res) => res.send('Hello World!'))



server.listen(port, () => {
    console.log(`Example app listening on port ${port}!`)
})