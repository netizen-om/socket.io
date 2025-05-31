import { useEffect, useState } from 'react'
import { io } from "socket.io-client"

import React from 'react'
import Button from '../components/Button'

function App() {

  const socket = io("http://localhost:3000")

  useEffect(() => {
  
    socket.on("connect", () => {
      
      console.log("Hello, Connected Id : ", socket.id);

      socket.on("welcome", (msg) => {
        console.log(msg);
        
        socket.emit("welcome", "Hey man")
      })
    })
    
    return () => {
      socket.disconnect();

    }

  }, [])


  return (
    <div>
      <div>App asdasdfqwfef</div>
      <Button />
    </div>
  )
}

export default App
 