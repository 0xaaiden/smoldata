import { checkPropTypes } from 'prop-types';
import { React } from 'react';
// import { AuthContext } from '../contexts/AuthContext';
// import { useContext } from 'react';

const Hero = ({ userData }) => {
  // const { user } = useContext(AuthContext);
  // console.log(user, 'our user was');

  // useEffect (() => {
  //   console.log(user, 'our user is');

  return (
    <div className="content-header">
      <div className="content-header-inner">
        <h1 className="content-header-title">
          Welcome to your dashboard, {userData ? userData.displayName : ''}
          <br />
          <small>{userData ? userData.smart_contracts.length : 0} Smart Contracts indexed</small>
        </h1>
        {/* <div className="content-header-info">
          Available funds to invest: $435.00{' '}
          <a href="#" className="link">
            Invest now
          </a>
        </div> */}
      </div>
      {/* <div className="content-header-illustration">
        <img src="https://assets.codepen.io/285131/illustration-2.svg" />
      </div> */}
    </div>
  );
};

//prop types
Hero.propTypes = {
  userData: checkPropTypes.any
};

export default Hero;
