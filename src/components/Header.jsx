//export Header
import React, { useState, useContext } from "react";
// import css
// import '../styles/style.css';
// import '../styles/icons.css';
import Connect from "./Connect";
import { AuthContext } from "../contexts/AuthContext";
// Path: indexsc/src/components/Header.jsx
import PropTypes from "prop-types";

const Header = ({ onSearch }) => {
  const [showConnect, setShowConnect] = useState(false);

  const user = useContext(AuthContext);
  // const display = () => {
  //   return <Connect />;
  // };

  return (
    <header className="header">
      <h1 className="header-logo">smoldata.</h1>
      <div className="header-content">
        {user.user ? (
          <div className="header-search">
            <input
              type="text"
              className="search-field"
              placeholder="Search..."
              onChange={onSearch}
            />
            <button type="submit" className="search-btn">
              <i className="ph-magnifying-glass-bold"></i>
            </button>
          </div>
        ) : (
          <div className="header-search"></div>
        )}

        <div className="header-nav">
          <button
            className="header-connect bg-orange-100"
            onClick={() => setShowConnect(!showConnect)}
          >
            <span
              className={
                user.user
                  ? "header-avatar-img ph-hand-waving text-orange-400"
                  : "header-avatar-img ph-sign-in text-orange-400"
              }
            ></span>
            <span className="header-avatar-name text-orange-800">
              {user.user ? "Hi " + user.user.displayName : "Sign In"}
            </span>
          </button>
          <Connect display={showConnect} setDisplay={setShowConnect} />
        </div>
      </div>
    </header>
  );
};

// proptypes
// Header.propTypes = {
Header.propTypes = {
  onSearch: PropTypes.func.isRequired,
};

export default Header;
