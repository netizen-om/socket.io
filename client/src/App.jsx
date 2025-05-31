import { useEffect, useMemo, useState } from 'react'
import { io } from "socket.io-client"
import { Box, Button, Container, Stack, TextField, Typography } from "@mui/material"
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
  const [messages, setMessages] = useState([]);

  useEffect(() => {
  console.log("Updated Messages Array:", messages);
  }, [messages]);

  useEffect(() => {
  
    socket.on("connect", () => {
      setSocketId(socket.id);
      console.log("Hello, Connected Id : ", socket.id);

      socket.on("welcome", (msg) => {
        console.log(msg);
        // socket.emit("welcome", "Hey man")
      })

      socket.on("recevied-msg", (data) => {
        console.log(data);
        setMessages((messages) => [...messages, data])
        console.log("Messages Array : " + messages);

      })

    })
    
    return () => {
      socket.disconnect();
    }

  }, [])


  return <Container maxWidth='sm'> 
    <Box sx={{ height : 250 }}></Box>
    <Typography variant='h1' component={"div"} gutterBottom>
      Welcome to Socket.io
    </Typography>

    <Typography variant='h5' component={"div"} gutterBottom>
      {"room Id :" + socketId}
    </Typography>
  
    <form onSubmit={submitHandler}>
      <TextField id='outlined-basic' value={message} onChange={(e) => setMessage(e.target.value)} label="Message" variant='outlined'></TextField>

      <TextField id='outlined-basic' value={room} onChange={(e) => setRoom(e.target.value)} label="Room" variant='outlined'></TextField>
      <Button type='submit' variant="contained" size="large" color="primary">Send</Button>
    </form>

    <Stack>
        {
          messages.map((m,i) => {
            return (<Typography key={i} variant='h6' component="div" gutterBottom>
              {m}
            </Typography>)
          })
        }
    </Stack>

  </Container>
}

export default App
 