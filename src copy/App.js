import React from 'react';
import Index from './index.jsx';
import AuthContextProvider from './contexts/AuthContext';

function App() {
  return (
    <AuthContextProvider>
      <Index />
    </AuthContextProvider>
  );
}

export default App;
