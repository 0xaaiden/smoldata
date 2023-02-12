import React, { useState } from 'react';
import { pick } from 'lodash';
import { PropTypes } from 'prop-types';

//import web3 cdn in browser

function DateComp(props) {
  const [startDate, setStartDate] = useState(
    new Date(new Date().setMonth(new Date().getMonth() - 1))
  );
  const [endDate, setEndDate] = useState(new Date());
  const [error, setError] = useState(null);

  const handleStartDateChange = (event) => {
    const newStartDate = new Date(event.target.value);
    if (newStartDate > endDate) {
      setError('Start date should be less than end date');
      document.getElementById('save').disabled = true;

    } else if (endDate.getTime() - newStartDate.getTime() > 5184000000) {
      setError('Date range should not be more than 2 months');
      document.getElementById('save').disabled = true;

    } else {
      setError(null);
      setStartDate(newStartDate);
      props.onDateChange(newStartDate, endDate);
    }
  };

  const handleEndDateChange = (event) => {
    const newEndDate = new Date(event.target.value);
    if (newEndDate < startDate) {
      setError('End date should be greater than start date');
      document.getElementById('save').disabled = true;

    } else if (newEndDate.getTime() - startDate.getTime() > 5184000000) {
      setError('Date range should not be more than 2 months');
      document.getElementById('save').disabled = true;

    } else {
      setError(null);
      setEndDate(newEndDate);
      props.onDateChange(startDate, newEndDate);
    }
  };

  return (
    <div className="pt-8">
      <div>
        <h3 className="text-lg leading-6 font-medium text-gray-900">Timeframe</h3>
        <p className="mt-1 text-sm text-gray-500">
          Choose the timeframe you want to index your smart contract for.
        </p>
      </div>
      <div className="mt-6">
        {/* add date picker tailwind */}
        <div className="mt-6">
          <div className="grid grid-cols-6 gap-6">
            <div className="col-span-6 sm:col-span-3">
              <label htmlFor="start-date" className="block text-sm font-medium text-gray-700">
                Start Date
              </label>
              <div className="mt-1">
                <input
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
              <label htmlFor="start-date" className="block text-sm font-medium text-gray-700">
                End Date
              </label>
              <div className="mt-1">
                <input
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
// function Step1(props) {
//   const [address, setAddress] = useState('');
//   const [abi, setAbi] = useState('');
//   const [error, setError] = useState(null);

//   const handleNext = () => {
//     if (error) {
//       alert('Invalid address');
//     } else {
//       props.onNext(address, abi);
//     }
//   };

//   async function fetchAbi(event) {
//     // console.log('fetchAbi');
//     //fetch abi from etherscan
//     const address = event.target.value;
//     setAddress(address);
//     const json_abi = await fetch(
//       'https://api.etherscan.io/api?module=contract&action=getabi&address=' +
//         address +
//         '&apikey=8VCE7VNHB1ERQFZ8387TNJEUQHVQGB7QZH'
//     )
//       .then((response) => response.json())
//       .then((data) => {
//         // put in abi input field
//         // console.log(data);
//         document.getElementById('abi').value = data.result;
//         // objectify abi
//         let objjson = JSON.parse(data.result);
//         let events = objjson
//           .filter((obj) => obj.type === 'event')
//           .map((obj) => pick(obj, ['name', 'inputs']))
//           .map((obj) => {
//             const name = obj.name;
//             const argTypes = obj.inputs.map((params) => params.name + ': ' + params.type);
//             const params = argTypes.join();
//             const explanation = { ...obj, string: `${name}(${params})` };
//             return explanation;
//           });
//         setAbi(events);
//         console.log('abi: ', abi);
//         return events;
//       });
//     // console.log(json_abi);
//     return json_abi;
//   }

//   return (
//     <div>
//       <div>
//         <h3 className="text-lg leading-6 font-medium text-gray-900">Add a new smart contract</h3>
//         <p className="mt-1 text-sm text-gray-500">
//           This information will determine the events indexed in your contract.
//         </p>
//       </div>

//       <div className="mt-6 grid grid-cols-1 gap-y-6 gap-x-4 sm:grid-cols-6">
//         <div className="sm:col-span-4">
//           <label htmlFor="username" className="block text-sm font-medium text-gray-700">
//             Contract Address
//           </label>
//           <div className="mt-1 flex rounded-md shadow-sm">
//             <span className="inline-flex items-center px-3 rounded-l-md border border-r-0 border-gray-300 bg-gray-50 text-gray-500 sm:text-sm">
//               etherscan.com/address/
//             </span>
//             <input
//               type="text"
//               name="username"
//               id="username"
//               autoComplete="0x..."
//               onBlur={(event) => fetchAbi(event)}
//               className="flex-1 focus:ring-orange-500 focus:border-orange-500 block w-full min-w-0 rounded-none rounded-r-md sm:text-sm border-gray-300"
//             />
//           </div>
//         </div>

//         <div className="sm:col-span-6">
//           <label htmlFor="about" className="block text-sm font-medium text-gray-700">
//             Smart Contract ABI
//           </label>
//           <div className="mt-1">
//             <textarea
//               id="abi"
//               name="abi"
//               rows={3}
//               className="shadow-sm focus:ring-orange-500 focus:border-orange-500 block w-full sm:text-sm border border-gray-300 rounded-md"
//               defaultValue={''}
//             />
//           </div>
//           <p className="mt-2 text-sm text-gray-500">Fetches directly from etherscan.</p>
//         </div>
//       </div>
//     </div>
//   );
// }
// get web3
export const AddContract = () => {
  const [abi, setAbi] = useState([]);
  const [startDate, setStartDate] = useState(
    new Date(new Date().setMonth(new Date().getMonth() - 1))
  );
  const [endDate, setEndDate] = useState(new Date());
  console.log(startDate, endDate);
  
  const handleDateChange = (newStartDate, newEndDate) => {
    setStartDate(newStartDate);
    setEndDate(newEndDate);
    document.getElementById('save').disabled = false;

  };
  // let json_abi;
  // console.log('AddContract');
  async function fetchAbi(event) {
    // console.log('fetchAbi');
    //fetch abi from etherscan
    const address = event.target.value;
    const json_abi = await fetch(
      'https://api.etherscan.io/api?module=contract&action=getabi&address=' +
        address +
        '&apikey=8VCE7VNHB1ERQFZ8387TNJEUQHVQGB7QZH'
    )
      .then((response) => response.json())
      .then((data) => {
        // put in abi input field
        // console.log(data);
        document.getElementById('abi').value = data.result;
        // objectify abi
        let objjson = JSON.parse(data.result);
        let events = objjson
          .filter((obj) => obj.type === 'event')
          .map((obj) => pick(obj, ['name', 'inputs']))
          .map((obj) => {
            const name = obj.name;
            const argTypes = obj.inputs.map((params) => params.name + ': ' + params.type);
            const params = argTypes.join();
            const explanation = { ...obj, string: `${name}(${params})` };
            return explanation;
          });
        setAbi(events);
        console.log('abi: ', abi);
        return events;
      });
    // console.log(json_abi);
    return json_abi;
  }
  function formatString(item) {
    let string = item.string;
    let firstParenthesisIndex = string.indexOf('(');
    let firstWord = string.substring(0, firstParenthesisIndex);
    string = string.replace(
      firstWord,
      `<span class="underline decoration-sky-500 decoration-double">${firstWord}</span>`
    );

    let words = string.split('(');
    let fields = words[1].split(',');

    fields.forEach((field) => {
      let fieldWord = field.substring(0, field.indexOf(':'));
      string = string.replace(
        fieldWord,
        `<span class="italic underline decoration-yellow-500 decoration-double">${fieldWord}</span>`
      );
    });
    console.log(string);
    return string;
  }

  return (
    <form className="space-y-8 divide-y divide-gray-200">
      <div className="space-y-8 divide-y divide-gray-200">
        <div>
          <div>
            <h3 className="text-lg leading-6 font-medium text-gray-900">
              Add a new smart contract
            </h3>
            <p className="mt-1 text-sm text-gray-500">
              This information will determine the events indexed in your contract.
            </p>
          </div>

          <div className="mt-6 grid grid-cols-1 gap-y-6 gap-x-4 sm:grid-cols-6">
            <div className="sm:col-span-4">
              <label htmlFor="username" className="block text-sm font-medium text-gray-700">
                Contract Address
              </label>
              <div className="mt-1 flex rounded-md shadow-sm">
                <span className="inline-flex items-center px-3 rounded-l-md border border-r-0 border-gray-300 bg-gray-50 text-gray-500 sm:text-sm">
                  etherscan.com/address/
                </span>
                <input
                  type="text"
                  name="username"
                  id="username"
                  autoComplete="0x..."
                  onBlur={(event) => fetchAbi(event)}
                  className="flex-1 focus:ring-orange-500 focus:border-orange-500 block w-full min-w-0 rounded-none rounded-r-md sm:text-sm border-gray-300"
                />
              </div>
            </div>

            <div className="sm:col-span-6">
              <label htmlFor="about" className="block text-sm font-medium text-gray-700">
                Smart Contract ABI
              </label>
              <div className="mt-1">
                <textarea
                  id="abi"
                  name="abi"
                  rows={3}
                  className="shadow-sm focus:ring-orange-500 focus:border-orange-500 block w-full sm:text-sm border border-gray-300 rounded-md"
                  defaultValue={''}
                />
              </div>
              <p className="mt-2 text-sm text-gray-500">Fetches directly from etherscan.</p>
            </div>

          </div>
        </div>

        <div className="pt-8">
          <div>
            <h3 className="text-lg leading-6 font-medium text-gray-900">Events</h3>
            <p className="mt-1 text-sm text-gray-500">
              Events are emitted by the smart contract. They are used to notify your app of changes
            </p>

            <div className="mt-6">
              <fieldset>
                {/* <legend className="text-base font-medium text-gray-900">By Email</legend> */}
                <div className="mt-4 space-y-4">
                  {/* map results frm fetchabi call to show an item */}
                  {abi.map((item) => {
                    // parse string to obj
                    return (
                      <div key={item.name} className="relative flex items-start">
                        <div className="flex items-center h-5">
                          <input
                            id={item.name}
                            name={item.name}
                            type="checkbox"
                            className="focus:ring-orange-500 h-4 w-4 text-orange-600 border-gray-300 rounded"
                          />
                        </div>
                        <div className="ml-3 text-sm">
                          <label htmlFor={item.name} className="font-medium text-gray-700">
                            {item.name}
                          </label>
                          {/* <p className="text-gray-500">{item.name}</p> */}
                          {/* color key names in the description for item.string */}
                          <p className="text-gray-500 ">
                            <span dangerouslySetInnerHTML={{ __html: formatString(item) }} />
                          </p>
                        </div>
                      </div>
                    );
                  })}
                </div>
              </fieldset>
            </div>
          </div>

          {/* <div className="mt-6 grid grid-cols-1 gap-y-6 gap-x-4 sm:grid-cols-6">
            <div className="sm:col-span-3">
              <label htmlFor="first-name" className="block text-sm font-medium text-gray-700">
                First name
              </label>
              <div className="mt-1">
                <input
                  type="text"
                  name="first-name"
                  id="first-name"
                  autoComplete="given-name"
                  className="shadow-sm focus:ring-orange-500 focus:border-orange-500 block w-full sm:text-sm border-gray-300 rounded-md"
                />
              </div>
            </div>

            <div className="sm:col-span-3">
              <label htmlFor="last-name" className="block text-sm font-medium text-gray-700">
                Last name
              </label>
              <div className="mt-1">
                <input
                  type="text"
                  name="last-name"
                  id="last-name"
                  autoComplete="family-name"
                  className="shadow-sm focus:ring-orange-500 focus:border-orange-500 block w-full sm:text-sm border-gray-300 rounded-md"
                />
              </div>
            </div>

            <div className="sm:col-span-4">
              <label htmlFor="email" className="block text-sm font-medium text-gray-700">
                Email address
              </label>
              <div className="mt-1">
                <input
                  id="email"
                  name="email"
                  type="email"
                  autoComplete="email"
                  className="shadow-sm focus:ring-orange-500 focus:border-orange-500 block w-full sm:text-sm border-gray-300 rounded-md"
                />
              </div>
            </div>

            <div className="sm:col-span-3">
              <label htmlFor="country" className="block text-sm font-medium text-gray-700">
                Country
              </label>
              <div className="mt-1">
                <select
                  id="country"
                  name="country"
                  autoComplete="country-name"
                  className="shadow-sm focus:ring-orange-500 focus:border-orange-500 block w-full sm:text-sm border-gray-300 rounded-md">
                  <option>United States</option>
                  <option>Canada</option>
                  <option>Mexico</option>
                </select>
              </div>
            </div>

            <div className="sm:col-span-6">
              <label htmlFor="street-address" className="block text-sm font-medium text-gray-700">
                Street address
              </label>
              <div className="mt-1">
                <input
                  type="text"
                  name="street-address"
                  id="street-address"
                  autoComplete="street-address"
                  className="shadow-sm focus:ring-orange-500 focus:border-orange-500 block w-full sm:text-sm border-gray-300 rounded-md"
                />
              </div>
            </div>

            <div className="sm:col-span-2">
              <label htmlFor="city" className="block text-sm font-medium text-gray-700">
                City
              </label>
              <div className="mt-1">
                <input
                  type="text"
                  name="city"
                  id="city"
                  autoComplete="address-level2"
                  className="shadow-sm focus:ring-orange-500 focus:border-orange-500 block w-full sm:text-sm border-gray-300 rounded-md"
                />
              </div>
            </div>

            <div className="sm:col-span-2">
              <label htmlFor="region" className="block text-sm font-medium text-gray-700">
                State / Province
              </label>
              <div className="mt-1">
                <input
                  type="text"
                  name="region"
                  id="region"
                  autoComplete="address-level1"
                  className="shadow-sm focus:ring-orange-500 focus:border-orange-500 block w-full sm:text-sm border-gray-300 rounded-md"
                />
              </div>
            </div>

            <div className="sm:col-span-2">
              <label htmlFor="postal-code" className="block text-sm font-medium text-gray-700">
                ZIP / Postal code
              </label>
              <div className="mt-1">
                <input
                  type="text"
                  name="postal-code"
                  id="postal-code"
                  autoComplete="postal-code"
                  className="shadow-sm focus:ring-orange-500 focus:border-orange-500 block w-full sm:text-sm border-gray-300 rounded-md"
                />
              </div>
            </div>
          </div> */}
        </div>

        <DateComp onDateChange={handleDateChange} />
      </div>

      <div className="pt-5">
        <div className="flex justify-end">
          <button
            type="button"
            className="bg-white py-2 px-4 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-orange-500">
            Cancel
          </button>
          <button
            id="save"
            type="submit"
            className=" disabled:opacity-25 ml-3 inline-flex justify-center py-2 px-4 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-orange-600 hover:bg-orange-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-orange-500">
            Save
          </button>
        </div>
      </div>
    </form>
  );
};

// check prop types for the component
DateComp.propTypes = {
  onDateChange: PropTypes.func.isRequired
};
