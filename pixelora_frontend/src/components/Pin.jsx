import React, { useState } from 'react'

import { Link, useNavigate } from 'react-router-dom'
import { v4 as uuidv4 } from 'uuid';
import { MdDownloadForOffline } from 'react-icons/md';
import { AiTwotoneDelete } from 'react-icons/ai';
import { BsFillArrowUpRightCircleFill } from 'react-icons/bs';
import { fetchUser } from '../utilis/FetchUser';



import { urlFor, client } from '../client'


const Pin = ({ pin: { postedBy, image, _id, destination, save } }) => {
  const [postHovered, setPostHovered] = useState(false);
  const navigate = useNavigate();
  const user = fetchUser();




  const alreadySaved = !!(save?.filter((item) => item.postedBy._id === user?.sub))?.length;
  const savePin = (id) => {
    if (!alreadySaved) {
      const updatedSave = [{
        _key: uuidv4(),
        userId: user.sub,
        postedBy: {
          _type: 'postedBy',
          _ref: user.sub,
        },
      }];

      client
        .patch(id)
        .setIfMissing({ save: [] })
        .insert('after', 'save[-1]', updatedSave)
        .commit()
        .then(() => {
          setTimeout(() => {
            window.location.reload();
          }, 500);
        });
    }
  }

  const deletePin = (id) => {
    client
      .delete(id)
      .then(() => {
        window.location.reload();
      });
  }

  return (
    <div className='m-2'>
      <div
        onMouseEnter={() => setPostHovered(true)}
        onMouseLeave={() => setPostHovered(false)}
        onClick={() => navigate(`/pin-detail/${_id}`)}
        className='relative cursor-zoom-in w-auto hover:shadow-lg rounded-lg overflow-hidden transition-all duration-500 ease-in-out'
      >
        <img src={urlFor(image).width(350).url()} alt="user-post" className='rounded-lg w-full' />
        {postHovered && (
          <div className='absolute top-0 left-0 w-full h-full flex flex-col justify-between p-1 pr-2 pb-2 pt-2 z-50'
            style={{ height: '100%' }}
          >
            <div className='flex items-center justify-between'>
              <div className='flex gap-2'>
                <a
                  href={`${image?.asset?.url}?dl=`}
                  download
                  onClick={(e) => e.stopPropagation()}
                  className='bg-white w-9 h-9 rounded-full flex items-center justify-center text-dark text-xl opacity-75 hover:opacity-100 hover:shadow-md outline-none'
                >
                  <MdDownloadForOffline className='text-black' />
                </a>
              </div>

              {alreadySaved ? (
                <button
                  type='button'
                  className='bg-red-500 opacity-70 hover:opacity-100 text-white font-bold p-1 rounded-full text-base outline-none hover:shadow-md'>
                  {save?.length} Saved
                </button>
              ) : (
                <button
                  type='button'
                  className='bg-red-500 opacity-70 hover:opacity-100 text-white font-bold p-1 rounded-full text-base outline-none hover:shadow-md'
                  onClick={(e) => {
                    e.stopPropagation();
                    savePin(_id);
                  }}>
                  Save
                </button>
              )}
            </div>
            <div className='flex justify-between items-center gap-2 w-full'>
              {destination && (
                <a
                  href={destination}
                  target='_blank'
                  rel='noreferrer'
                  onClick={(e) => e.stopPropagation()}
                  className='bg-white flex items-center gap-2 text-black font-bold p-2 pl-4 pr-4 rounded-full opacity-70 hover:opacity-100 hover:shadow-md'
                >
                  <BsFillArrowUpRightCircleFill />
                  {destination.length > 15 ? destination.slice(8, 15) : destination.slice(8)}
                </a>
              )}
              {postedBy?._id === user?.sub && (
                <button
                  type='button'
                  className='bg-white p-2 opacity-75 hover:opacity-100 text-dark font-bold text-base rounded-full outline-none hover:shadow-md'
                  onClick={(e) => {
                    e.stopPropagation();
                    deletePin(_id);
                  }}
                >
                  <AiTwotoneDelete />
                </button>
              )

              }
            </div>
          </div>
        )}
      </div>
      <Link to={`/user-profile/${postedBy?._id}`} className='flex gap-2 mt-2 items-center'>
        <img src={postedBy?.image} className='w-8 h-8 rounded-full object-cover' alt="user-profile" />
        <p className='font-semibold capitalize'>{postedBy?.userName}</p>
      </Link>
    </div>
  )
}


export default Pin;
