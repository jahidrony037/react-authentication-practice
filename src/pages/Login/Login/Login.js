import React, { useRef } from 'react';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import { useSendPasswordResetEmail, useSignInWithEmailAndPassword } from 'react-firebase-hooks/auth';
import { Link, useLocation, useNavigate } from "react-router-dom";
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import SocialLogin from '../SocialLogin/SocialLogin';
import auth from './../../../firebase.config';

const Login = () => {
    const [
        signInWithEmailAndPassword,
        user, error
    ] = useSignInWithEmailAndPassword(auth);

    const [sendPasswordResetEmail] = useSendPasswordResetEmail(
        auth
    );
    let elementError;
    let location = useLocation();
    const navigate = useNavigate()
    const emailRef = useRef("");
    const passwordRef = useRef("");

    let from = location.state?.from?.pathname || "/";

    const navigateRegister = () => {
        navigate('/register');
    }

    if (user) {
        console.log(user);
    }

    if (user) {
        navigate(from, { replace: true });

    }

    const handleSubmit = (e) => {
        e.preventDefault();
        const email = emailRef.current.value;
        const password = passwordRef.current.value;
        // const email = e.target.email.value;
        // const password = e.target.password.value;

        signInWithEmailAndPassword(email, password)

    }

    if (error) {
        elementError = <div>
            <p className='text-danger'>Error: {error?.message} </p>
        </div>
    }



    const resetPassword = async () => {
        const email = emailRef.current.value;
        if (email) {
            await sendPasswordResetEmail(email);
            toast("sent mail");
        }
        else {
            toast("Enter your mail address");
        }
    }
    return (
        <div className='container w-50 mx-auto'>
            <h2 className='text-primary text-center mt-2'>Please Login Here</h2>
            <Form onSubmit={handleSubmit}>
                <Form.Group className="mb-3" controlId="formBasicEmail">
                    <Form.Control type="email" ref={emailRef} placeholder="Enter email" />
                </Form.Group>
                <Form.Group className="mb-3 mt-2" controlId="formBasicPassword">
                    <Form.Control type="password" ref={passwordRef} placeholder="Password" />
                </Form.Group>

                <Button variant="primary w-50 mx-auto mb-2" type="submit">
                    Login
                </Button>
            </Form>
            <p>new register? <Link to="/register" onClick={navigateRegister} className="text-primary text-decoration-none pe-auto">Register</Link> </p>
            <p>reset Password? <button onClick={resetPassword} className=" btn btn-link text-primary text-decoration-none pe-auto">Reset Password</button> </p>
            <span className='text-danger'>{elementError}</span>
            <SocialLogin />
            <ToastContainer />
        </div>


    );
};

export default Login;