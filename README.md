# Smoldata - Zero-ETL indexing for smart contracts

![GitHub top language](https://img.shields.io/github/languages/top/username/smoldata) ![GitHub code size in bytes](https://img.shields.io/github/languages/code-size/username/smoldata) ![GitHub](https://img.shields.io/github/license/username/smoldata) ![GitHub issues](https://img.shields.io/github/issues/username/smoldata) ![GitHub Repo stars](https://img.shields.io/github/stars/username/smoldata?style=social)

Smoldata is a platform that enables quick and easy indexing for smart contracts, eliminating the need for time-consuming ETL processes. It simplifies the process of ingesting smart contract data with minimal alterations and transformations. This repository consists of the frontend component of Smoldata. The indexing engine will be open-sourced in the future.

When a user submits a smart contract, it is added to a realtime queue, and a microservice backend pulls the smart contract and uses an internal queue to index smart contracts on a first-come, first-serve basis. Once indexing is complete, the user is notified, and a storage URL is provided to download the event logs.

## Table of Contents

- [Installation](#installation)
- [Usage](#usage)
- [Components](#components)
- [Hooks](#hooks)
- [Pages](#pages)
- [Firebase Functions](#firebase-functions)
- [AuthContext](#authcontext)
- [License](#license)

## Installation

To install the project dependencies, run the following command:

```bash
npm install
```

## Usage

To run the project locally, use the following command:

```bash
npm start
```

To build the project for production, use the following command:

```bash
npm run build
```

## Components

- `Header.jsx`: Header component containing navigation items.
- `homepage.jsx`: The homepage component.
- `CircularBar.jsx`: A circular bar component.
- `Nav.jsx`: The navigation component.
- `Hero.jsx`: Hero section for the application.
- `Connect.jsx`: Connect button component.
- `Content.jsx`: Content component.

## Hooks

- `useLogout.js`: Custom hook for logging out users.
- `useLogin.js`: Custom hook for logging in users.

## Pages

- `addContract.js`: Page for adding new contracts.
- `smart-contracts.js`: Page displaying all smart contracts.
- `homepage.js`: The main homepage page.
- `dashboard.js`: Dashboard page for users.
- `contractPage.js`: Individual contract page.

## Firebase Functions

- `fetchUsegit merge dev --allow-unrelated-historiesr.js`: Fetch user data from Firebase.
- `createUserDocument.js`: Create a new user document in Firebase.
- `config.js`: Firebase configuration file.
- `submitContract.js`: Submit a new contract to Firebase.

## AuthContext

`AuthContext.js`: Provides an authentication context for the application.

## License

This project is open-sourced on GitHub and is available under the [MIT License](./LICENSE).