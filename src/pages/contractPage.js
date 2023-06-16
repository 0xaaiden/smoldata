import React, { useState, useEffect } from "react";
import { db } from "../firebase/config";
import { Link, useParams } from "react-router-dom";
import { doc, getDoc, onSnapshot } from "firebase/firestore";
import CircularProgressBar from "../components/CircularBar";
import { ArrowLeftIcon } from "@heroicons/react/solid";
import { JsonViewer } from "@textea/json-viewer";
function ContractStatusPage() {
  const { contractKey } = useParams();
  const [contractData, setContractData] = useState(null);
  useEffect(() => {
    async function fetchData() {
      const contractRefPre = doc(db, "contracts", contractKey);
      const contractRef = await getDoc(contractRefPre);

      if (contractRef.exists()) {
        console.log("Document data:", contractRef.data());
        // wait for 10 sec

        setContractData(contractRef.data());
      } else {
        console.log("No such document!");
      }
    }
    fetchData();
  }, [contractKey]);

  useEffect(() => {
    const contractRef = doc(db, "contracts", contractKey);

    const unsubscribe = onSnapshot(contractRef, (doc) => {
      if (doc.exists()) {
        // console.log("Document data:", doc.data());
        setContractData(doc.data());
      } else {
        // console.log("No such document!");
      }
    });

    return () => {
      unsubscribe();
    };
  }, [contractKey]);

  if (!contractData) {
    return <div>Loading...</div>;
  }
  try {
    const status = contractData.status;
    // completed or failed or pending
    const isComplete = status === "completed" ? true : false;
    const isFailed = status === "failed" ? true : false;
    // const isPending  = status === "pending" ? true : false;
    const progress = contractData.meta
      ? contractData.meta.progress.progress
      : 0;
    console.log("progress", progress);
    const startDate = new Date(contractData.startDate);
    const endDate = new Date(contractData.endDate);
    const eventsCount = contractData.meta
      ? contractData.meta.progress.eventsCount
      : 0;
    const events = contractData.events ? contractData.events : "";
    const fileSizeInMB = contractData.fileSize
      ? (contractData.fileSize / 1024 / 1024).toFixed(2)
      : 0;

    return (
      <div className="flex flex-col items-center">
        {/* add link top left Go back to events that takes you to / */}
        <Link
          to="/"
          className="relative place-self-start flex items-center top-0 left-0 ml-4 mb-20 text-blue-500 hover:text-blue-700"
        >
          <ArrowLeftIcon className="w-4 h-4 mr-2" />
          Go back to contracts
        </Link>
        <CircularProgressBar
          selectedValue={progress}
          maxValue={100}
          strokeWidth={8}
          radius={100}
          activeStrokeColor="#cc6633"
          withGradient
        />
        <div className="mt-8 w-full overflow-hidden">
          <a
            href={`https://etherscan.io/address/${contractData.address}`}
            target="_blank"
            rel="noopener noreferrer"
          >
            <div className="text-lg font-bold">{contractData.name}</div>
            <div className="text-sm text-gray-500">{contractData.address}</div>
          </a>
          <div className="mt-4 w-full">
            <div className="flex items-center">
              <div className="w-1/3 text-sm text-gray-500">Start Date:</div>
              <div className="w-2/3 text-sm">
                {startDate.toLocaleDateString()}
              </div>
            </div>
            <div className="flex items-center">
              <div className="w-1/3 text-sm text-gray-500">End Date:</div>
              <div className="w-2/3 text-sm">
                {endDate.toLocaleDateString()}
              </div>
            </div>
            <div className="flex items-center">
              <div className="w-1/3 text-sm text-gray-500">
                Total Events Indexed:
              </div>
              <div className="w-2/3 text-sm">
                {/* format number */}
                {eventsCount.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",")}
              </div>
            </div>
            {/* EVENTS */}
            <div className="flex items-center">
              <div className="w-1/3 text-sm text-gray-500">Events:</div>
              <div className="w-2/3 text-sm">
                <JsonViewer value={events} />
              </div>
            </div>

            <div className="flex items-center">
              <div className="w-1/3 text-sm text-gray-500">Status:</div>
              <div className="w-2/3 text-sm">{status}</div>
            </div>
            <div className="flex items-center">
              <div className="w-1/3 text-sm text-gray-500">Progress:</div>
              <div className="w-2/3">
                <div className="relative w-full h-2 bg-gray-200 rounded-full">
                  <div
                    className={`absolute top-0 left-0 h-2 rounded-full ${
                      isComplete && !isFailed ? "bg-green-500" : "bg-yellow-500"
                    } 
                      ${
                        isFailed
                          ? "bg-red-500"
                          : "bg-gradient-to-r from-green-400 to-blue-500"
                      }
                      
                    }`}
                    style={{ width: `${progress}%` }}
                  ></div>
                </div>
              </div>
            </div>
            {contractData.url && (
              <div className="flex items-center">
                <div className="w-1/3 text-sm text-gray-500">Download:</div>
                <div className="w-2/3">
                  <a href={contractData.url} download>
                    <button className=" font-bold py-2 ">
                      Download -{" "}
                      {fileSizeInMB ? `${fileSizeInMB} MB` : "Calculating..."}
                    </button>
                  </a>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    );
  } catch (error) {
    console.error(error);
    // handle the error here
  }
}
export default ContractStatusPage;
