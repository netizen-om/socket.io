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

    console.log("User connected", socket.id);
    // console.log("Id", socket.id);

    // socket.broadcast.emit("welcome", "This is Broacasted msg")

    // socket.emit("welcome", "HZuheibwef")
    socket.on("welcome", (msg) => {
        console.log(msg);
    })

    socket.on("disconnect", () => {
        socket.broadcast.emit("welcome", `The user ${socket.id} disconnected`);
        console.log(`The user ${socket.id} disconnected`);
        
    })  

    socket.on("message", (data) => {
        console.log(data);
        io.to(data.room).emit("recevied-msg", data.message);
    })


    socket.on("join-room", (room) => {
        socket.join(room)
    })

})

app.get('/', (req, res) => res.send('Hello World!'))



server.listen(port, () => {
    console.log(`Example app listening on port ${port}!`)
})