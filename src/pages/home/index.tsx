import React, { useCallback, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../../helpers/useAuth';

const Home = () => {
  let auth = useAuth();
  const user = auth.user;

  return (
    <div className="container mx-auto my-5 p-5">
      <div className="md:flex no-wrap md:-mx-2 ">
        <div className="w-full md:w-3/12 md:mx-2">
          <div className="bg-white p-3 border-t-4 border-cyan-700">
            <div className="image overflow-hidden">
              <img
                className="h-auto w-full mx-auto"
                src="https://www.planetware.com/photos-large/INA/indonesia-borobudur.jpg"
                alt=""
              />
            </div>
          </div>
          <div className="my-4"></div>
        </div>
        <div className="w-full md:w-9/12 mx-2 h-64">
          <div className="bg-white p-3 shadow-sm rounded-sm">
            <div className="flex items-center space-x-2 font-semibold text-gray-900 leading-8">
              <span className="text-cyan-700">
                <svg
                  className="h-5"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"
                  />
                </svg>
              </span>
              <span className="tracking-wide">About</span>
            </div>
            <div className="text-gray-700">
              <div className="grid text-sm">
                <div className="grid grid-cols-2">
                  <div className="px-4 py-2 font-semibold">Email</div>
                  <div className="px-4 py-2">{user?.Email}</div>
                </div>
                <div className="grid grid-cols-2">
                  <div className="px-4 py-2 font-semibold">Name</div>
                  <div className="px-4 py-2">{user?.Name}</div>
                </div>
              </div>
            </div>
            <Link
              className="text-center bg-indigo-200 block w-full text-blue-800 text-sm font-semibold rounded-lg hover:bg-slate-200 focus:outline-none focus:shadow-outline focus:bg-gray-100 hover:shadow-xs p-3 my-4"
              to="tourists"
            >
              Tourist Today
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Home;
