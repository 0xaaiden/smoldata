import React, { useState } from 'react';
import Hero from '../components/Hero';
import Nav from '../components/Nav';
import Content from '../components/Content';
import { AuthContext } from '../contexts/AuthContext';
import { useContext } from 'react';
import { Navigate } from 'react-router-dom';
import { fetchUser } from '../firebase/fetchUser';
import {  Route, Routes } from 'react-router-dom';
import { AddContract } from './addContract';
export const Dashboard = () => {
  const { user, loading } = useContext(AuthContext);
  const [userData, setUserData] = useState(null);
  // console.log('Dashboard', user, loading);

  // let userData;
  //reload when userData changes
  // useEffect(() => {
  //   console.log(userData, 'userData');
  //   // await setuserData(fetchUser(user.uid));
  // }, [loading]);

  document.title = 'fn03/indexsc./dashboard';
  // console.log("first log", loading, user, !user)
  if (loading && !user) {
    // console.log('Dashboard loading', loading, user);
    return (
      <main className="main">
        {/* <Nav /> */}
        <div className="content">
          <h1>Loading...</h1>
        </div>
      </main>
    );
  } else if (!loading && !user) {
    // console.log('Dashboard !loading', loading, user);
    return <Navigate to="/" />;
  }
  const load_user_data = async () => {
    // console.log('calling');
    const res = await fetchUser(user.uid);
    setUserData(res);
  };
  if (!userData) {
    load_user_data();
  }

  const MainPage = () => {
    return (
      <div className="content">
        <Hero userData={userData} />
        <br />
        <br />
        <Content userData={userData} />
      </div>
    );
  };

  return (
    <main className="main">
      {/* {console.log("rendering", loading, user)} */}
      <Nav />
      <Routes>
        <Route path="/" element={<MainPage />} />
        <Route path="*" element={<h1>405: Not Found</h1>} />
        <Route path="addContract" element={<AddContract />} />
      </Routes>
      -{' '}
    </main>
  );
};
