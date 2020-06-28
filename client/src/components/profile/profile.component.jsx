import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link, withRouter } from 'react-router-dom';
import { getProfileById } from '../../redux/profile/profile.actions';

import Spinner from '../layout/spinner/spinner.component';
import ProfileTop from './profile-top.component';
import ProfileAbout from './profile-about.component';
import ProfileExperience from './profile-experience.component';
import ProfileEducation from './profile-education.component';
import ProfileGithub from './profile-github.component';

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
            <div className='profile-exp bg-white p-2'>
              <h2 className='text-primary'>Experience</h2>
              <div>
                {profile.experience.length > 0 ? (
                  <>
                    {profile.experience.map((exp) => (
                      <ProfileExperience key={exp._id} experience={exp} />
                    ))}
                  </>
                ) : (
                  <h4>No experience credentials</h4>
                )}
              </div>
            </div>
            <div className='profile-edu bg-white p-2'>
              <h2 className='text-primary'>Education</h2>
              <div>
                {profile.education.length > 0 ? (
                  <>
                    {profile.education.map((edu) => (
                      <ProfileEducation key={edu._id} education={edu} />
                    ))}
                  </>
                ) : (
                  <h4>No experience credentials</h4>
                )}
              </div>
            </div>

            <div className='profile-github'>
              <h2 className='text-primary my-1'>
                <i className='fab fa-github'></i> Github Repos
              </h2>
              {profile.githubusername ? (
                <ProfileGithub githubusername={profile.githubusername} />
              ) : (
                <h3>Please suplly your valid Github user name</h3>
              )}
            </div>
          </div>
        </>
      )}
    </>
  );
};

export default withRouter(Profile);
