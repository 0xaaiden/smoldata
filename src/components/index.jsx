// create a react component
import React from 'react';
// import css
import Header from './Header';
import Nav from './Nav';
import Hero from './Hero';
import Content from './Content';
import 'bootstrap/dist/css/bootstrap.min.css';
import '../styles/style.css';
import '../styles/icons.css';

const Index = () => {
  return (
    <div className="earmark-app">
      {/* <link rel="stylesheet" href="./styles/style.css" /> */}
      <Header />
      <main className="main">
        <Nav />
        <div className="content">
          <Hero />
          <br />
          <Content />
        </div>
      </main>
    </div>
  );
};

export default Index;

// Path: indexsc/src/components/about.jsx
