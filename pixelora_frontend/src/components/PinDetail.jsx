import React, { useState, useEffect } from 'react'
import { MdDownloadForOffline } from 'react-icons/md'
import { Link, useParams } from 'react-router-dom'
import { v4 as uuidv4 } from 'uuid'

import { client, urlFor } from '../client'
import Spinner from './Spinner'
import MasonryLayout from './MasonryLayout'
import { pinDetailMorePinQuery, pinDetailQuery } from '../utilis/data'
import { GrUploadOption } from "react-icons/gr";
import { LiaSpinnerSolid } from "react-icons/lia";


const PinDetail = ({ user }) => {
  const [pins, setPins] = useState(null);
  const [pinDetails, setPinDetails] = useState(null);
  const [comment, setComment] = useState('');
  const [addingComment, setAddingComment] = useState(false);

  const { pinId } = useParams();




  const addComment = () => {
    if (comment) {
      setAddingComment(true);
      const commentToAdd = {
        comment,
        _key: uuidv4(),
        postedBy: {
          _type: 'postedBy',
          _ref: user._id,
        }
      };
      client
        .patch(pinId)
        .setIfMissing({ comments: [] })
        .insert('after', 'comments[-1]', [commentToAdd])
        .commit()
        .then(() => {
          setTimeout(() => {
            fetchPinDetails();
          }, 100);
          setComment('');
          setAddingComment(false);
        }
        )
        .catch((error) => { // Add error handling
          console.error('Error adding comment:', error);
          setAddingComment(false); // Reset loading state even if error occurs
        });
    }
  };

  const fetchPinDetails = () => {
    let query = pinDetailQuery(pinId);
    if (query) {
      client.fetch(query)
        .then((data) => {
          setPinDetails(data[0]);
          if (data[0]) {
            const morePinQuery = pinDetailMorePinQuery(data[0]);
            client.fetch(morePinQuery)
              .then((res) => {
                setPins(res);
              });
          }
        })
        .catch((error) => {
          console.error("Error fetching pin details:", error);
        });
    }
  }

  // UseEffect is always used above all the if statements
  useEffect(() => {
    fetchPinDetails();
  }, [pinId]);



  if (!pinDetails) return <Spinner message="Loading Pin ..." />;

  return (
    <>
      <div className='flex xl:flex-column flex-col m-auto bg-white rounded-lg' style={{ maxWidth: '1500px', borderRadius: '32px' }}>
        <div className='flex justify-center items-center md:items-start flex-initial relative'>
          <img
            src={pinDetails?.image && urlFor(pinDetails.image).url()}
            className='rounded-t-lg rounded-b-lg' alt="user-post" />

          {/* Position at bottom right relative to image container */}
          <div className='absolute bottom-1 right-1 flex items-center gap-2'>
            <a
              href={`${pinDetails.image?.asset?.url}?dl=`}
              download
              onClick={(e) => e.stopPropagation()}
              className='bg-white w-9 h-9 rounded-full flex items-center justify-center text-dark text-xl opacity-75 hover:opacity-100 hover:shadow-md outline-none'
            >
              <MdDownloadForOffline size={20} />
            </a>
            <a
              href={pinDetails?.destination}
              target="_blank"
              rel="noreferrer"
              className='bg-white flex items-center gap-2 text-black p-2 pl-4 pr-4 rounded-full opacity-75 hover:opacity-100 hover:shadow-md'
            >
              Visit Source
            </a>
          </div>
        </div>
        <div className='w-full p-5 flex-1 xl:min-w-620'>

          <div>
            <h1 className='text-4xl font-bold break-words mt-3'>{pinDetails.title}</h1>
            <p className='mt-3'>{pinDetails.about}</p>
          </div>
          <Link to={`/user-profile/${pinDetails.postedBy?._id}`} className='flex gap-2 mt-5 items-center bg-white rounded-lg'>
            <img src={pinDetails.postedBy?.image} className='w-10 h-10 rounded-full' alt="user-profile" />
            <p className='font-bold'>{pinDetails.postedBy?.userName}</p>
          </Link>
          <h2 className='mt-5 text-xl'>Comments</h2>
          <hr />

          <div className='max-h-370 overflow-y-auto'>
            {pinDetails?.comments?.map((comment, index) => (
              <div key={index} className='flex gap-2 mt-5 items-center bg-white rounded-lg'>
                <img src={comment?.postedBy?.image} className='w-10 h-10 rounded-full cursor-pointer' alt="user-profile" />
                <div className='flex flex-col'>
                  <p className='font-bold'>{comment?.postedBy?.userName}</p>
                  <p>{comment?.comment}</p>
                </div>
              </div>
            ))}
          </div>

          <div className='flex flex-wrap mt-6 gap-3'>
            <Link to={`/user-profile/${user?._id}`} className='flex gap-2 items-center bg-white rounded-lg cursor-pointer'>
              <img src={user?.image} className='w-10 h-10 rounded-full' alt="user-profile" />
            </Link>
            <input
              type="text"
              placeholder="Add a comment..."
              value={comment}
              onChange={(e) => setComment(e.target.value)}
              className='flex-1 border-gray-100 rounded-2xl outline-none border-2 p-2 focus:border-gray-300 focus:ring-2 focus:ring-gray-200'
            />
            <button
              type="button"
              onClick={addComment}
              className='bg-red-500 text-white font-bold p-2 rounded-2xl outline-none disabled:opacity-50 disabled:cursor-not-allowed hover:bg-red-600 transition duration-200'
            >
              {addingComment ? <LiaSpinnerSolid className="text-2xl animate-spin" /> : <GrUploadOption className="text-2xl" />}
            </button>
          </div>
        </div>
      </div>
      {pins?.length > 0 ? (
        <>
          <h2 className='text-center font-bold text-2xl mt-8 mb-4'>More like this</h2>
          <MasonryLayout pins={pins} />
        </>
      ) : (
        <Spinner message="Loading more pins..." />
      )}
    </>

  )

}

export default PinDetail
