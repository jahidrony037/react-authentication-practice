import React, { useState } from 'react';
import { useCreateUserWithEmailAndPassword, useUpdateProfile } from 'react-firebase-hooks/auth';
import { Link, useNavigate } from 'react-router-dom';
import SocialLogin from '../Login/SocialLogin/SocialLogin';
import auth from "./../../firebase.config";
import './Register.css';


const Register = () => {

    const navigate = useNavigate();
    const navigateLogin = () => {
        navigate('/login');
    }

    const [agree, setAgree] = useState(false);


    const [
        createUserWithEmailAndPassword,
        user,
        error

    ] = useCreateUserWithEmailAndPassword(auth, { sendEmailVerification: true });
    const [updateProfile] = useUpdateProfile(auth);


    // const nameRef = useRef("");
    // const emailRef = useRef("");
    // const passwordRef = useRef("");

    if (user) {
        console.log("user", user);
    }

    const handleRegistrationSubmit = async (e) => {
        e.preventDefault();
        // const name = nameRef.current.value;
        // const email = emailRef.current.value;
        // const password = passwordRef.current.value;

        const name = e.target.name.value;
        const email = e.target.email.value;
        const password = e.target.password.value;
        // const agree = e.target.terms.checked;


        await createUserWithEmailAndPassword(email, password);
        await updateProfile({ displayName: name });

        console.log('update profile');
        navigate('/home');

        // console.log(name);

    }



    return (
        <div className='register-form'>
            <h2 className='text-danger mt-2' style={{ textAlign: "center" }}>Please Register Here</h2>
            <form onSubmit={handleRegistrationSubmit}>
                <input type="text" name="name" placeholder='your name' />
                <input type="email" name='email' placeholder='your email' required />
                <input type="password" name="password" placeholder='your password' required />
                <input className='' onClick={() => setAgree(!agree)} type="checkbox" name="terms" id="terms" />
                {/* <label className={agree ? 'ps-2' : 'ps-2 text-danger'} htmlFor="terms">Accept Terms and Conditions</label> */}
                <label className={`ps-2 ${agree ? ' ' : 'text-danger'}`} htmlFor="terms">Accept Terms and Conditions</label>
                <input disabled={!agree}
                    type="submit"
                    className='w-50 mt-2 mx-auto btn btn-primary'
                    value="Register" />

            </form>
            <p>Already register? <Link to="/login" navigate={navigateLogin} className="text-primary text-decoration-none pe-auto">Login</Link> </p>
            <span>{error}</span>

            <SocialLogin />
        </div>
    );
};

export default Register;