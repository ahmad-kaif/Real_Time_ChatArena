import React from 'react'
import { FaSearchengin } from "react-icons/fa6";

const SearchInput = () => {
  return (
    <div>
      <form  className='flex items-center gap-2' >
        <input type="text" placeholder='Search...' className='input input-bordered rounded-full' />
        <button type='submit' className='btn btn-circle bg-yellow-500 text-white'>
        <FaSearchengin className='w-6 h-6 outline-none' />
        </button>
      </form>
    </div>
  )
}

export default SearchInput
