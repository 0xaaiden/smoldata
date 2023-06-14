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
            <i className="ph-lightbulb-bold"></i>
            <span className="tab-btn-title">Overview</span>
          </button>
        </li>
        <li className="tab">
          <button
            className={`tab-btn ${
              activeTab === "smart-contracts" ? "tab-btn--active" : ""
            }`}
            onClick={handleSmartContractsClick}
          >
            <i className="ph-list-bold"></i>
            <span className="tab-btn-title">Smart Contracts</span>
          </button>
        </li>
        <li className="tab !cursor-not-allowed">
          <button className="tab-btn !cursor-not-allowed">
            <i className="ph-plugs-connected-bold"></i>
            <span className="tab-btn-title">Manage APIs</span>
          </button>
        </li>
        <li className="tab !cursor-not-allowed">
          <button className="tab-btn !cursor-not-allowed">
            <i className="ph-arrows-clockwise-bold"></i>
            <span className="tab-btn-title">Subscriptions</span>
          </button>
        </li>
        {/* sync icon */}
      </ul>
    </nav>
  );
};

export default Nav;
