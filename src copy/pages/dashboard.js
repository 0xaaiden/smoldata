import React from 'react';
import Hero from '../components/Hero';
import Nav from './components/Nav';
import Content from '../components/Content';

export const Homepage = () => {
  document.title = 'fn03/indexsc./dashboard';
  return (
    <main className="main">
    <div className="content">
      <Nav />
      <Hero />
      <br />
      <Content />
    </div>
    </main>
  );
};
