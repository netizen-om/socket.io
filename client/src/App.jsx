import { useEffect, useMemo, useState } from 'react'
import { io } from "socket.io-client"
import { Button, Container, TextField, Typography } from "@mui/material"
import React from 'react'

function App() {

  const socket = useMemo(() => io("http://localhost:3000"), [])

  const submitHandler = (e) => {
    e.preventDefault();
    console.log("Sending msg");
    
    socket.emit("message", {message, room})
    setMessage("")
  }

  const [message, setMessage] = useState("");
  const [room, setRoom] = useState("");
  const [socketId, setSocketId] = useState("");

  useEffect(() => {
  
    socket.on("connect", () => {
      setSocketId(socket.id);
      console.log("Hello, Connected Id : ", socket.id);

      socket.on("welcome", (msg) => {
        console.log(msg);
        // socket.emit("welcome", "Hey man")
      })

      socket.on("recevied-msg", (revMsg) => {
        console.log(revMsg);
      })

    })
    
    return () => {
      socket.disconnect();

    }

  }, [])


  return <Container maxWidth='sm'> 

    <Typography variant='h1' component={"div"} gutterBottom>
      Welcome to Socket.io
    </Typography>

    <Typography variant='h5' component={"div"} gutterBottom>
      {socketId}
    </Typography>
  
    <form onSubmit={submitHandler}>
      <TextField id='outlined-basic' value={message} onChange={(e) => setMessage(e.target.value)} label="Message" variant='outlined'></TextField>

      <TextField id='outlined-basic' value={room} onChange={(e) => setRoom(e.target.value)} label="Room" variant='outlined'></TextField>
      <Button type='submit' variant="contained" color="primary">Send</Button>
    </form>

  </Container>
}

export default App
 