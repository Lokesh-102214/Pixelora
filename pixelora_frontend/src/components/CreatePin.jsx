import React, { useState, useEffect } from 'react'
import { AiOutlineCloudUpload } from 'react-icons/ai'
import { MdDelete } from 'react-icons/md'
import { useNavigate } from 'react-router-dom';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

import { client } from '../client'
import { categories } from '../utilis/data'
import Spinner from './Spinner'

const CreatePin = ({ user }) => {
  const [title, setTitle] = useState('');
  const [about, setAbout] = useState('');
  const [destination, setDestination] = useState('');
  const [imageUploading, setImageUploading] = useState(false); // Separate state for image upload
  const [savingPin, setSavingPin] = useState(false); // Separate state for saving pin
  const [fields, setFields] = useState(false);
  const [category, setCategory] = useState(null);
  const [imageAsset, setImageAsset] = useState(null);
  const [wrongImageType, setWrongImageType] = useState(false);


  const navigate = useNavigate();

  // Show toast notification when fields is true
  useEffect(() => {
    if (fields) {
      toast.error('Please fill in all the fields!', {
        position: 'top-right',
        autoClose: 2000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
      });
      setFields(false); // Reset to prevent multiple toasts
    }
  }, [fields]);

  const uploadImage = (e) => {
    const { type, name } = e.target.files[0];
    if (type === 'image/png' || type === 'image/jpeg' || type === 'image/jpg' || type === 'image/webp' || type === 'image/gif' || type === 'image/svg') {
      setWrongImageType(false);
      setImageUploading(true); // Use imageUploading state
      client.assets
        .upload('image', e.target.files[0], { contentType: type, filename: name })
        .then((document) => {
          setImageAsset(document);
          setImageUploading(false); // Reset imageUploading state
        })
        .catch((error) => {
          console.error('Image Upload error:', error);
          setImageUploading(false); // Reset imageUploading state
        });
    }
    else {
      setWrongImageType(true);
    }
  }

  const savePin = () => {
    if (title && about && destination && imageAsset?._id && category) {
      setSavingPin(true); // Use savingPin state
      
      const doc = {
        _type: 'pin',
        title,
        about,
        destination,
        image: {
          _type: 'image',
          asset: {
            _type: 'reference',
            _ref: imageAsset?._id
          }
        },
        userId: user._id,
        postedBy: {
          _type: 'postedBy',
          _ref: user._id
        },
        category,
      };

      client.create(doc)
        .then(() => {
          setSavingPin(false); // Reset savingPin state
          toast.success('Pin saved successfully!', {
            position: 'top-right',
            autoClose: 2000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
          });
          
          // Navigate after a short delay to let user see the success message
          setTimeout(() => {
            navigate('/');
            window.location.reload();
          }, 1000);
        })
        .catch((error) => {
          setSavingPin(false); // Reset savingPin state
          console.error('Error saving pin:', error);
          toast.error('Failed to save pin. Please try again.', {
            position: 'top-right',
            autoClose: 2000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
          });
        });
    } else {
      setFields(true);
    }
  }

  return (
    <div className='flex flex-col justify-center items-center mt-5 lg:h-4/5'>
      <ToastContainer />

      <div className='flex lg:flex-row flex-col justify-center items-center bg-white lg:p-5 p-3 lg:w-5/6 w-full'>
        <div className='bg-secondaryColor p-3 flex flex-1 w-full'>
          <div className='flex justify-center items-center flex-col border-2 border-dotted border-gray-300 p-3 w-full h-420'>
            {imageUploading && <Spinner />} {/* Use imageUploading state */}
            {wrongImageType && <p>Wrong Image Type</p>}
            {!imageAsset ? (
              <label>
                <div className='flex flex-col justify-center items-center h-full cursor-pointer'>
                  <div className='flex flex-col justify-center items-center '>
                    <p className='text-2xl font-bold'>
                      <AiOutlineCloudUpload />
                    </p>
                    <p className='text-lg'>Click to Upload</p>
                  </div>
                  <p className='mt-32 text-gray-400'>
                    Use high-quality JPG, JPEG , SVG, PNG, GIF less than 20 MB
                  </p>
                </div>
                <input
                  type="file"
                  name='upload-image'
                  onChange={uploadImage}
                  className='w-0 h-0'
                />
              </label>

            ) : (
              <div className='relative h-full'>
                <img src={imageAsset?.url} alt='uploaded-pic' className='w-full h-full' />
                <button
                  type='button'
                  className='absolute bottom-3 right-3 p-3 rounded-full bg-white text-xl cursor-pointer outline-none hover:shadow-md transition-all duration-500 ease-in-out'
                  onClick={() => setImageAsset(null)}
                >
                  <MdDelete />
                </button>
              </div>
            )}
          </div>
        </div>
        <div className='flex flex-col gap-6 lg:pl-5 mt-5 w-full flex-1'>
          <input
            type='text'
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            placeholder='Add your title here'
            className='outline-none text-2xl sm:text-3xl font-bold border-b-2 border-gray-200 p-2'
          />
          {user && (
            <div className='flex gap-2 my-2 items-center bg-white rounded-lg'>
              <img src={user.image}
                className='w-10 h-10 rounded-full'
                alt='user-profile' />
              <p className='font-bold'>{user.userName}</p>
            </div>

          )}
          <input
            type='text'
            value={about}
            onChange={(e) => setAbout(e.target.value)}
            placeholder='What is your pin about?'
            className='outline-none text-base sm:text-lg border-b-2 border-gray-200 p-2'
          />
          <input
            type='url'
            value={destination}
            onChange={(e) => setDestination(e.target.value)}
            placeholder='Add a destination link'
            className='outline-none text-base sm:text-lg border-b-2 border-gray-200 p-2'
          />
          <div className='flex flex-col'>
            <div>
              <p className='mb-2 font-semibold text-lg sm:text-xl'>Choose Pin Category</p>
              <select
                onChange={(e) => setCategory(e.target.value)}
                className='outline-none w-4/5 text-base border-b-2 border-gray-200 p-2 rounded-md cursor-pointer'
              >
                <option value="other" className='bg-white'>Select Category</option>
                {categories.map((category) => (
                  <option
                    key={category.name}
                    className='text-base border-0 outline-none capitalize bg-white text-black'
                    value={category.name}
                  >
                    {category.name}
                  </option>
                ))}
              </select>

            </div>
            <div className='flex justify-end items-end mt-5'>
              <button
                type='button'
                onClick={savePin}
                className='bg-red-500 text-white font-bold p-2 rounded-full w-28 h-10 outline-none flex items-center justify-center'
                disabled={savingPin}
              >
                {savingPin ? (
                  <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white"></div>
                ) : (
                  'Save Pin'
                )}
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>

  );
}

export default CreatePin;

