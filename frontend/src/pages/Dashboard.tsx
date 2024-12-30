import { useEffect, useRef, useState } from "react"
import { Button } from "../components/Button"
import { Input } from "../components/Input"
import { MessageBubble } from "../components/MessageBubble"


export const Dashboard = ()=>{

    const socket = useRef({} as WebSocket)
    
    useEffect(()=>{
      const ws = new WebSocket("ws://172.25.147.175:8000")
      socket.current = ws

      console.log("Socket connected ")

      socket.current.onmessage = (e)=>{
        setMessage((messages) => [...messages,e.data])
      }

    },[])

    const RoomidRef = useRef()
    const messageRef = useRef("")
    const [message,setMessage] = useState([])

    function joinRoom(){
      const roomId = RoomidRef.current.value;
      const payload = {
        type:"join",
        payload:{
          roomId
        }
      }

      socket.current.send(JSON.stringify(payload))
    }

    function sendMessage(){
      if(!socket.current){
        return
      }
      const message = messageRef.current.value
      messageRef.current.value = ''
      const payload = {
        type:"chat",
        payload:{
          message
        }
      }
      socket.current.send(JSON.stringify(payload))
    }


    return <div className='flex justify-center bg-slate-900 items-center h-screen w-screen'>
      <div>
        <div>
          <div>
            <Input refe={RoomidRef} size="md" placeholder={"Enter Your Room Id"} />
            <Button onClick={joinRoom} size="sm" text={"Join Room"} />
          </div>
        </div>
        <div className='border-gray-500 border-2 w-96 h-96 rounded-md overflow-y-auto'>
          {message.map((ele, idx) => <MessageBubble ownSender={true} key={idx} message={ele} />)}
        </div>
        <div className='text-center'>
          <Input refe={messageRef} placeholder={"Message"} />
        </div>
        <div className='text-center'>
          <Button onClick={sendMessage} text={"Send Message"} />
        </div>
      </div>
      </div>
}