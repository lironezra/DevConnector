import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link, withRouter } from 'react-router-dom';

import { getProfileById } from '../../redux/profile/profile.actions';

import Spinner from '../layout/spinner/spinner.component';

const Profile = ({ match }) => {
  const dispatch = useDispatch();
  const { loading: profileLoading, profile } = useSelector(
    (state) => state.profile
  );
  const { isAuthenticated, loading: authLoading, user: authUser } = useSelector(
    (state) => state.auth
  );

  useEffect(() => {
    dispatch(getProfileById(match.params.id));
  }, [dispatch]);

  return (
    <>
      {profile === null || profileLoading ? (
        <Spinner />
      ) : (
        <>
          <Link to='/profiles' className='btn btn-light'>
            Back To Profiles
          </Link>
          {isAuthenticated &&
            authLoading === false &&
            authUser._id === profile.user._id && (
              <Link to='/edit-profile' className='btn btn-dark'>
                Edit Profile
              </Link>
            )}

          <div className='profile-grid my-1'>
            {/* <div className='profile-top bg-primary p-2'>
              <img className='round-img my-1' src={profile.user.avatar} alt='' />
              <h1 className='large'>{profile.user.name}</h1>
              <p className='lead'>
                {profile.status} {profile.company && <span> at {profile.company}</span>}
              </p>
              <p>{location}</p>
              <div className='icons my-1'>
                <a href='#' target='_blank' rel='noopener noreferrer'>
                  <i className='fas fa-globe fa-2x'></i>
                </a>
                <a href='#' target='_blank' rel='noopener noreferrer'>
                  <i className='fab fa-twitter fa-2x'></i>
                </a>
                <a href='#' target='_blank' rel='noopener noreferrer'>
                  <i className='fab fa-facebook fa-2x'></i>
                </a>
                <a href='#' target='_blank' rel='noopener noreferrer'>
                  <i className='fab fa-linkedin fa-2x'></i>
                </a>
                <a href='#' target='_blank' rel='noopener noreferrer'>
                  <i className='fab fa-youtube fa-2x'></i>
                </a>
                <a href='#' target='_blank' rel='noopener noreferrer'>
                  <i className='fab fa-instagram fa-2x'></i>
                </a>
              </div>
            </div> */}
          </div>
        </>
      )}
    </>
  );
};

export default withRouter(Profile);
