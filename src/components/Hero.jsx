<<<<<<< HEAD
import React from 'react';

const Hero = () => {
=======
import { checkPropTypes } from 'prop-types';
import { React } from 'react';
// import { AuthContext } from '../contexts/AuthContext';
// import { useContext } from 'react';

const Hero = ({ userData }) => {
  // const { user } = useContext(AuthContext);
  // console.log(user, 'our user was');

  // useEffect (() => {
  //   console.log(user, 'our user is');

>>>>>>> dev
  return (
    <div className="content-header">
      <div className="content-header-inner">
        <h1 className="content-header-title">
<<<<<<< HEAD
          Welcome to your dashboard, <br />
          you have<small>[n] Smart Contracts active</small>
=======
          Welcome to your dashboard, {userData ? userData.displayName : ''}
          <br />
          <small>{userData ? userData.smart_contracts.length : 0} Smart Contracts indexed</small>
>>>>>>> dev
        </h1>
        {/* <div className="content-header-info">
          Available funds to invest: $435.00{' '}
          <a href="#" className="link">
            Invest now
          </a>
        </div> */}
      </div>
<<<<<<< HEAD
      <div className="content-header-illustration">
        {/* <img src="https://assets.codepen.io/285131/illustration-2.svg" /> */}
      </div>
=======
      {/* <div className="content-header-illustration">
        <img src="https://assets.codepen.io/285131/illustration-2.svg" />
      </div> */}
>>>>>>> dev
    </div>
  );
};

<<<<<<< HEAD
=======
//prop types
Hero.propTypes = {
  userData: checkPropTypes.any
};

>>>>>>> dev
export default Hero;
