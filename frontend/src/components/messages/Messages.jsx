import React, { useEffect, useRef } from 'react'
import Message from './Message'
import useGetMessages from '../../hooks/useGetMessages'
import MessageSkeleton from '../skeltons/MessageSkeleton';


const Messages = () => {
  const {messages,loading} = useGetMessages();
  // console.log("MESSAGES", messages);

  const lastMesaageref = useRef();

  useEffect(() =>{
    setTimeout(() => {
      lastMesaageref.current?.scrollIntoView({behavior : "smooth"});
    },100)
  },[messages])
  
  return (
    <div className='px-4 flex-1 overflow-auto'>
      {!loading && 
        messages.length > 0 && 
        messages.map((message) => (
          <div key={message._id}
            ref={lastMesaageref}
          >
            <Message  message={message}/>
          </div>
        )) }

      {loading && [...Array(3)].map((_, idx) => <MessageSkeleton key={idx} />)}

      {!loading && messages.length === 0 && (
        <p className='text-center'>Send a message to start the conversation</p>
      )}

    </div>
  )
}
export default Messages
