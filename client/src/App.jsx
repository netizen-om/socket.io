import { useState } from 'react'
import { io } from "socket.io-client"

import React from 'react'
import Button from '../components/Button'

function App() {

  const socket = io("http://localhost:3000")

  return (
    <div>
      <div>App asdasdfqwfef</div>
      <Button />
    </div>
  )
}

export default App
 