// create a react component
import React from 'react';
// import css
import Header from './components/Header';

import { BrowserRouter, Route, Routes } from 'react-router-dom';
import { Homepage } from './pages/homepage';
import { Dashboard } from './pages/dashboard';
// import 'bootstrap/dist/css/bootstrap.min.css';
import '../src/styles/style.css';
import '../src/styles/icons.css';
import SmartContracts from './pages/smart-contracts';
import Nav from './components/Nav';
import { AuthContext } from './contexts/AuthContext';
import { fetchUser } from './firebase/fetchUser';
import ContractStatusPage from './pages/contractPage';

const Index = () => {
  const { user } = React.useContext(AuthContext);
  const [userData, setUserData] = React.useState(null);
  const [searchQuery, setSearchQuery] = React.useState('');

  function handleSearch(event) {
    setSearchQuery(event.target.value);
  }

  React.useEffect(() => {
    if (user) {

      fetchUser(user.uid).then((data) => {
        setUserData(data);
      });
    }
  }, [user]);

  return (
    <BrowserRouter>
      <div className="earmark-app">
        {/* <link rel="stylesheet" href="./styles/style.css" /> */}
        <Header onSearch={handleSearch} />
        <main className={` ${user ? 'main !block sm:!grid' : ''}`}>
          {user && (
            <div className="hidden sm:block">
              <Nav />
            </div>
          )}


          <Routes>
            <Route path="/" element={<Homepage />} />
            {/* <Route path="*" element={<h1>404: Not Found</h1>} /> */}
            <Route path="/dashboard/*" element={<Dashboard searchQuery={searchQuery} />} />
            <Route path="/smart-contracts" element={<SmartContracts userData={userData} searchQuery={searchQuery} />} />
            <Route path="/contracts/:contractKey" element={<ContractStatusPage />} />
          </Routes>

        </main>
      </div>
    </BrowserRouter>

  );
};

export default Index;

// Path: indexsc/src/components/about.jsx
