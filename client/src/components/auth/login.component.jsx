import React, { useState, useEffect, useRef } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link, Redirect, withRouter } from 'react-router-dom';
import FacebookLogin from 'react-facebook-login';
import { login, oauthFacebook } from '../../redux/auth/auth.actions';

const Login = ({ history }) => {
  const inputRef = useRef(null);
  const { isAuthenticated } = useSelector((state) => state.auth);
  const dispatch = useDispatch();
  const [formData, setFormData] = useState({
    email: '',
    password: ''
  });

  const { email, password } = formData;

  useEffect(() => {
    inputRef.current && inputRef.current.focus();
  }, []);

  const responseFacebook = async (res) => {
    dispatch(oauthFacebook(res.accessToken));
    history.push('/dashboard');
  };

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
      </form>
      <FacebookLogin
        appId='1327638704100654'
        textButton='Login with facebook'
        fields='name,email,picture'
        callback={responseFacebook}
        cssClass='btn btn-facebook mt-10'
        icon={<i className='fab fa-facebook-f mr-5' />}
      />
      <p className='my-1'>
        Don't have an account? <Link to='/register'>Sign Up</Link>
      </p>
    </>
  );
};

export default withRouter(Login);
