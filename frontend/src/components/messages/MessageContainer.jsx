import  { useEffect } from 'react';
import Messages from './Messages';
import MessageInput from './MessageInput';
import {TiMessages} from 'react-icons/ti';
import useConversation from '../../zustand/useConversation';
import { useAuthContext } from '../../context/AuthContext';

const MessageContainer = () => {
  const {selectedConversation, setSelectedConversation} = useConversation();
  

  useEffect(() => {
    //cleanup function (unmounts)
    return () => setSelectedConversation(null);
  },[])

  return (
    <div className='w-[80%] md:w-[60%] flex flex-col'>
      {!selectedConversation ? <NoChatSelected/> : (
        <>
        {/* Header */}
        <div className='bg-slate-500 px-4 py-2 mb-2'>
            <span className='label-text '>To: </span>
            <span className='text-gray-900 font-bold'>{selectedConversation?.fullName}</span>
        </div>

        <Messages/>
        <MessageInput/>
      </>
      )}
    </div>
  )
}

export default MessageContainer;


const NoChatSelected = () => {
  const { authUser } = useAuthContext();

  return (
    <div className="flex items-center justify-center w-full h-full">
      <div className="text-center px-6 sm:px-8 flex flex-col items-center gap-3">
        <p className="text-xl sm:text-2xl font-bold text-gray-100">
          Welcome to <span className="text-blue-400">ChatArena</span>! 👋
        </p>
        <p className="text-lg sm:text-xl text-gray-300">
          Hola amigo ⚡, <span className="font-semibold">{authUser.fullName}</span>
        </p>
        <p className="text-gray-400">
          Start a conversation with <span className="text-blue-300">AI Amigo</span> or select a chat to begin messaging.
        </p>
        <TiMessages className="text-6xl md:text-7xl text-blue-400 mt-2" />
      </div>
    </div>
  );
};

