import React from 'react';
<<<<<<< HEAD
import Index from './components/index';
import AuthContextProvider from "./contexts/AuthContext";

=======
import Index from './index.jsx';
import AuthContextProvider from './contexts/AuthContext';
>>>>>>> dev

function App() {
  return (
    <AuthContextProvider>
      <Index />
    </AuthContextProvider>
  );
}

export default App;
