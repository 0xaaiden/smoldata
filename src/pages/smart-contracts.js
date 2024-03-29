import React, { useState, useEffect } from "react";
import PropTypes from "prop-types"; // ES6
import { Link } from "react-router-dom";
import {
  doc,
  getDoc,
  query,
  getDocs,
  collection,
  where,
  updateDoc,
  arrayRemove,
  deleteDoc,
} from "firebase/firestore";
import { db as fsDatabase } from "../firebase/config";
import { v4 as uuid4 } from "uuid";
import { Menu, Transition } from "@headlessui/react";
import { AuthContext } from "../contexts/AuthContext";
// import Skeleton from "react-loading-skeleton";
// import "react-loading-skeleton/dist/skeleton.css";

import {
  DownloadIcon,
  TrashIcon,
  CheckIcon,
  RefreshIcon,
} from "@heroicons/react/outline";
import Tippy from "@tippyjs/react";
import "tippy.js/dist/tippy.css"; // optional for styling
import "tippy.js/themes/light-border.css";
import { useContext } from "react";
import { Navigate } from "react-router-dom";
import { fetchUser } from "../firebase/fetchUser";
document.title = "Smoldata - Smart Contracts";
const SmartContracts = ({ searchQuery }) => {
  // console.log('userData', userData);
  const [contracts, setContracts] = useState([]);
  const [contractsLoaded, setContractsLoaded] = useState(false);

  const [userData, setUserData] = useState(null);
  const { user, loading } = useContext(AuthContext);
  const [filteredContracts, setFilteredContracts] = useState(contracts);
  const [key, setKey] = useState(0);

  useEffect(() => {
    const fetchContracts = async () => {
      if (userData === null) {
        return;
      }

      const contractIds = userData.smart_contracts;
      //   console.log("contractIds", contractIds);
      const contract = contractIds.map(async (contractId) => {
        const getSc = await getDoc(doc(fsDatabase, "contracts", contractId));
        let scData;
        if (getSc.exists()) {
          scData = getSc.data();
          scData.id = contractId;
        } else {
          // doc.data() will be undefined in this case
          scData = null;
        }
        return scData;
      });
      //waity for all promises to resolve
      const contractsResolved = await Promise.all(contract);

      setContracts(contractsResolved);
      setFilteredContracts(contractsResolved);
    };
    fetchContracts();
    setContractsLoaded(true);
  }, [userData, key]);

  useEffect(() => {
    // console.log("searchQuery", searchQuery, contracts);
    if (searchQuery === "" || !contractsLoaded) {
      setFilteredContracts(contracts);
      return;
    }
    setFilteredContracts(
      contracts.filter((contract) => {
        return (
          contract.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
          contract.address.toLowerCase().includes(searchQuery.toLowerCase())
        );
      })
    );
    //   setContracts(filteredContracts);
  }, [searchQuery, contractsLoaded]);

  const deleteContract = async (contractTimestamp, userId, setKey) => {
    // console.log("deleteContract", contractId);
    const contractRef = query(
      collection(fsDatabase, "contracts"),
      where("timestamp", "==", contractTimestamp)
    );

    const contractSnapshot = await getDocs(contractRef);
    contractSnapshot.forEach(async (doc) => {
      await deleteDoc(doc.ref);
    });

    // remove from smart_contracts array
    const userRef = doc(fsDatabase, "users", userId);
    await updateDoc(userRef, {
      smart_contracts: arrayRemove(contractSnapshot.docs[0].id),
    });
    setKey(uuid4());
  };
  if (loading && !user) {
    // console.log('Dashboard loading', loading, user);
    return (
      <main className="main">
        {/* <Nav /> */}
        <div className="content">
          <div>Loading..</div>
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
    console.log("res", res);
    setUserData(res);
  };
  if (!userData) {
    load_user_data();
    return <div>Loading...</div>;
  }

  const getEventBadges = (events) => {
    const eventNames = Object.keys(events);
    const firstThreeEvents = eventNames.slice(0, 3);
    const remainingEventsCount = eventNames.length - firstThreeEvents.length;

    const badgeColors = [
      "bg-red-50",
      "bg-yellow-50",
      "bg-green-50",
      "bg-blue-50",
      "bg-indigo-50",
      "bg-purple-50",
      "bg-pink-50",
    ];

    if (remainingEventsCount === 0) {
      // Display a single badge with the number of events on mobile
      return (
        <>
          <Tippy
            content={firstThreeEvents.map((eventName, index) => (
              <span
                key={eventName}
                className={`mr-1 inline-flex items-center rounded-md  px-2 py-1 text-xs font-medium text-gray-600 ring-1 ring-inset ring-gray-500/10 ${badgeColors[index]}`}
              >
                {eventName}
              </span>
            ))}
            placement="top"
            theme="light-border"
            animateFill={true}
            arrow={false}
          >
            <span
              className={`md:hidden inline-flex items-center rounded-md bg-gray-50 px-2 py-1 text-xs font-medium text-gray-600 ring-1 ring-inset ring-gray-500/10`}
            >
              {eventNames.length} events
            </span>
          </Tippy>
          <div className="hidden md:flex gap-0.5">
            {firstThreeEvents.map((eventName, index) => (
              <span
                key={eventName}
                className={`inline-flex items-center rounded-md  px-2 py-1 text-xs font-medium text-gray-600 ring-1 ring-inset ring-gray-500/10 ${
                  badgeColors[index + 1]
                }`}
              >
                {eventName}
              </span>
            ))}
          </div>
        </>
      );
    } else {
      // Display the first three events and a badge for the remaining events
      return (
        <>
          <div className="relative md:hidden">
            <Tippy
              content={
                <>
                  {eventNames.map((eventName, index) => (
                    <span
                      key={eventName}
                      className={`mr-1 inline-flex items-center rounded-md px-2 py-1 text-xs font-medium text-gray-600 ring-1 ring-inset ring-gray-500/10 ${badgeColors[index]}`}
                    >
                      {eventName}
                    </span>
                  ))}
                </>
              }
              placement="top"
              theme="light-border"
              animateFill={true}
              arrow={false}
            >
              <span
                className={`inline-flex items-center rounded-md bg-gray-50 px-2 py-1 text-xs font-medium text-gray-600 ring-1 ring-inset ring-gray-500/10 tooltip ${badgeColors[0]}`}
                data-tooltip={firstThreeEvents.join(", ")}
              >
                {eventNames.length} events
              </span>
            </Tippy>
          </div>
          <div className="hidden md:flex gap-0.5">
            {firstThreeEvents.map((eventName, index) => (
              <span
                key={eventName}
                className={`inline-flex items-center rounded-md px-2 py-1 text-xs font-medium text-gray-600 ring-1 ring-inset ring-gray-500/10  mb-2 ${
                  badgeColors[index + 1]
                }`}
              >
                {eventName}
              </span>
            ))}
            <Tippy
              content={
                <div className=" flex gap-0.5">
                  {eventNames.slice(3).map((eventName, index) => (
                    <span
                      key={eventName}
                      className={`inline-flex items-center rounded-md px-2 py-1 text-xs font-medium text-gray-600 ring-1 ring-inset ring-gray-500/10 ${
                        badgeColors[index + 4]
                      }`}
                    >
                      {eventName}
                    </span>
                  ))}
                </div>
              }
              placement="top"
              theme="light-border"
              animateFill={true}
              arrow={false}
            >
              <span
                className={`inline-flex items-center rounded-md bg-gray-50 px-2 py-1 text-xs font-medium text-gray-600 ring-1 ring-inset ring-gray-500/10 mr-2 mb-2`}
              >
                +{remainingEventsCount} more
              </span>
            </Tippy>
          </div>
        </>
      );
    }
  };
  return (
    <div className="content-body">
      <section className="overview">
        <header className="overview-header  flex  content-between align-baseline">
          <h2 className="overview-header-title ">
            {/* {console.log('content data', userData)} */}
            Smart Contracts<span>[{userData.smart_contracts.length}]</span>
          </h2>
          <div className="flex gap-2  text-right">
            <Link
              to="/dashboard/addContract"
              className="link hover:!no-underline !no-underline"
            >
              Add new contract
            </Link>
          </div>
        </header>
        <div className="overview-body">
          <div className="summary">
            <h3 className="summary-date">Summary</h3>
            {/* <span className="summary-amount">+$87.01</span> */}
          </div>
          <div className="list">
            {Object.values(filteredContracts)
              .reverse()
              .map((contract) => (
                <div className="list-item " key={uuid4()}>
                  <div className="list-item-company text-ellipsis  overflow-auto">
                    <div className="list-item-company-info overflow-hidden">
                      <h4 className="mr-4 list-item-company-name overflow-hidden text-ellipsis">
                        <Link
                          to={`/contracts/${contract.id}`}
                          className="text-gray-500 hover:text-gray-800"
                        >
                          {/* ellipse width 60% */}
                          {/* show name and between parenthesis (0x0000...) */}
                          {contract.name} ({contract.address.slice(0, 6)}...
                          {contract.address.slice(-4)})
                        </Link>
                      </h4>
                      {getEventBadges(contract.events)}
                    </div>
                  </div>
                  <div className="list-item-transaction">
                    <div className="list-item-transaction-values !hidden md:!flex">
                      <span
                        className={`list-item-transaction-value ${
                          contract.status === "pending"
                            ? ""
                            : "list-item-transaction-value--positive"
                        }`}
                      >
                        {contract.status === "pending" ? (
                          <>
                            <i className="ph-arrows-clockwise-bold"></i>Syncing
                          </>
                        ) : (
                          "Complete"
                        )}
                      </span>
                      <time
                        className="list-item-transaction-time"
                        dateTime={contract.timestamp}
                      >
                        {new Date(contract.timestamp).toLocaleTimeString(
                          "en-US",
                          {
                            weekday: "short",
                            month: "short",
                            day: "numeric",
                            hour: "numeric",
                            minute: "numeric",
                            hour12: true,
                          }
                        )}
                      </time>
                    </div>
                    <Menu
                      as="div"
                      className="relative inline-block text-left z-110"
                    >
                      <Menu.Button className="list-item-transaction-action">
                        <i className="ph-caret-down-bold"></i>
                      </Menu.Button>
                      <Transition
                        as={React.Fragment}
                        enter="transition ease-out duration-100"
                        enterFrom="transform opacity-0 scale-95"
                        enterTo="transform opacity-100 scale-100"
                        leave="transition ease-in duration-75"
                        leaveFrom="transform opacity-100 scale-100"
                        leaveTo="transform opacity-0 scale-95"
                      >
                        <Menu.Items className="z-40 absolute right-0 mt-2 w-56 rounded-md shadow-lg bg-white ring-1 ring-black ring-opacity-5 focus:outline-none origin-top-right">
                          <div className="py-1 px-1">
                            <Menu.Item className="md:hidden">
                              {({ active }) => (
                                <button
                                  className={`${
                                    active
                                      ? "bg-gray-100 text-gray-900"
                                      : "text-gray-700"
                                  } flex items-center w-full px-4 py-2 text-sm  border-b-[0.5px] border-gray-400 border-opacity-50`}
                                  disabled={contract.status === "pending"}
                                  onClick={() => {
                                    console.log("View clicked");
                                  }}
                                >
                                  {/* show syncing or pending */}

                                  {contract.status === "pending" ? (
                                    <>
                                      <RefreshIcon className="w-5 h-5 mr-2" />
                                      Syncing
                                    </>
                                  ) : (
                                    <>
                                      <CheckIcon className="w-5 h-5 mr-2" />
                                      Completed
                                    </>
                                  )}
                                </button>
                              )}
                            </Menu.Item>
                            {/* add divider   headless*/}

                            <Menu.Item>
                              {({ active }) => (
                                <button
                                  className={`${
                                    active
                                      ? "bg-gray-100 text-gray-900"
                                      : "text-gray-700"
                                  } ${
                                    contract.status === "pending"
                                      ? " cursor-not-allowed"
                                      : ""
                                  } flex items-center w-full px-4 py-2 text-sm `}
                                  disabled={contract.status === "pending"}
                                  onClick={() => {
                                    console.log("Download clicked");
                                    window.open(contract.url, "_blank");
                                  }}
                                >
                                  <DownloadIcon className="w-5 h-5 mr-2" />
                                  Download
                                </button>
                              )}
                            </Menu.Item>
                            <Menu.Item>
                              {({ active }) => (
                                <button
                                  className={`${
                                    active
                                      ? "bg-gray-100 text-gray-900"
                                      : "text-gray-700"
                                  } flex items-center w-full px-4 py-2 text-sm`}
                                  onClick={() => {
                                    deleteContract(
                                      contract.timestamp,
                                      contract.id,
                                      setKey
                                    );
                                  }}
                                >
                                  <TrashIcon className="w-5 h-5 mr-2" />
                                  Delete
                                </button>
                              )}
                            </Menu.Item>
                          </div>
                        </Menu.Items>
                      </Transition>
                    </Menu>
                  </div>
                </div>
              ))}
          </div>
        </div>
      </section>
    </div>
  );
};

//prop types
SmartContracts.propTypes = {
  searchQuery: PropTypes.string,
};

export default SmartContracts;
