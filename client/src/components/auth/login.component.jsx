import React, { useState, useEffect, useRef } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link, Redirect } from 'react-router-dom';
import { login } from '../../redux/auth/auth.actions';

import facebookIcon from '../../assets/images/facebook-32.png';

const Login = () => {
  const inputRef = useRef(null);
  const { isAuthenticated } = useSelector((state) => state.auth);
  const dispatch = useDispatch();
  const [formData, setFormData] = useState({
    email: '',
    password: ''
  });

  const { email, password } = formData;

  useEffect(() => {
    inputRef.current.focus();
  }, []);

  const handleChange = (e) =>
    setFormData({ ...formData, [e.target.name]: e.target.value });

  const handleSubmit = async (e) => {
    e.preventDefault();
    dispatch(login(formData));
  };

  // Redirect if logged in
  if (isAuthenticated) {
    return <Redirect to='/dashboard' />;
  }

  return (
    <>
      <h1 className='large text-primary'>Sign In</h1>
      <p className='lead'>
        <i className='fas fa-user'></i> Sign Into Your Account
      </p>
      <form className='form' onSubmit={handleSubmit}>
        <div className='form-group'>
          <input
            type='email'
            placeholder='Email Address'
            name='email'
            value={email}
            onChange={handleChange}
            ref={inputRef}
          />
        </div>
        <div className='form-group'>
          <input
            type='password'
            placeholder='Password'
            name='password'
            value={password}
            onChange={handleChange}
          />
        </div>
        <input type='submit' className='btn btn-primary' value='Login' />
        <button type='submit' className='btn btn-facebook'>
          <img src={facebookIcon} className='fb-icon' alt='fb-logo' />
          Login with facebook
        </button>
      </form>
      <p className='my-1'>
        Don't have an account? <Link to='/register'>Sign In</Link>
      </p>
    </>
  );
};

export default Login;
