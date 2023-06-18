<<<<<<< HEAD
import React from 'react';
// import css

const Nav = () => {
  return (
    <nav className="nav">
      <ul className="tabs">
        <li className="tab">
          <button className="tab-btn tab-btn--active">
=======
import React from "react";
import { useNavigate, useLocation } from "react-router-dom";

// import css

const Nav = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const [activeTab, setActiveTab] = React.useState("overview");

  React.useEffect(() => {
    const path = location.pathname;
    if (path === "/") {
      setActiveTab("overview");
    } else if (path === "/smart-contracts") {
      setActiveTab("smart-contracts");
    }
  }, [location]);

  const handleOverviewClick = () => {
    setActiveTab("overview");
    navigate("/");
  };

  const handleSmartContractsClick = () => {
    setActiveTab("smart-contracts");
    navigate("/smart-contracts");
  };

  return (
    <nav className="nav ">
      <ul className="tabs">
        <li className="tab">
          <button
            className={`tab-btn ${
              activeTab === "overview" ? "tab-btn--active" : ""
            }`}
            onClick={handleOverviewClick}
          >
>>>>>>> dev
            <i className="ph-lightbulb-bold"></i>
            <span className="tab-btn-title">Overview</span>
          </button>
        </li>
        <li className="tab">
<<<<<<< HEAD
          <button className="tab-btn">
=======
          <button
            className={`tab-btn ${
              activeTab === "smart-contracts" ? "tab-btn--active" : ""
            }`}
            onClick={handleSmartContractsClick}
          >
>>>>>>> dev
            <i className="ph-list-bold"></i>
            <span className="tab-btn-title">Smart Contracts</span>
          </button>
        </li>
<<<<<<< HEAD
        <li className="tab">
          <button className="tab-btn">
=======
        <li className="tab !cursor-not-allowed">
          <button className="tab-btn !cursor-not-allowed">
>>>>>>> dev
            <i className="ph-plugs-connected-bold"></i>
            <span className="tab-btn-title">Manage APIs</span>
          </button>
        </li>
<<<<<<< HEAD
        <li className="tab">
          <button className="tab-btn" >
            <i className="ph-arrows-counter-clockwise-bold"></i>
            <span className="tab-btn-title">Subscriptions</span>
          </button>
        </li>
        <li className="tab">
          <button className="tab-btn">
            <i className="ph-bank-bold"></i>
            <span className="tab-btn-title">Accounts</span>
          </button>
        </li>
=======
        <li className="tab !cursor-not-allowed">
          <button className="tab-btn !cursor-not-allowed">
            <i className="ph-arrows-clockwise-bold"></i>
            <span className="tab-btn-title">Subscriptions</span>
          </button>
        </li>
        {/* sync icon */}
>>>>>>> dev
      </ul>
    </nav>
  );
};

export default Nav;
