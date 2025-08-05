import React from 'react'
import { GoogleLogin } from '@react-oauth/google';
import { FcGoogle } from 'react-icons/fc';
import { jwtDecode } from 'jwt-decode';
import { useNavigate } from 'react-router-dom';
import shareVideo from '../assets/share.mp4';
import logo from '../assets/logowhite.png';
import { client } from '../client';

const Login = () => {
    const navigate = useNavigate();
    const responseGoogle = (credentialResponse) => {
        try {
            const decoded = jwtDecode(credentialResponse.credential);
            localStorage.setItem('user', JSON.stringify(decoded));

            // Handle successful login
            const { name, sub: googleId, picture: imageUrl } = decoded;
            const doc = {
                _id: googleId,
                _type: 'user',
                userName: name,
                image: imageUrl,
            };

            
            client.createIfNotExists(doc)
                .then(() => {
                    navigate('/', { replace: true });
                })
        } catch (error) {
            console.error('Login error:', error);
        }
    };

    const handleError = () => {
        console.log('Login Failed');
    };

    return (
        <div className='flex flex-col justify-start items-center h-screen'>
            <div className='relative w-full h-full'>
                <video
                    src={shareVideo}
                    type="video/mp4"
                    loop
                    controls={false}
                    muted
                    autoPlay
                    className='w-full h-full object-cover'
                />
            </div>
            <div className='absolute flex flex-col justify-center items-center top-0 left-0 right-0 bottom-0 bg-blackOverlay'>
                <div className='p-5'>
                    <img src={logo} width="130px" alt="logo" />
                </div>
                <div className='shadow-2xl'>
                    <GoogleLogin
                        onSuccess={responseGoogle}
                        onError={handleError}
                        render={(renderProps) => (
                            <button
                                type="button"
                                className='bg-mainColor flex justify-center items-center p-3 rounded-lg cursor-pointer'
                                onClick={renderProps.onClick}
                                disabled={renderProps.disabled}
                            >
                                <FcGoogle className="mr-4" />
                                Sign in with Google
                            </button>
                        )}
                    />
                </div>
            </div>
        </div>
    )
}

export default Login
