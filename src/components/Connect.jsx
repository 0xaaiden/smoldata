/* eslint-disable no-unused-vars */
/* eslint-disable react/no-unescaped-entities */
import React, { useState, useEffect, useContext } from 'react';
import PropTypes from 'prop-types';
// import Modal from 'react-bootstrap/Modal';
// import Button from 'react-bootstrap/Button';
// import Form from 'react-bootstrap/Form';
// import m from './Magic';
import { useRef } from 'react';
import { useLogin } from '../hooks/useLogin';
import { useLogout } from '../hooks/useLogout';

import { AuthContext } from '../contexts/AuthContext';

// m.auth;

const styleButton = {
  width: '-webkit-fill-available'
};

// async function LoginScreen() {
//   try {
//     const isLoggedIn = await m.user.isLoggedIn();
//     console.log(isLoggedIn); // => `true` or `false`
//   } catch {
//     // Handle errors if required!
//   }
//   const script = document.createElement('script');
//   script.src = 'https://auth.magic.link/pnp/login';
//   // script.data-magic-publishable-api-key="pk_live_5066E284F026FC23";
//   // script.data-redirect-uri="/callback";
//   // script.async = true;

//   //add attribute to script
//   script.setAttribute('data-magic-publishable-api-key', 'pk_live_5066E284F026FC23');
//   script.setAttribute('data-redirect-uri', '/');

//   // append to head

//   document.head.appendChild(script);
// }
// function LoadingButton() {
//   const [isLoading, setLoading] = useState(false);

//   useEffect(() => {
//     if (isLoading) {
//       setTimeout(() => setLoading(false), 2000);
//     }
//   }, [isLoading]);

//   const handleClick = () => setLoading(true);

//   return (
//     <div className="d-grid gap-2">
//       <Button
//         variant="primary"
//         style={{
//           'background-color': 'var(--c-action-primary)',
//           'border-color': 'var(--c-action-primary)'
//         }}
//         disabled={isLoading}
//         type="submit"
//         onClick={!isLoading ? handleClick : null}>
//         {isLoading ? 'Loading…' : 'Send confirmation email'}
//       </Button>
//     </div>
//   );
// }
// const ShowModal = (props) => {
//   return (
//     <Modal {...props}>
//       <Modal.Body>
//         <Form>
//           <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
//             <Form.Label>Login with your email address</Form.Label>
//             <Form.Control type="email" placeholder="name@example.com" autoFocus />
//           </Form.Group>
//         </Form>
//         <LoadingButton />
//       </Modal.Body>
//     </Modal>
//   );
// };

const Connect = ({ display }) => {
  const { login, isPending, error } = useLogin();
  const { logout } = useLogout();
  const user = useContext(AuthContext);
  let connected = false;
  if (user.user != null) {
    console.log('user connected: ', user);
    connected = true;
  } else {
    console.log('user not connected ', user);
  }

  const displayButton = () => {
    if (connected === false) {
      return (
        <button className="header-connect" style={styleButton} onClick={() => login()}>
          <span className="header-avatar-img ph-github-logo"></span>
          <span className="header-avatar-name">{isPending ? 'Loading...' : 'Github Login'}</span>
        </button>
      );
    } else {
      return (
        <button
          className="header-connect"
          style={{ ...styleButton, backgroundColor: 'grey' }}
          onClick={() => logout()}>
          <span className="header-avatar-img ph-github-logo"></span>
          <span className="header-avatar-name">{isPending ? 'Loading...' : 'Logout'}</span>
        </button>
      );
    }
  };

  // const [showModal, setShowModal] = useState(false);

  //add dropdown login options to sign in with email
  // if (display === false) return null;

  // console log login result every 2 seconds
  // setInterval(() => {
  //   console.log('login: ', loginApp, 'result');
  // }, 2000);

  // const loginApp = () => {
  //   return login();
  // };
  // useRef(async () => {
  //   const result = await m.oauth.getRedirectResult();
  //   console.log(result);
  // }, [login]);
  // const result = await m.oauth.getRedirectResult();
  // console.log(result);

  return (
    <div className="connect" style={{ display: display ? '' : 'none' }}>
      {displayButton()}

      {/* <ShowModal show={showModal} onHide={() => setShowModal(false)} /> */}
    </div>
  );
};

Connect.propTypes = {
  display: PropTypes.bool.isRequired
};
// ShowModal.propTypes = {
//   show: PropTypes.bool.isRequired,
//   onHide: PropTypes.func.isRequired
// };
export default Connect;
