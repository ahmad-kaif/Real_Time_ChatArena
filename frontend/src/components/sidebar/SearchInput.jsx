import React, { useState } from 'react'
import { FaSearchengin } from "react-icons/fa6";
import useConversation from '../../zustand/useConversation';
import useGetConversations from '../../hooks/useGetConversations'
import toast from 'react-hot-toast';

const SearchInput = () => {
  const [search,setSearch] = useState("");
  const {setSelectedConversation} = useConversation();
  const {conversations} = useGetConversations();
  
  const handleSubmit = (e) => {
    e.preventDefault();
    if(!search) return;
    if(search.length < 3){
      return toast.error("Search item must be atleast 3 characters long")
    }

    const conversation = conversations.find((c) => c.fullName.toLowerCase().includes(search.toLowerCase()) );
    if(conversation){
      setSelectedConversation(conversation);
      setSearch("");
    }else{
      toast.error("OOPS! No such user found")
    }

  }


  return (
    <div>
      <form  className='flex items-center gap-2' onSubmit={handleSubmit} >
        <input type="text" placeholder='Search...' className='input input-bordered rounded-full'
        value={search}
        onChange={(e) => setSearch(e.target.value)}
        />
        <button type='submit' className='btn btn-circle bg-blue-500 text-white'>
        <FaSearchengin className='w-6 h-6 outline-none' />
        </button>
      </form>
    </div>
  )
}

export default SearchInput
