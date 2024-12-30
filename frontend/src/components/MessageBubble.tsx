interface MessageBubble{
    message:string,
    ownSender?:boolean
}

export const MessageBubble = ({message,ownSender}:MessageBubble)=>{
    return <div className={`${ownSender?'flex justify-end':''}`}>
        <div className={`rounded-2xl border-white border-2 text-white max-h-20 w-40 min-h-11 p-2 m-2`}>
            {message}
        </div>
    </div>
}