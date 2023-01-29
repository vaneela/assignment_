import React, { useState } from 'react'
import './AuthSection.css'
import TwitterIcon from '@material-ui/icons/Twitter'
import { useDispatch, useSelector } from 'react-redux';
import FormValidation from './FormValidation';
import { logIn, signUp } from '../../actions/AuthActions';

const AuthSection = () => {
    const dispatch = useDispatch();
    const isLoading = useSelector((state) => state.AuthReducer.loading);
    const [SignupPage, setSignupPage] = useState(true);

    const [data, setData] = useState({ firstname: "", lastname: "", email: "", username: "", password: "", confirmpassword: "" });

    const handleChange = (e) => {
        setData({ ...data, [e.target.name]: e.target.value });
    }

    const resetForm = () => {
        setData({ firstname: "", lastname: "", email: "", username: "", password: "", confirmpassword: "" })
    }

    const submitHandler = (e) => {
        e.preventDefault();
        var isValid = FormValidation();
        if (isValid) {
            SignupPage ? dispatch(signUp(data)) : dispatch(logIn(data))
        }
    }
    return (
        <div className='AuthSection'>
            <div className='logoName'>
                <TwitterIcon />
                <span>
                    LearnerSync
                </span>
            </div>
            {SignupPage ?
                <form className='signUpForm' onSubmit={submitHandler}>
                    <div>
                        <div className='input-field'>
                            <input id='firstname' type='text' name='firstname' placeholder='First Name' onChange={handleChange} value={data.firstname}></input>
                            <span className='input warning-text'></span>
                        </div>
                        <div className='input-field'>
                            <input id='lastname' type='text' name='lastname' placeholder='Last Name' onChange={handleChange} value={data.lastname}></input>
                            <span className='input warning-text'></span>
                        </div>
                    </div>
                    <div>
                        <div className='input-field'>
                            <input id='email' type='email' name='email' placeholder='Email' onChange={handleChange} value={data.email}></input>
                            <span className='input warning-text'></span>
                        </div>
                        <div className='input-field'>
                            <input id='username' type='text' name='username' placeholder='Username' onChange={handleChange} value={data.username}></input>
                            <span className='input warning-text'></span>
                        </div>
                    </div>
                    <div>
                        <div className='input-field'>
                            <input id='password' type='password' name='password' placeholder='Password' onChange={handleChange} value={data.password}></input>
                            <span className='input warning-text'></span>
                        </div>
                        <div className='input-field'>
                            <input id='confirmpassword' type='password' name='confirmpassword' placeholder='Confirm Password' onChange={handleChange} value={data.confirmpassword}></input>
                            <span className='input warning-text'></span>
                        </div>
                    </div>
                    <span className='formRedirect-link' onClick={() => { setSignupPage((prev) => !prev); resetForm() }}>
                        Already have an account? Login
                    </span>
                    <button type='submit' name='signup' className='button submit-btn' disabled={isLoading}>{isLoading ? "Loading..." : "Signup"}</button>
                </form>
                :
                <form className='logInForm' onSubmit={submitHandler}>
                    <div>
                        <div className='input-field'>
                            <input id='username' type='text' name='username' placeholder='Username' onChange={handleChange} value={data.username}></input>
                            <span className='input warning-text'></span>
                        </div>
                        <div className='input-field'>
                            <input id='password' type='password' name='password' placeholder='Password' onChange={handleChange} value={data.password}></input>
                            <span className='input warning-text'></span>
                        </div>
                    </div>
                    <span className='formRedirect-link' onClick={() => { setSignupPage((prev) => !prev); resetForm() }}>
                        Don't have an account? Signup
                    </span>
                    <button type='submit' name='login' className='button submit-btn' disabled={isLoading}>{isLoading ? "Loading..." : "Login"}</button>
                </form>}
        </div>
    )
}

export default AuthSection