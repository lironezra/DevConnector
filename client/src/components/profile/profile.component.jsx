import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link, withRouter } from 'react-router-dom';

import { getProfileById } from '../../redux/profile/profile.actions';

import Spinner from '../layout/spinner/spinner.component';
import ProfileTop from './profile-top.component';
import ProfileAbout from './profile-about.component';

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
  }, [dispatch, match.params.id]);

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
            <ProfileTop profile={profile} />
            <ProfileAbout profile={profile} />
          </div>
        </>
      )}
    </>
  );
};

export default withRouter(Profile);
