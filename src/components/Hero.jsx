import React from 'react';

const Hero = () => {
  return (
    <div className="content-header">
      <div className="content-header-inner">
        <h1 className="content-header-title">
          Welcome to your dashboard, <br />
          you have<small>[n] Smart Contracts active</small>
        </h1>
        {/* <div className="content-header-info">
          Available funds to invest: $435.00{' '}
          <a href="#" className="link">
            Invest now
          </a>
        </div> */}
      </div>
      <div className="content-header-illustration">
        {/* <img src="https://assets.codepen.io/285131/illustration-2.svg" /> */}
      </div>
    </div>
  );
};

export default Hero;
