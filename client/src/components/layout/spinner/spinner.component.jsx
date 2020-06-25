import React from 'react';
import spinner from './spinner.gif';

const Spinner = () => (
  <>
    <img
      src={spinner}
      style={{ width: '50px', margin: '100px auto', display: 'block' }}
      alt='Loading...'
    />
  </>
);

export default Spinner;
