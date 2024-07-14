import React from 'react'

const Message = () => {
  return (
    <div className='chat chat-end '> 
      <div className='chat-image avatar'>
        <div className='w-10 rounded-full'>
            <img src="../../../public/avatar.jpg" alt="Tailwind css chat bubble component" />
        </div>

      </div>
      <div className={`chat-bubble text-white bg-blue-500`}>Hi! wht's up</div>
      <div className={`chat-footer opacity-50 text-xs flex gap-1 items-center `}>Hi! wht's up</div>

    </div>
  )
}

export default Message
