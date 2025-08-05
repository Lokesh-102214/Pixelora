import React, { useState, useEffect } from 'react'
import { useParams, useNavigate } from 'react-router-dom'
import { googleLogout } from '@react-oauth/google';
import { AiOutlineLogout } from 'react-icons/ai';
import { userCreatedPinsQuery, userQuery, userSavedPinsQuery } from "../utilis/data";
import { client } from '../client'
import Spinner from './Spinner'
import MasonryLayout from './MasonryLayout'
import { fetchUser } from '../utilis/FetchUser';

const bannerImages = [
  'https://images.pexels.com/photos/1714208/pexels-photo-1714208.jpeg?auto=compress&cs=tinysrgb&w=1600&h=900&fit=crop', // Mountain landscape
  'https://images.pexels.com/photos/1323550/pexels-photo-1323550.jpeg?auto=compress&cs=tinysrgb&w=1600&h=900&fit=crop', // Abstract gradient
  'https://images.pexels.com/photos/574071/pexels-photo-574071.jpeg?auto=compress&cs=tinysrgb&w=1600&h=900&fit=crop', // Ocean waves
  'https://images.pexels.com/photos/1166209/pexels-photo-1166209.jpeg?auto=compress&cs=tinysrgb&w=1600&h=900&fit=crop', // Forest path
  'https://images.pexels.com/photos/1292115/pexels-photo-1292115.jpeg?auto=compress&cs=tinysrgb&w=1600&h=900&fit=crop', // Sky clouds
  'https://images.pexels.com/photos/1591373/pexels-photo-1591373.jpeg?auto=compress&cs=tinysrgb&w=1600&h=900&fit=crop', // Geometric pattern
  'https://images.pexels.com/photos/1779487/pexels-photo-1779487.jpeg?auto=compress&cs=tinysrgb&w=1600&h=900&fit=crop', // Northern lights
  'https://images.pexels.com/photos/2662116/pexels-photo-2662116.jpeg?auto=compress&cs=tinysrgb&w=1600&h=900&fit=crop', // Abstract blue
];

// Pick a random banner image
const randomImage = bannerImages[Math.floor(Math.random() * bannerImages.length)];

const UserProfile = () => {
  const [user, setUser] = useState(null);
  const [pins, setPins] = useState(null);
  const [text, setText] = useState('Created');
  const [activeBtn, setActiveBtn] = useState('created');
  const [showLogoutConfirm, setShowLogoutConfirm] = useState(false);
  const navigate = useNavigate();
  const { userId } = useParams();
  
  // Get current logged-in user
  const currentUser = fetchUser();

  // Show logout confirmation
  const handleLogoutClick = () => {
    setShowLogoutConfirm(true);
  };

  // Confirm logout
  const confirmLogout = () => {
    googleLogout();
    localStorage.clear();
    navigate('/login');
  };

  // Cancel logout
  const cancelLogout = () => {
    setShowLogoutConfirm(false);
  };

  useEffect(() => {
    const query = userQuery(userId);
    client.fetch(query)
      .then((data) => {
        setUser(data[0]);
      })
      .catch((error) => {
        console.error('Error fetching user:', error);
      });
  }, [userId]);

  useEffect(() => {
    if (text === 'Created') {
      const createdPinsQuery = userCreatedPinsQuery(userId);
      client.fetch(createdPinsQuery)
        .then((data) => {
          setPins(data);
        });
    } else if (text === 'Saved') {
      const savedPinsQuery = userSavedPinsQuery(userId);
      client.fetch(savedPinsQuery)
        .then((data) => {
          setPins(data);
        });
    }
  }, [text, userId]);

  if (!user) {
    return <Spinner message="Loading profile..." />
  }

  return (
    <div className='relative pb-2 h-full justify-center items-center'>
      <div className='flex flex-col pb-5'>
        <div className='relative flex flex-col mb-7'>
          <div className='flex flex-col justify-center items-center'>
            <img src={randomImage} className='w-full h-370 2xl:h-510 mt-6 shadow-lg object-cover' alt='banner' />
            <img src={user.image} className='rounded-full w-20 h-20 -mt-10 shadow-xl object-cover' alt='user-profile' />
            <h1 className='font-bold text-3xl text-center mt-3'>{user.userName}</h1>
            
            <div className='absolute top-0 z-1 right-0 p-2 mt-6'>
              {/* Check if viewing own profile */}
              {currentUser?.sub === user._id && (
                <button
                  type="button"
                  className='bg-white p-2 rounded-full cursor-pointer outline-none shadow-md hover:shadow-lg transition-shadow'
                  onClick={handleLogoutClick}
                >
                  <AiOutlineLogout color='red' fontSize={21} />
                </button>
              )}
            </div>
          </div>
          <div className='text-center mb-7 mt-5'>
            <button
              type="button"
              onClick={() => {
                setText('Created');
                setActiveBtn('created');
              }}
              className={`mr-40 text-lg font-semibold ${activeBtn === 'created' ? 'text-black  underline underline-offset-8 ' : 'text-gray-500'}`}
            >
              Created
            </button>
            <button
              type="button"
              onClick={() => {
                setText('Saved');
                setActiveBtn('saved');
              }}
              className={`mr-4 text-lg font-semibold ${activeBtn === 'saved' ? 'text-black  underline underline-offset-8 ' : 'text-gray-500'}`}
            >
              Saved
            </button>
          </div>
          {pins?.length ? (
            <div className='px-2'>
            <MasonryLayout pins={pins} />
          </div>)
            : (
            <div className='flex justify-center items-center w-full text-xl font-bold mt-2'>
              No Pins Found!
            </div>
          )}
        </div>
      </div>

      {/* Logout Confirmation Modal */}
      {showLogoutConfirm && (
        <div className='fixed inset-0 bg-blackOverlay flex items-center justify-center z-50'>
          <div className='bg-white rounded-lg p-6 mx-4 max-w-sm w-full shadow-2xl'>
            <div className='text-center'>
              <h3 className='text-lg font-semibold text-gray-900 mb-4'>
                Confirm Logout
              </h3>
              <p className='text-gray-600 mb-6'>
                Are you sure you want to logout?
              </p>
              <div className='flex gap-4 justify-center'>
                <button
                  type="button"
                  onClick={cancelLogout}
                  className='px-4 py-2 bg-gray-300 text-gray-700 rounded-lg font-medium hover:bg-gray-400 transition-colors outline-none'
                >
                  Cancel
                </button>
                <button
                  type="button"
                  onClick={confirmLogout}
                  className='px-4 py-2 bg-red-500 text-white rounded-lg font-medium hover:bg-red-600 transition-colors outline-none'
                >
                  Logout
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}

export default UserProfile
