import React from 'react';
import { useSignInWithGithub, useSignInWithGoogle } from 'react-firebase-hooks/auth';
import { useNavigate } from 'react-router-dom';
import auth from './../../../firebase.config';
import './SocialLogin.css';
const SocialLogin = () => {
    const navigate = useNavigate();
    const [signInWithGoogle, user, error] = useSignInWithGoogle(auth);
    const [signInWithGithub, user1, error1] = useSignInWithGithub(auth);
    let errorElement;
    if (error || error1) {

        errorElement = <div>
            <p className='text-danger'>Error: {error?.message} {error1?.message}</p>
        </div>

    }

    if (user || user1) {
        navigate('/home');
    }
    return (
        <div>
            <div className='d-flex align-items-center'>
                <div style={{ height: "1px" }} className='bg-primary w-50'></div>
                <p className='mt-2 px-2'>or</p>
                <div style={{ height: "1px" }} className='bg-primary w-50'></div>
            </div>
            {errorElement}
            <div>
                <button onClick={() => signInWithGoogle()}
                    className='btn btn-info d-block mx-auto w-50'>
                    <img src="https://i.ibb.co/mcHXpPb/google-logo-png-webinar-optimizing-for-success-google-business-webinar-13-1.png" alt="" />
                    <span className="text-white px-3">Google Sign IN </span>
                </button>
            </div>
            <div className='my-3'>
                <button className='btn btn-info d-block mx-auto w-50'>
                    <img src="https://i.ibb.co/82h66sw/Facebook-logo-1.png" alt="" />
                    <span className="text-white px-3">Facebook sign in </span>
                </button>
            </div>
            <div className='my-3'>
                <button onClick={() => signInWithGithub()}
                    className='btn btn-primary d-block mx-auto w-50'>
                    <img src="https://i.ibb.co/Wp2sbjV/25231-1.png" alt="" />
                    <span className="text-white px-3">Github sign in </span>
                </button>
            </div>
        </div>
    );
};

export default SocialLogin;