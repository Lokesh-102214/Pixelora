import React from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { IoMdAdd, IoMdSearch } from 'react-icons/io'
import GenerateImageButton from './TryAi';

const Navbar = ({ searchTerm, setSearchTerm, user }) => {
  const navigate = useNavigate();
  if (user) {
    return (
      <div className='flex gap-2 md:gap-5 w-full mt-5 pb-7'>
        <div className='flex justify-start items-center w-full px-2 rounded-md bg-white border-none outline-none focus-within:shadow-sm'>
          <IoMdSearch fontSize={21} className='ml-1' />
          <input
            type='text'
            placeholder='Search'
            onChange={(e) => { setSearchTerm(e.target.value) }}
            value={searchTerm}
            onFocus={() => navigate('/search')}
            className='p-2 w-full bg-white outline-none'
          />
        </div>
        <div className='flex gap-4 flex-shrink-0'>
          <Link to='/try-ai'>
            <GenerateImageButton />
          </Link>
          <Link to={`/user-profile/${user?._id}`} className='hidden md:block'>
            <img src={user.image} alt='user-profile' className='w-12 h-12 rounded-lg' />
          </Link>
          <Link to='/create-pin' className='bg-red-400 text-white rounded-full w-12 h-12 md:w-14 md:h-12 flex justify-center items-center'>
            <IoMdAdd fontSize={20} />
          </Link>
        </div>
      </div>
    )
  }
  return null
};

export default Navbar;
