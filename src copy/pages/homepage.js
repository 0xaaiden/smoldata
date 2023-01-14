import React from 'react';
import Hero from '../components/Hero';
import Content from '../components/Content';

export const Homepage = () => {
  document.title = 'fn03/indexsc.';
  return (
    <main className="main" style={{ display: 'block' }}>
      <div className="content">
        <Hero />
        <br />
        <Content />
      </div>
    </main>
  );
};
