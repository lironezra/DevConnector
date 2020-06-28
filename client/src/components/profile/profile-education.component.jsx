import React from 'react';
import Moment from 'react-moment';

const ProfileEducation = ({
  education: { school, degree, description, fieldofstudy, from, to }
}) => {
  return (
    <>
      <h3 className='text-dark'>{school}</h3>
      <p>
        <Moment format='YYYY/MM/DD'>{from}</Moment> -{' '}
        {!to ? (
          <span className='text-success'> Now</span>
        ) : (
          <Moment format='YYYY/MM/DD'>{to}</Moment>
        )}
      </p>
      <p>
        <strong>Degree: </strong>
        {degree}
      </p>
      <p>
        <strong>Description: </strong>
        {description}
      </p>
    </>
  );
};

export default ProfileEducation;
