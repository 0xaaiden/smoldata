import React from 'react';
import Hero from '../components/Hero';
import Nav from '../components/Nav';
import Content from '../components/Content';

export const Dashboard = () => {
  document.title = 'fn03/indexsc./dashboard';
  return (
    <main className="main">
      <Nav />
      <div className="content">
        <Hero />
        <br />
        <Content />
      </div>
    </main>
  );
};
