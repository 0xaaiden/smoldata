/* eslint-disable no-unused-vars */
/* eslint-disable react/no-unescaped-entities */
import React, { useState, useEffect, useContext } from "react";
import PropTypes from "prop-types";
// import Modal from 'react-bootstrap/Modal';
// import Button from 'react-bootstrap/Button';
// import Form from 'react-bootstrap/Form';
// import m from './Magic';
import { useRef } from "react";
import { useLogin } from "../hooks/useLogin";
import { useLogout } from "../hooks/useLogout";

import { AuthContext } from "../contexts/AuthContext";

// m.auth;

const styleButton = {
  width: "-webkit-fill-available",
};

const Connect = ({ display, setDisplay }) => {
  const { login, isPending, error } = useLogin();

  const { logout } = useLogout();
  const user = useContext(AuthContext);
  let connected = false;
  if (user.user != null) {
    // console.log('user connected: ', user);
    connected = true;
  } else {
    // console.log('user not connected ', user);
  }

  const displayButton = () => {
    if (connected === false && display === true) {
      return (
        <button
          className="header-connect bg-slate-200"
          style={styleButton}
          onClick={() => {
            setDisplay(false);
            login();
          }}
        >
          <span className="header-avatar-img ph-github-logo"></span>
          <span className="header-avatar-name">
            {isPending ? "Loading..." : "Github"}
          </span>
        </button>
      );
    } else if (connected === true && display === true) {
      return (
        <>
          <button
            className="header-connect bg-slate-200"
            onClick={() => {
              setDisplay(false);
              logout();
            }}
          >
            <span className="header-avatar-img ph-github-logo"></span>
            <span className="header-avatar-name">
              {isPending ? "Loading..." : "Sign Out"}
            </span>
          </button>
          {/* // add a button to go to dashboard */}
        </>
      );
    }
  };

  return (
    <div
      className="connect min-w-max"
      style={{ display: display ? "" : "none" }}
    >
      {displayButton()}

      {/* <ShowModal show={showModal} onHide={() => setShowModal(false)} /> */}
    </div>
  );
};

Connect.propTypes = {
  display: PropTypes.bool.isRequired,
  setDisplay: PropTypes.func.isRequired,
};
// ShowModal.propTypes = {
//   show: PropTypes.bool.isRequired,
//   onHide: PropTypes.func.isRequired
// };
export default Connect;
