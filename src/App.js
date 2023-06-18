import React from 'react';
import Index from './components/index';
import AuthContextProvider from "./contexts/AuthContext";


function App() {
  return (
    <AuthContextProvider>
      <Index />
    </AuthContextProvider>
  );
}

export default App;
