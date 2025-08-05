import React from 'react'
import {FadeLoader} from 'react-spinners'


const Spinner = ({message}) => {
  return (
    <div className='flex flex-col justify-center items-center w-full h-full'>
        <FadeLoader
            color="#00BFFF"
            size={60}
            className="m-5"
        />
        <p className='text-lg text-center px-2'>{message}</p>  
    </div>
  )
}

export default Spinner;
