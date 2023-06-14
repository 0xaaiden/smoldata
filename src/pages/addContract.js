/* eslint-disable no-unused-vars */
import React, { useState } from "react";
import { pick } from "lodash";
import { PropTypes } from "prop-types";
import { addContract } from "../firebase/submitContract";
//import web3 cdn in browser
import { useForm, useFieldArray } from "react-hook-form";
import { db as fsDatabase } from "../firebase/config";
import {
  doc as fDoc,
  updateDoc as fUpdate,
  arrayUnion,
} from "firebase/firestore";
import { fetchUser } from "../firebase/fetchUser";
import { ExternalLinkIcon } from "@heroicons/react/solid";
import { useNavigate } from "react-router-dom";
import ReactiveButton from "reactive-button";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faCircleNotch,
  faThumbsUp,
  faBomb,
  faCross,
  faX,
} from "@fortawesome/free-solid-svg-icons";

function DateComp(props) {
  const [startDate, setStartDate] = useState(
    new Date(new Date().setMonth(new Date().getMonth() - 1))
  );
  const [endDate, setEndDate] = useState(new Date());
  const [error, setError] = useState(null);
  const handleStartDateChange = (event) => {
    const newStartDate = new Date(event.target.value);
    if (newStartDate > endDate) {
      setError("Start date should be less than end date");
      document.getElementById("save").disabled = true;
    } else if (endDate.getTime() - newStartDate.getTime() > 5184000000) {
      setError("Date range should not be more than 2 months");
      document.getElementById("save").disabled = true;
    } else {
      setError(null);
      setStartDate(newStartDate);
      props.onDateChange(newStartDate, endDate);
    }
  };

  const handleEndDateChange = (event) => {
    const newEndDate = new Date(event.target.value);
    if (newEndDate < startDate) {
      setError("End date should be greater than start date");
      document.getElementById("save").disabled = true;
    } else if (newEndDate.getTime() - startDate.getTime() > 5184000000) {
      setError("Date range should not be more than 2 months");
      document.getElementById("save").disabled = true;
    } else {
      setError(null);
      setEndDate(newEndDate);
      props.onDateChange(startDate, newEndDate);
    }
  };

  return (
    <div className="pt-8">
      <div>
        <h3 className="text-lg leading-6 font-medium text-gray-900">
          Timeframe
        </h3>
        <p className="mt-1 text-sm text-gray-500">
          Choose the timeframe you want to index your smart contract for.
        </p>
      </div>
      <div className="mt-6">
        {/* add date picker tailwind */}
        <div className="mt-6">
          <div className="grid grid-cols-6 gap-6">
            <div className="col-span-6 sm:col-span-3">
              <label
                htmlFor="start-date"
                className="block text-sm font-medium text-gray-700"
              >
                Start Date
              </label>
              <div className="mt-1">
                <input
                  {...props.register("startDate", {
                    required: "Required",
                  })}
                  type="date"
                  name="start-date"
                  id="start-date"
                  // default 1 month ago
                  defaultValue={startDate.toISOString().slice(0, 10)}
                  onChange={handleStartDateChange}
                  className="shadow-sm focus:ring-orange-500 focus:border-orange-500 block w-full sm:text-sm border-gray-300 rounded-md"
                />
              </div>
            </div>
            <div className="col-span-6 sm:col-span-3">
              <label
                htmlFor="start-date"
                className="block text-sm font-medium text-gray-700"
              >
                End Date
              </label>
              <div className="mt-1">
                <input
                  {...props.register("endDate", {
                    required: "Required",
                  })}
                  type="date"
                  name="end-date"
                  id="end-date"
                  defaultValue={endDate.toISOString().slice(0, 10)}
                  onChange={handleEndDateChange}
                  className="shadow-sm focus:ring-orange-500 focus:border-orange-500 block w-full sm:text-sm border-gray-300 rounded-md"
                />
              </div>
              {/* if range of dates more than 2 months refuse */}
            </div>
          </div>
        </div>
        {error && <p className="text-red-500">{error}</p>}
      </div>
    </div>
  );
}
function transformEvents(data) {
  const result = {};
  // only loop throiugh data.events which value is true
  // and get the fields of each event from the abi
  // and push it to the result object
  console.log("data.events: ", data);

  const eventsFiltered = Object.keys(data.events).filter(
    (key) => data.events[key]
  );
  console.log("eventsFiltered: ", eventsFiltered);
  for (const i in eventsFiltered) {
    const fields = [];
    for (const field of JSON.parse(data.abi)) {
      if (field.type === "event" && field.name === eventsFiltered[i]) {
        for (const input of field.inputs) {
          fields.push(input.name);
        }
        break;
      }
    }
    result[eventsFiltered[i]] = fields;
  }
  console.log("result: ", result);
  return result;
}
// get web3
export const AddContract = (props) => {
  const [abi, setAbi] = useState([]);
  const [contract, setContract] = useState(null);
  const [events, setEvents] = useState([]);
  const [name, setName] = useState("");
  const navigate = useNavigate();
  const [state, setState] = useState("idle");

  const [startDate, setStartDate] = useState(
    new Date(new Date().setMonth(new Date().getMonth() - 1))
  );
  const handleCancel = () => {
    navigate("/");
  };

  const {
    register,
    handleSubmit,
    formState: { errors },
    watch,
    control,
    setError,
  } = useForm();
  const onClickHandler = () => {
    setState("loading");

    // send an HTTP request

    //if form has errors, set state to error
    console.log(errors, "errors", state, Object.keys(errors));
    if (errors && Object.keys(errors).length > 0) {
      setState("error");
      // wait for 2 seconds and make it idle
      setTimeout(() => {
        setState("idle");
      }, 2000);

      return;
    } else {
      setState("success");
    }
  };
  const { fields, append, prepend, remove, swap, move, insert, replace } =
    useFieldArray({
      control,
      name: "events",
      shouldUnregister: true,
      //only atleast one event should be selected
      rules: {
        validate: (value) => {
          // check if atleast one event is selected so true, access first key's value and check
          // (2) [{…}, {…}]
          // 0: {transfer: true}
          // 1: {approval: true}

          const filteredItems = value.filter((item) =>
            Object.values(item).includes(true)
          );
          // console.log(filteredItems, "filter", Object.values(value));
          return filteredItems.length > 0 || "Select at least one event";
        },
      },
      // validate: (value) => value.length > 0 || "Select atleast one event",
    });

  const [endDate, setEndDate] = useState(new Date());
  // console.log(startDate, endDate);

  // const endwathc = watch('events');
  // console.log(endwathc);

  const handleDateChange = (newStartDate, newEndDate) => {
    setStartDate(newStartDate);
    setEndDate(newEndDate);
    document.getElementById("save").disabled = false;
  };
  // let json_abi;
  // console.log('AddContract');
  async function fetchAbi(event) {
    // console.log('fetchAbi');
    //fetch abi from etherscan
    const address = event.target.value;
    setContract(address);
    const json_abi = await fetch(
      "https://api.etherscan.io/api?module=contract&action=getsourcecode&address=" +
        address +
        "&apikey=8VCE7VNHB1ERQFZ8387TNJEUQHVQGB7QZH"
    )
      .then((response) => response.json())
      .then((data) => {
        // put in abi input field
        // console.log(data);
        document.getElementById("abi").value = data.result[0].ABI;
        setName(data.result[0].ContractName);

        // objectify abi
        let objjson = JSON.parse(data.result[0].ABI);
        let events = AbiToEvents(objjson);
        replace(events);
        setAbi(JSON.stringify(objjson, null, 2));
        setEvents(events);

        // transforms events into string

        return events;
      });
    // console.log(json_abi);
    return json_abi;
  }
  function formatString(item) {
    let string = item.string;
    let firstParenthesisIndex = string.indexOf("(");
    let firstWord = string.substring(0, firstParenthesisIndex);
    string = string.replace(
      firstWord,
      `<span class="underline decoration-sky-500 decoration-double">${firstWord}</span>`
    );

    let words = string.split("(");
    let fields = words[1].split(",");

    fields.forEach((field) => {
      let fieldWord = field.substring(0, field.indexOf(":"));
      string = string.replace(
        fieldWord,
        `<span class="italic underline decoration-yellow-500 decoration-double">${fieldWord}</span>`
      );
    });
    return string;
  }

  const handleAbiChange = (event) => {
    // console.log('handleAbiChange');
    // console.log(event.target.value);
    // objectify abi

    let objjson = JSON.parse(event.target.value);
    let events = AbiToEvents(objjson);
    setAbi(JSON.stringify(objjson, null, 2));
    setEvents(events);
    replace(events);
    // transforms events into string
  };
  const onSubmit = (data) => {
    // event.preventDefault();
    // Get the form data
    // console.log('event: ', data.events)
    // flatten events, remove keys and keep only values
    // console.log('events: ', data.events);
    // flatten to dict of keys are events, and value is respective value

    setState("loading");
    setState("success");
    const flattened = data.events.reduce((acc, evento) => {
      acc[evento.name] = evento[evento.name];
      return acc;
    }, {});
    // console.log('flattened: ', flattened);
    data.events = flattened;

    // console.log('flattened: ', data)
    const processedEvents = transformEvents(data);

    // console.log('processedEvents: ', processedEvents);
    const dataToBeSent = {
      ...data,
      events: processedEvents,
      name: name,
      startDate: startDate.toISOString(),
      endDate: endDate.toISOString(),
      timestamp: new Date().toISOString(),
      status: "pending",
    };

    const userDoc = fDoc(fsDatabase, "users/" + props.user);

    addContract(dataToBeSent)
      .then((contractKey) => {
        // console.log(`Contract added successfully with key: ${contractKey}`);
        fUpdate(userDoc, { smart_contracts: arrayUnion(contractKey) });

        setTimeout(() => navigate(`/contracts/${contractKey}`), 1500);
      })
      .catch((error) => {
        console.error("Error adding contract: ", error);
      });
  };
  const onError = (errors, e) => {
    console.log(errors, e);
    setState("error");
    setTimeout(() => {
      setState("idle");
    }, 2000);
  };

  React.useEffect(() => {
    // console.log(props.contractIds, props.contractIds.length);
    if (props.contractIds && props.contractIds.length > 10) {
      // set error form
      try {
        setError("contracts", {
          type: "manual",
          message: "You have reached the maximum number of contracts",
        });
      } catch (e) {
        console.log(e);
      }
    }
  }, [props.contractIds]);

  // console.log(props);

  return (
    <form
      className="p-2 space-y-8 divide-y divide-gray-200"
      onSubmit={handleSubmit(onSubmit, onError)}
    >
      <div className="space-y-8 divide-y divide-gray-200">
        <div>
          <div>
            {/* Show alert when too many contracts reach, errors has contracts */}
            {errors.contracts && (
              <div
                role="alert"
                className="rounded border-s-4 border-red-500 bg-red-50 p-4"
              >
                <div className="flex items-center gap-2 text-red-800">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 24 24"
                    fill="currentColor"
                    className="h-5 w-5"
                  >
                    <path
                      fillRule="evenodd"
                      d="M9.401 3.003c1.155-2 4.043-2 5.197 0l7.355 12.748c1.154 2-.29 4.5-2.599 4.5H4.645c-2.309 0-3.752-2.5-2.598-4.5L9.4 3.003zM12 8.25a.75.75 0 01.75.75v3.75a.75.75 0 01-1.5 0V9a.75.75 0 01.75-.75zm0 8.25a.75.75 0 100-1.5.75.75 0 000 1.5z"
                      clipRule="evenodd"
                    />
                  </svg>

                  <strong className="block font-medium">
                    {" "}
                    {errors.contracts && errors.contracts.message
                      ? errors.contracts.message
                      : "You have reached the maximum number of contracts"}{" "}
                  </strong>
                </div>
              </div>
            )}
            <br></br>
            <h3 className="text-lg leading-6 font-medium text-gray-900">
              Add a new smart contract
            </h3>
            <p className="mt-1 text-sm text-gray-500">
              This information will determine the events indexed in your
              contract.
            </p>
          </div>

          <div className="mt-6 grid grid-cols-1 gap-y-6 gap-x-4 sm:grid-cols-6">
            {/* display Contract Name if not empty */}

            {name && (
              <div className="flex flex-col">
                <span className=" inline-block text-gray-500 sm:text-lg">
                  <a
                    href={`https://etherscan.io/address/${contract}`}
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    {name}
                  </a>
                </span>
                <div className=" inline-block">
                  <a
                    href={`https://etherscan.io/address/${contract}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-sm text-gray-400 hover:text-gray-500"
                  >
                    {contract}
                  </a>
                </div>
              </div>
            )}
            <div className="sm:col-span-6">
              <label
                htmlFor="username"
                className="block text-sm font-medium text-gray-700"
              >
                Contract Address
              </label>
              <div className="mt-1 flex rounded-md shadow-sm">
                <span className="hidden sm:inline-flex items-center px-3 rounded-l-md border border-r-0 border-gray-300 bg-gray-50 text-gray-500 sm:text-sm">
                  etherscan.com/address/
                </span>
                <input
                  type="text"
                  name="address"
                  id="address"
                  autoComplete="0x..."
                  {...register("address", {
                    required: "Contract address is required",
                    pattern: {
                      value: /^0x[a-fA-F0-9]{40}$/,
                      message: "Invalid contract address",
                    },
                  })}
                  onBlur={(event) => fetchAbi(event)}
                  className="flex-1 focus:ring-orange-500 focus:border-orange-500 block w-full min-w-0 rounded-none rounded-r-md sm:text-sm border-gray-300"
                />
              </div>

              {errors.address && (
                <p className="mt-2 text-sm text-red-600">
                  {errors.address.message}
                </p>
              )}
            </div>

            <div className="sm:col-span-6">
              <label
                htmlFor="about"
                className="block text-sm font-medium text-gray-700"
              >
                Smart Contract ABI
              </label>
              <div className="mt-1">
                <textarea
                  id="abi"
                  name="abi"
                  rows={3}
                  {...register("abi", {
                    required: "Smart contract ABI is required",
                    validate: {
                      validJson: (value) => {
                        try {
                          JSON.parse(value);
                          return true;
                        } catch (error) {
                          return "Invalid smart contract ABI";
                        }
                      },
                    },
                  })}
                  className="shadow-sm focus:ring-orange-500 focus:border-orange-500 block w-full sm:text-sm border border-gray-300 rounded-md"
                  value={abi}
                  onChange={handleAbiChange}
                />
              </div>
              <p className="mt-2 text-sm text-gray-500">
                Fetches directly from etherscan.
              </p>
              {errors.abi && (
                <p className="mt-2 text-sm text-red-600">
                  {errors.abi.message}
                </p>
              )}
            </div>
          </div>
        </div>

        <div className="pt-8">
          <div>
            <h3 className="text-lg leading-6 font-medium text-gray-900">
              Events
            </h3>
            <p className="mt-1 text-sm text-gray-500">
              Events are emitted by the smart contract. They are used to notify
              your app of changes
            </p>

            <div className="mt-6">
              <fieldset name="events">
                {/* <legend className="text-base font-medium text-gray-900">By Email</legend> */}
                <div className="mt-4 space-y-4">
                  {/* map results frm fetchabi call to show an item */}
                  {fields.map((field, index) => {
                    // console.log("field: ", field, field.id)
                    // parse string to obj
                    return (
                      <div key={field.id} className="relative flex items-start">
                        <div className="flex items-center h-5">
                          <input
                            id={field.id}
                            key={field.index}
                            name={`events.${index}.${field.name}`}
                            {...register(`events.${index}.${field.name}`)}
                            type="checkbox"
                            className="focus:ring-orange-500 h-4 w-4 text-orange-600 border-gray-300 rounded"
                            // by default, all events are checked
                            defaultChecked={false}
                          />
                        </div>
                        <div className="ml-3 text-sm">
                          <label
                            htmlFor={field.name}
                            className="font-medium text-gray-700"
                          >
                            {field.name}
                          </label>
                          {/* <p className="text-gray-500">{item.name}</p> */}
                          {/* color key names in the description for item.string */}
                          <p className="text-gray-500 ">
                            <span
                              dangerouslySetInnerHTML={{
                                __html: formatString(field),
                              }}
                            />
                          </p>
                        </div>
                      </div>
                    );
                  })}
                </div>
                {errors.events && (
                  <p className="text-red-500">{errors.events.root.message}</p>
                )}
              </fieldset>
            </div>
          </div>
        </div>

        <DateComp onDateChange={handleDateChange} register={register} />
      </div>

      <div className="pt-5">
        <div className="flex justify-end">
          <button
            type="button"
            className="bg-white py-2 px-4 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-orange-500"
            onClick={handleCancel}
          >
            Cancel
          </button>

          <ReactiveButton
            buttonState={state}
            // onClick={onClickHandler}
            // color="primary"
            idleText={"Submit"}
            loadingText={
              <>
                <FontAwesomeIcon icon={faCircleNotch} spin /> Loading
              </>
            }
            successText={
              <>
                <FontAwesomeIcon icon={faThumbsUp} /> Success
              </>
            }
            errorText={
              <>
                <FontAwesomeIcon icon={faX} /> Error
              </>
            }
            className="!w-fit  !min-w-[inherit] !font-medium ml-3 !shadow-none inline-flex justify-center !py-2 !px-4 border border-transparent shadow-sm text-sm font-medium rounded-md text-white !bg-orange-600 hover:!bg-orange-700 focus:!outline-none focus:!ring-2 focus:!ring-offset-2 focus:ring-orange-500   hover:!shadow-none hover:!px-4 hover:!py-2 hover:!mt-0  "
            type={"submit"}
            style={{
              borderRadius: "5px",
              backgroundColor: "rgba(0, 123, 255, 1)!important",
              /* --reactive-button-min-width:  change this */
              minWidth: "inherit !important",
              // minHeight: '100% ',
            }}
            outline={false}
            shadow={false}
            rounded={false}
            // size={'normal'}
            block={false}
            messageDuration={2000}
            disabled={false}
            buttonRef={null}
            width={null}
            height={null}
            animation={true}
          />
        </div>
      </div>
    </form>
  );
};

AddContract.propTypes = {
  user: PropTypes.string.isRequired,
  contractIds: PropTypes.array.isRequired,
};

// check prop types for the component
DateComp.propTypes = {
  onDateChange: PropTypes.func.isRequired,
  register: PropTypes.func.isRequired,
};
function AbiToEvents(objjson) {
  return objjson
    .filter((obj) => obj.type === "event")
    .map((obj) => pick(obj, ["name", "inputs"]))
    .map((obj) => {
      const name = obj.name;
      const argTypes = obj.inputs.map(
        (params) => params.name + ": " + params.type
      );
      const params = argTypes.join();
      const explanation = { ...obj, string: `${name}(${params})` };
      return explanation;
    });
}
