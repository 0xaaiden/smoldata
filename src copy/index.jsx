// create a react component
import React from 'react';
// import css
import Header from './components/Header';

import { BrowserRouter, Route, Routes } from 'react-router-dom';
import { Homepage } from './pages/homepage';
import 'bootstrap/dist/css/bootstrap.min.css';
import '../src/styles/style.css';
import '../src/styles/icons.css';

const Index = () => {
  return (
    <div className="earmark-app">
      {/* <link rel="stylesheet" href="./styles/style.css" /> */}
      <Header />
      
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<Homepage />} />
          </Routes>
        </BrowserRouter>
    </div>
  );
};

export default Index;

// Path: indexsc/src/components/about.jsx
