import React from 'react';
// import css

const Nav = () => {
  return (
    <nav className="nav">
      <ul className="tabs">
        <li className="tab">
          <button className="tab-btn tab-btn--active">
            <i className="ph-lightbulb-bold"></i>
            <span className="tab-btn-title">Overview</span>
          </button>
        </li>
        <li className="tab">
          <button className="tab-btn">
            <i className="ph-list-bold"></i>
            <span className="tab-btn-title">Smart Contracts</span>
          </button>
        </li>
        <li className="tab">
          <button className="tab-btn">
            <i className="ph-plugs-connected-bold"></i>
            <span className="tab-btn-title">Manage APIs</span>
          </button>
        </li>
        <li className="tab">
          <button className="tab-btn" >
            <i className="ph-arrows-counter-clockwise-bold"></i>
            <span className="tab-btn-title">Subscriptions</span>
          </button>
        </li>
        <li className="tab">
          <button className="tab-btn">
            <i className="ph-bank-bold"></i>
            <span className="tab-btn-title">Accounts</span>
          </button>
        </li>
      </ul>
    </nav>
  );
};

export default Nav;
