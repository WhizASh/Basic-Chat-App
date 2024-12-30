import {WebSocketServer,WebSocket} from "ws";

const wss = new WebSocketServer({port:8000})

interface parsedMessageInterface{
    type:"join"|"chat",
    payload:{
        roomId:number,
        message:string
    }
}

interface allSocketsInterface{
    // roomId:[WebSocket]
    roomId:number,
    socket:WebSocket
    
}

interface allPastMessageInterface{
    [roomId:string] :string[]
}

let userConnect = 0
let allSockets :allSocketsInterface[] = []
let allPastMessage = {} as allPastMessageInterface

//need to store the user name so to identify if its own user or other

/*
{
    roomid:[socket1,socket5,socket3],
    roomid:[socket2,socket4]
}
*/


wss.on('connection',(socket)=>{
    userConnect += 1
    console.log("User connected current count "+userConnect)

    socket.on('message',(message)=>{
        const parsedMessage:parsedMessageInterface = JSON.parse(message.toString())
        if(parsedMessage.type=="join"){
            const roomId = parsedMessage.payload.roomId
            allSockets.push({
                roomId:roomId,
                socket
            })

            console.log(allSockets)
            console.log("User joined the "+roomId)
            
            if(allPastMessage[parsedMessage.payload.roomId]){
                for (let msg of allPastMessage[parsedMessage.payload.roomId]){
                    socket.send(JSON.stringify(msg))
                }
            }
            
        }
        else if (parsedMessage.type == 'chat'){
            const chatMessage = parsedMessage.payload.message
            
            const roomSockets = allSockets.find((x)=>x.socket == socket)?.roomId
            console.log("Room id "+roomSockets)

            //logic to store past messages
            if(!roomSockets){
                return
            }

            if(roomSockets in allPastMessage){
                allPastMessage[roomSockets].push(chatMessage)
            }
            else{
                allPastMessage[roomSockets] = [chatMessage]
            }

            console.log(allPastMessage)

            allSockets.forEach(element => {
                if (element.roomId == roomSockets){

                    element.socket.send(chatMessage)
                }
            });
            
        }
    })
    

    socket.on('close',(e)=>{
        userConnect -= 1
        console.log("User Clossed current count "+userConnect)
    })
})