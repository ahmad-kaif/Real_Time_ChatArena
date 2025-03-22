
import SearchInput from './SearchInput'
import Conversations from './Conversations'
import LogoutButton from './LogoutButton.jsx'


const Sidebar = () => {
  return (
    <div className=' w-[30%] border-r border-slate-500 p-4 flex flex-col'>
      <SearchInput/>
      <div className='divider px-3'>Contacts</div>
      <Conversations/>
      <LogoutButton/> 

    </div>
  )
}

export default Sidebar
