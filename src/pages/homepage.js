/* eslint-disable no-unused-vars */
import React from 'react';
import Hero from '../components/Hero';
import Content from '../components/Content';
import { Fragment, useState } from 'react';
import { Combobox, Dialog, Transition } from '@headlessui/react';
import { SearchIcon } from '@heroicons/react/solid';
import {
  DocumentAddIcon,
  FolderIcon,
  CollectionIcon,
  ViewGridAddIcon
} from '@heroicons/react/outline';
import { ChevronRightIcon, StarIcon } from '@heroicons/react/solid';
import { AuthContext } from '../contexts/AuthContext';
import { useContext } from 'react';
import { Navigate } from 'react-router-dom';

const projects = [
  { id: 1, name: 'EVM/Ethereum/Gearbox_Proxy_CA#1', url: '#' },
  { id: 2, name: 'EVM/Polygon/UniswapV3Pool_USDC/DAI', url: '#' },
  { id: 3, name: 'Rust/Near/RasinbowBridge_Deposit', url: '#' }
  // More projects...
];

const classNames = (...classes) => {
  return classes.filter(Boolean).join(' ');
};
const recent = [projects[0]];
const quickActions = [
  { name: 'Index new events...', icon: DocumentAddIcon, shortcut: 'N', url: '#' },
  { name: 'Import a new contract...', icon: ViewGridAddIcon, shortcut: 'F', url: '#' },
  { name: 'Access database...', icon: CollectionIcon, shortcut: 'D', url: '#' }
  // { name: 'Add label...', icon: TagIcon, shortcut: 'L', url: '#' }
];

document.title = 'fn03::indexsc.';
export const Homepage = () => {
  const user = useContext(AuthContext);
  if (user.user) {
    return <Navigate to="/dashboard" />;
  }

  let query = '';
  const filteredProjects = recent;

  return (
    <main className="main" style={{ display: 'block' }}>
      <div className="content">
        <div
          className="content-header"
          style={{ 'flex-wrap': 'wrap', fontFamily: 'Inter', 'align-items': 'center' }}>
          <div className="content-header-inner md:text-start text-center mr-5">
            <a href="#" className="inline-flex space-x-4 mb-3">
              <span className="uppercase inline-flex items-center px-3 py-1 rounded-full text-sm font-medium bg-orange-100 text-orange-800">
                WHAT&apos;S NEW
              </span>
              <span className="inline-flex items-center text-sm font-medium text-orange-600 space-x-1">
                <span>Just shipped version 0.1.0</span>
                <ChevronRightIcon className="h-5 w-5" aria-hidden="true" />
              </span>
            </a>

            <h1 className="content-header-title" style={{ fontWeight: 600, fontFamily: 'Inter' }}>
              A better and faster way to index on-chain data
            </h1>
            {/* <br /> */}
            <p className="mt-3 text-gray-500 md:text-lg">
              Built on powerful engines to index smart contracts by events in ms and asynchronously
              update your database and APIs access points.
            </p>
            <form action="#" className="mt-12 sm:max-w-lg sm:w-full sm:flex">
              <div className="min-w-0 flex-1">
                <label htmlFor="hero-email" className="sr-only">
                  Email address
                </label>
                <input
                  id="hero-email"
                  type="email"
                  className="block w-full border border-gray-300 rounded-md px-5 py-3 text-base text-gray-900 placeholder-gray-500 shadow-sm focus:border-orange-500 focus:ring-orange-500"
                  placeholder="Enter your email"
                />
              </div>
              <div className="mt-4 sm:mt-0 sm:ml-3">
                <button
                  type="submit"
                  className="block w-full text-base rounded-md border border-transparent px-5 py-3 bg-orange-600 font-medium text-white shadow hover:bg-orange-700 focus:outline-none focus:ring-2 focus:ring-orange-500 focus:ring-offset-2 sm:px-10">
                  Subscribe me
                </button>
              </div>
            </form>
          </div>
          <Combobox
            as="div"
            className="mx-auto max-w-lg md:ml-10 mt-10 md:mt-0 transform divide-y divide-gray-500 divide-opacity-10 overflow-hidden rounded-xl shadow-2xl ring-1 ring-black ring-opacity-25"
            onChange={(item) => (window.location = item.url)}
            style={{ 'flex-grow': '.3' }}>
            <div className="relative">
              <SearchIcon
                className="pointer-events-none absolute top-3.5 left-4 h-5 w-5 text-gray-900 text-opacity-40"
                aria-hidden="true"
              />
              <Combobox.Input
                className="h-12 w-full border-0 bg-transparent pl-11 pr-4 text-gray-900 placeholder-gray-500 focus:ring-0 sm:text-sm"
                placeholder="Search..."
              />
            </div>

            {(query === '' || filteredProjects.length > 0) && (
              <Combobox.Options
                static
                className="max-h-80 scroll-py-2 divide-y divide-gray-500 divide-opacity-10 overflow-y-auto">
                <li className="p-2">
                  {query === '' && (
                    <h2 className="mt-4 mb-2 px-3 text-xs font-semibold text-gray-900">
                      Recent Contracts
                    </h2>
                  )}
                  <ul className="text-sm text-gray-700">
                    {(query === '' ? projects : filteredProjects).map((project) => (
                      <Combobox.Option
                        key={project.id}
                        value={project}
                        className={({ active }) =>
                          classNames(
                            'flex cursor-default select-none items-center rounded-md px-3 py-2',
                            active && 'bg-gray-900 bg-opacity-5 text-gray-900'
                          )
                        }>
                        {({ active }) => (
                          <>
                            <FolderIcon
                              className={classNames(
                                'h-6 w-6 flex-none text-gray-900 text-opacity-40',
                                active && 'text-opacity-100'
                              )}
                              aria-hidden="true"
                            />
                            <span className="ml-3 flex-auto truncate">{project.name}</span>
                          </>
                        )}
                      </Combobox.Option>
                    ))}
                  </ul>
                </li>
                {query === '' && (
                  <li className="p-2">
                    <h2 className="sr-only">Quick actions</h2>
                    <ul className="text-sm text-gray-700">
                      {quickActions.map((action) => (
                        <Combobox.Option
                          key={action.shortcut}
                          value={action}
                          className={({ active }) =>
                            classNames(
                              'flex cursor-default select-none items-center rounded-md px-3 py-2',
                              active && 'bg-gray-900 bg-opacity-5 text-gray-900'
                            )
                          }>
                          {({ active }) => (
                            <>
                              <action.icon
                                className={classNames(
                                  'h-6 w-6 flex-none text-gray-900 text-opacity-40',
                                  active && 'text-opacity-100'
                                )}
                                aria-hidden="true"
                              />
                              <span className="ml-3 flex-auto truncate">{action.name}</span>
                              <span className="ml-3 flex-none text-xs font-semibold text-gray-500">
                                <kbd className="font-sans">⌘</kbd>
                                <kbd className="font-sans">{action.shortcut}</kbd>
                              </span>
                            </>
                          )}
                        </Combobox.Option>
                      ))}
                    </ul>
                  </li>
                )}
              </Combobox.Options>
            )}

            {query !== '' && filteredProjects.length === 0 && (
              <div className="py-14 px-6 text-center sm:px-14">
                <FolderIcon
                  className="mx-auto h-6 w-6 text-gray-900 text-opacity-40"
                  aria-hidden="true"
                />
                <p className="mt-4 text-sm text-gray-900">
                  We couldnt find any projects with that term. Please try again.
                </p>
              </div>
            )}
          </Combobox>
        </div>
        <br />
        {/* <Content /> */}
      </div>
    </main>
  );
};
