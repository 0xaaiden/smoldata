// import React from 'react';
import { Magic } from 'magic-sdk';
import { OAuthExtension } from '@magic-ext/oauth';

// import Web3 from 'web3';

const m = new Magic('pk_live_5066E284F026FC23', {
  extensions: [new OAuthExtension()]
}); //
// m.preload;

// // const magic = new Magic('YOUR_PUBLISHABLE_API_KEY');
// const web3 = new Web3(m.rpcProvider);
const login = async () =>
  await m.oauth.loginWithRedirect({
    provider: 'github' /* 'google', 'facebook', 'apple', or 'github' */,
    redirectURI: 'http://localhost:3000/callback',
    scope: ['user:email'] /* optional */
  });
export default m;
export { login };
// export { wesb3 };
